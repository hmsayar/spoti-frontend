import React from "react"
import { Link } from "react-router-dom"
import useHover from "../../../hooks/useHover"
import PlayButton from "../PlayButton"
import getDuration from "../../utils/duration"

export default function TrackElement({track}){

    const [isHovered, handleHover] = useHover(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
    };



    return(
        <div
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
            {getDuration(track.duration_ms)}
        </h4>
    </div>
    )
}