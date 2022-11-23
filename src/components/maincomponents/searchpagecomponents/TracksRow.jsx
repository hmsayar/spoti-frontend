import React from "react"
import { Link } from "react-router-dom"
import PlayButton from "../PlayButton"

import useHover from "../../../hooks/useHover"
import TrackElement from "./TrackElement"


export default function TracksRow({ data }) {


    const trackElements = data.map(track => {
        return(
            <TrackElement key={track.id} track={track} />
        )
    })


    return (
        <div
            className="search-tracks-container"
        >
            <h1 className="tracks-search-title">Songs</h1>

            {trackElements}

            {/* {
                data?.map(track => {
                    const [isHovered, handleHover] = useHover(false)
                    return (
                        <div
                            key={track.id}
                            className="song-container"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHover}
                        >
                            <div className="track-first search-track-first">
                                <div className="search-song-play-button">
                                    {isHovered && <PlayButton type="track-search" item = {track.uri} />}
                                    <img className="track-img" src={track.album.images[0].url} width={30} height={30} />
                                </div>
                                <div className="song-artist">
                                    <h4>{track.name}</h4>
                                    {track.artists.map((artist, i, arr) => {
                                        return (
                                            <Link key={artist.id} className="artist-link" to={`/artist/${artist.id}`}>
                                                {i + 1 === arr.length ? artist.name : artist.name + ", "}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <h4
                                className="duration">
                                {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0)}
                            </h4>
                        </div>

                    )
                })
            } */}

        </div>
    )
}