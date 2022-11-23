import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import PlayButton from "./PlayButton"
import TrackItem from "./TrackItem"
import heartLine from "../../images/heart-line-playlist.png"
import heartFill from "../../images/heart-fill-playlist.png"
import { LoginContext } from "../../context/loginContext"
import putWithToken from "../utils/putWithToken"
import deleteWithToken from "../utils/deleteWithToken"
import { TokenContext } from "../../context/tokenContext"
import { UserContext } from "../../context/userContext"


export default function Playlist({ myPlaylists, likePlaylist, unlikePlaylist }) {

    const { playlistId } = useParams()
    const [playlist, setPlaylist] = useState({})
    const [loading, setLoading] = useState(true)
    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)
    const { user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(false)


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: "http://localhost:4000/",
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                const playlist = result.data
                setPlaylist(playlist)
                setLoading(false)

            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [playlistId])

    useEffect(() => {
        if (login) {

            if (Object.entries(playlist).length !== 0) {
                let bool = myPlaylists.some(item => item.id === playlist.id)
                setIsLiked(bool)
            }
        }

    }, [playlist])

    console.log(playlist)


    function handleLike() {

        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!isLiked) {
                body = {
                    public: false
                }
                const request = putWithToken(`https://api.spotify.com/v1/playlists/${playlist.id}/followers`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        setIsLiked(prev => !prev)
                        likePlaylist(playlist)
                    }
                })
            } else if (isLiked) {
                body = {}
                const request = deleteWithToken(`https://api.spotify.com/v1/playlists/${playlist.id}/followers`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        console.log(response)
                        setIsLiked(prev => !prev)
                        unlikePlaylist(playlist)
                    }
                })
            }
        }

    }




    const trackElements = playlist.tracks?.items.map((item, i) => {
        return (
            <TrackItem key={item.id} data={item} index={i} listUri={playlist.uri} />
        )
    })

    if(playlist.tracks?.total===0){
        return(

                <h1>Playlist Emptyy</h1>

        )
    }else{

        return (
            <div className="playlist-content">
                {loading ?
                    null :
                    <>
                        <div className="playlist-cover" style={{ backgroundColor: playlist.primary_color }} >
                            <img className="cover-image" src={playlist.images[0].url} />
                            <div className="cover-overlay"></div>
                            <div className="cover-texts">
                                <h4 className="cover-type">{playlist.type.toUpperCase()}</h4>
                                <h1 className="cover-title">{playlist.name}</h1>
                                <h2 className="cover-desc">{playlist.description}</h2>
                                <div className="cover-flex">
                                    <Link className="cover-owner" to="/">{playlist.owner.display_name}</Link>
                                    <h4 className="cover-info"> · {new Intl.NumberFormat().format(playlist.followers.total)} · {playlist.tracks.total} songs</h4>
                                </div>
                            </div>
    
                        </div>
                        <div>
    
    
                        </div>
                        <div className="tracks-header">
    
                            <div className="tracks-header-overlay" style={{ backgroundColor: playlist.primary_color }} />
                            <div className="playlist-tracks-actions">
                                <div className="track-actions">
                                    <PlayButton type="playlist" item={playlist.uri} />
                                  { (user.id !== playlist.owner.display_name) && <img
                                        className="track-actions-img"
                                        src={isLiked ? heartFill : heartLine}
                                        onClick={handleLike}
                                    />}
                                </div>
                                <div className="tracks-title" >
                                    <div className="tracks-title-title">
                                        <h3 className="title-first">#</h3>
                                        <h3>Title</h3>
                                    </div>
                                    <h3>Album</h3>
                                    <h3>Date</h3>
                                    <h3>Duration</h3>
                                </div>
                            {trackElements}
                            </div>
                        </div>
    
                    </>
                }
            </div>
    
        )
    }


}