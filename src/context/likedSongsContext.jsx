import React, {useState, useContext} from "react"
import axios from "axios"
import { LoginContext } from "./loginContext"
import { TokenContext } from "./tokenContext"
import reqWithToken from "../components/utils/reqWithToken"
import putWithToken from "../components/utils/putWithToken"
import deleteWithToken from "../components/utils/deleteWithToken"

const LikedSongsContext = React.createContext()


function LikedSongsContextProvider(props){
    const [likedSongs, setLikedSongs] = useState([])
    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)

    function handleLikedSongs(liked){
        setLikedSongs(prev => liked)
    }


    function handleLikeUnlike(id){
        let bool = likedSongs.some(liked => liked.track.id === id)
        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!bool) {
                body = {
                    ids: [id]
                }
                const request = putWithToken(`https://api.spotify.com/v1/me/tracks?ids=${id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        requestLikedSongs()
                    }
                })
            } else if (bool) {
                const request = deleteWithToken(`https://api.spotify.com/v1/me/tracks?ids=${id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        requestLikedSongs()
                    }
                })
            }
        }
    }

    const requestLikedSongs = async () => {
        const cancelSource = axios.CancelToken.source()
        const requestLikedSongs = reqWithToken(`https://api.spotify.com/v1/me/tracks?offset=0&limit=50`, token, cancelSource)
        const _likedSongs = await requestLikedSongs()
        setLikedSongs(_likedSongs.data.items)

    }



    return(
        <LikedSongsContext.Provider value={{likedSongs, handleLikedSongs, handleLikeUnlike}}>
            {props.children}
        </LikedSongsContext.Provider>

    )
}

export {LikedSongsContextProvider, LikedSongsContext}