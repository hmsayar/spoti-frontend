import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import PlayButton from "./PlayButton";
import putWithToken from "../utils/putWithToken";
import deleteWithToken from "../utils/deleteWithToken";
import reqWithToken from "../utils/reqWithToken";
import { LoginContext } from "../../context/loginContext";
import { TokenContext } from "../../context/tokenContext";
import ArtistDiscography from "./artistcomponents/ArtistDiscography";
import RelatedArtists from "./artistcomponents/RelatedArtists";

export default function Artist() {

    const {token} = useContext(TokenContext)
    const {login} = useContext(LoginContext)

    const { artistId } = useParams()
    const [artistData, setArtistData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFollow, setIsFollow] = useState(false)


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/artists/${artistId}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: `${import.meta.env.VITE_APP_BACK_URI}`,
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                const artist = result.data
                setArtistData(artist)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [artistId])

    useEffect(()=>{
        if(Object.entries(artistData).length !== 0 ){
            var cancelSource = axios.CancelToken.source()
            const checkIsFollowed = async () => {
                const requestIsFollowed = reqWithToken(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistData.id}`, token, cancelSource)
                const _requestIsFollowed = await requestIsFollowed()
                setIsFollow(_requestIsFollowed.data[0])
                setLoading(false)
            }
            checkIsFollowed()
        }
    },[artistData])

    function handleFollow(){
        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!isFollow) {
                body = {
                    ids:[artistData.id]
                }
                const request = putWithToken(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistData.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 204) {
                        setIsFollow(true)
                    }else{console.log(response)}
                })
            } else if (isFollow) {
                body = {}
                const request = deleteWithToken(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistData.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 204) {
                        setIsFollow(false)
                    }
                })
            }
        }
    }

    return (
        <div className="playlist-content">
            {loading ?
                null :
                <>
                    <div className="playlist-cover" style={{backgroundColor:"magenta"}}>
                        <img className="cover-image" src={artistData.images[1].url} />
                        <div className="cover-overlay"></div>
                        <div className="cover-texts">
                            <h4 className="cover-type">{artistData.type.toUpperCase()}</h4>
                            <h1 className="cover-title">{artistData.name}</h1>
                            <div className="cover-flex">
                                <h4 className="cover-info">{artistData.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Followers</h4>
                            </div>
                        </div>
                    </div>
                    <div className="tracks-header">
                        <div className="tracks-header-overlay" style={{ backgroundColor: "magenta"}} />
                        <div className="playlist-tracks-actions">
                            <div className="track-actions">
                                <PlayButton type="playlist" item={artistData.uri} />
                                <button className="follow-btn" onClick={handleFollow}>
                                    <p style={{fontSize:"0.9em", fontWeight:"bold"}}>
                                    {isFollow ? "FOLLOWING" : "FOLLOW"}
                                    </p>
                                </button>
                            </div>
                            <div className="tracks-title" >
                            </div>
                            <ArtistDiscography id={artistData.id} />
                            <RelatedArtists id={artistData.id} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}