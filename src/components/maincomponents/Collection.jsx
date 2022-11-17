import {useContext} from "react"
import likedSongs from "../../images/liked_songs.png"
import { Link } from "react-router-dom"
import TrackItem from "./TrackItem"
import PlayButton from "./PlayButton"

import { UserContext } from "../../context/userContext"

export default function Collection({ liked }) {
    const {user, handleUser} = useContext(UserContext)


    const trackElements = liked.map((item, i) => {
        return (
            <TrackItem key={item.id} data={item} index={i} />
        )
    })


    return (
        <div className="playlist-content">
            <div className="playlist-cover">
                <img className="cover-image" src={likedSongs} />
                <div className="cover-texts">
                    <h4 className="cover-type">Playlist</h4>
                    <h1 className="cover-title">Liked Songs</h1>

                    <div className="cover-flex">
                        <Link className="cover-owner" to="/">{user.display_name} </Link>
                        <h4 className="cover-info"> · {liked.length} songs</h4>
                    </div>
                </div>
            </div>
            
            <div className="track-list">
            <div className="track-actions">
                        <PlayButton type="playlist" />
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
    )
}