import { useContext, useEffect } from "react"
import likedSong from "../../images/liked_songs.png"
import { Link } from "react-router-dom"
import TrackItem from "./TrackItem"
import PlayButton from "./PlayButton"

import { UserContext } from "../../context/userContext"
import { LikedSongsContext } from "../../context/likedSongsContext"
import { TokenContext } from "../../context/tokenContext"
import reqWithToken from "../utils/reqWithToken"
import Axios from "axios"
import duratioLogo from "../../images/time-line.png"
import useResize from "../../hooks/useResize"


export default function Collection() {
    const { user } = useContext(UserContext)
    const { likedSongs, handleLikedSongs } = useContext(LikedSongsContext)
    const { token } = useContext(TokenContext)
    const [screenWidth] = useResize()

    useEffect(() => {

        if (token) {
            var cancelSource = Axios.CancelToken.source()

            const makeRequests = async () => {
                const requestLikedSongs = reqWithToken(`https://api.spotify.com/v1/me/tracks?offset=0&limit=50`, token, cancelSource)
                const _likedSongs = await requestLikedSongs()
                handleLikedSongs(_likedSongs.data.items)

            }
            makeRequests()
        }

    }, [])


    const trackElements = likedSongs.map((item, i) => {
        return (
            <TrackItem key={item.track.id} data={{ ...item, added_by: user.id }} index={i} windowWidth={screenWidth} />
        )
    })

    function handleContextMenu(e) {
        e.preventDefault()
    }


    return (
        <div className="playlist-content" onContextMenu={handleContextMenu}>
            <div className="playlist-cover" style={{ backgroundColor: "#4200f5" }}>
                <img className="cover-image" src={likedSong} />
                <div className="cover-overlay"></div>
                <div className="cover-texts">
                    <h4 className="cover-type">Playlist</h4>
                    <h1 className="cover-title">Liked Songs</h1>

                    <div className="cover-flex">
                        <Link className="cover-owner" to="/">{user.display_name} </Link>
                        <h4 className="cover-info"> · {likedSongs.length} songs</h4>
                    </div>
                </div>
            </div>

            <div className="tracks-header">
                <div className="tracks-header-overlay" style={{ backgroundColor: "#4200f5" }} />
                <div className="playlist-tracks-actions">
                    <div className="track-actions">
                        <PlayButton type="playlist" />

                    </div>
                    <div className="tracks-title" >
                        <div className="tracks-title-title">
                            <h3 style={{ color: "#a9a9aa" }} className="title-first">#</h3>
                            <h3 style={{ color: "#a9a9aa" }}>Title</h3>
                        </div>
                        {screenWidth > 820 && <h3 style={{ color: "#a9a9aa" }}>Album</h3>}
                        {screenWidth > 1070 && <h3 style={{ color: "#a9a9aa" }}>Date</h3>}
                        <img src={duratioLogo} />
                    </div>
                    <hr></hr>
                    {trackElements}
                </div>

            </div>
        </div>
    )
}