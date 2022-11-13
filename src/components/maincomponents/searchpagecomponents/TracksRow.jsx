import React from "react"
import { Link } from "react-router-dom"
import PlayButton from "../PlayButton"


import useHover from "../../../hooks/useHover"

export default function TracksRow({ data }) {

    const [isHovered, handleHover] = useHover(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
    };


    return (
        <div
            className="search-tracks-container"
        >
            <h1 className="tracks-search-title">Tracks</h1>

            {
                data?.map(track => {
                    return (
                        <div
                            key={track.id}
                            className="song-container"
                        >
                            <div className="track-first search-track-first">

                                <PlayButton type="track" />
                                <img className="track-img" src={track.album.images[0].url} width={30} height={30} />
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
            }

        </div>
    )
}