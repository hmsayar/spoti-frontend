import React from "react"
import { Link } from "react-router-dom"
import useHover from "../../../hooks/useHover"
import PlayButton from "../PlayButton"

export default function ArtistElement({ artist }) {
    const [isHovered, handleHover] = useHover(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
    };



    return (

        <div className="playlist-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}>
            {isHovered && <PlayButton type="home" item={artist.uri} />}
            <Link key={artist.id} to={`/artist/${artist.id}`} style={linkStyle}>
                {artist.images[0] && <img className="artist-image" width={150} height={150} src={artist.images[0].url} />}
                <h3>{artist.name}</h3>
                <p>{artist.type}</p>
            </Link>
        </div>

    )
}