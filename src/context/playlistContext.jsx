import React, { useState, useContext } from "react"
import putWithToken from "../components/utils/putWithToken"
import deleteWithToken from "../components/utils/deleteWithToken"
import reqWithToken from "../components/utils/reqWithToken"
import { LoginContext } from "./loginContext"
import { TokenContext } from "./tokenContext"
import { UserContext } from "./userContext"
import axios from "axios"

const PlaylistContext = React.createContext()

function PlaylistContextProvider(props) {

    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)
    const { user } = useContext(UserContext)

    const [myPlaylists, setMyPlaylists] = useState([])


    function handleMyPlaylists(userPlaylists) {
        setMyPlaylists(prev => userPlaylists)
    }

    function handleLikePlaylist(id) {

        let bool = myPlaylists.some(item => item.id === id)
        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!bool) {
                body = {
                    public: false
                }
                const request = putWithToken(`https://api.spotify.com/v1/playlists/${id}/followers`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        requestPlaylists()
                    }
                })
            } else if (bool) {
                body = {}
                const request = deleteWithToken(`https://api.spotify.com/v1/playlists/${id}/followers`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        requestPlaylists()
                    }
                })
            }
        }

    }

    function handleCreatePlaylist() {

        const source = axios.CancelToken.source()
        let body
        if (login) {
            body = {
                name: `My Playlist #${myPlaylists.length}`
            }
            const request = putWithToken(`https://api.spotify.com/v1/users/${user.id}/playlists`, token, source, body, "POST")
            request().then(response => {
                if (response.status === 201) {
                    requestPlaylists()
                } else {
                    console.log(response)
                }
            })

        }
    }


    const requestPlaylists = async () => {
        const cancelSource = axios.CancelToken.source()
        const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, token, cancelSource)
        const _playlists = await requestPlayList()
        setMyPlaylists(_playlists.data.items)

    }


    return (
        <PlaylistContext.Provider value={{ myPlaylists, handleMyPlaylists, handleLikePlaylist, handleCreatePlaylist }}>
            {props.children}
        </PlaylistContext.Provider>

    )
}

export { PlaylistContextProvider, PlaylistContext }