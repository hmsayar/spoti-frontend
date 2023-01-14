import { useState, useEffect, useContext, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import PlayButton from "./PlayButton"
import TrackItem from "./TrackItem"
import heartLine from "../../images/heart-line-playlist.png"
import heartFill from "../../images/heart-fill-playlist.png"
import { LoginContext } from "../../context/loginContext"
import { UserContext } from "../../context/userContext"
import { PlaylistContext } from "../../context/playlistContext"
import EmptyPlaylist from "./EmptyPlaylist"
import duratioLogo from "../../images/time-line.png"


export default function Playlist({ playlistUriHeader }) {

    const { playlistId } = useParams()
    const [playlist, setPlaylist] = useState({})
    const [loading, setLoading] = useState(true)
    const { login } = useContext(LoginContext)
    const { user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(false)
    const { myPlaylists, handleLikePlaylist } = useContext(PlaylistContext)


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
                playlistUriHeader(playlist.uri)

            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [playlistId])


    useLayoutEffect(() => {
        if (login) {

            if (Object.entries(playlist).length !== 0) {
                let bool = myPlaylists.some(item => item.id === playlist.id)
                setIsLiked(bool)
            }
        }
    }, [playlist, myPlaylists])


    const trackElements = playlist.tracks?.items.map((item, i) => {
        return (
            <TrackItem playlistId={playlist.id} key={item.id} data={item} index={i} listUri={playlist.uri} />
        )
    })





    if (playlist.tracks?.total === 0) {
        return (
            <EmptyPlaylist playlist={playlist} />
        )
    } else {

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
                                    <h4
                                        className="cover-info">
                                        · {new Intl.NumberFormat().format(playlist.followers.total)} likes · {playlist.tracks.total} songs
                                    </h4>
                                </div>
                            </div>

                        </div>
                        <div className="tracks-header">

                            <div className="tracks-header-overlay" style={{ backgroundColor: playlist.primary_color }} />
                            <div className="playlist-tracks-actions">
                                <div className="track-actions">
                                    <PlayButton type="playlist" item={playlist.uri} />
                                    {(user.id !== playlist.owner.display_name) && <img
                                        className="track-actions-img"
                                        src={isLiked ? heartFill : heartLine}
                                        onClick={() => handleLikePlaylist(playlist.id)}
                                    />}
                                </div>
                                <div className="tracks-title" >
                                    <div className="tracks-title-title">
                                        <h3 style={{color:"#a9a9aa"}} className="title-first">#</h3>
                                        <h3 style={{color:"#a9a9aa"}}>Title</h3>
                                    </div>
                                    <h3 style={{color:"#a9a9aa"}}>Album</h3>
                                    <h3 style={{color:"#a9a9aa"}}>Date</h3>
                                    <img src={duratioLogo} />
                                </div>
                                <hr></hr>
                                {trackElements}
                            </div>
                        </div>

                    </>
                }
            </div>

        )
    }


}