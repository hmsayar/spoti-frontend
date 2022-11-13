import React from "react"
import likedSongs from "../../images/liked_songs.png"
import { Link } from "react-router-dom"
import TrackItem from "./TrackItem"

export default function Collection({ liked }) {
    console.log(liked)

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
                        <Link className="cover-owner" to="/">merttsayar TODO </Link>
                        <h4 className="cover-info"> · {liked.length} songs</h4>
                    </div>
                </div>
            </div>
            <div className="track-list">
                {trackElements}
            </div>
        </div>
    )
}