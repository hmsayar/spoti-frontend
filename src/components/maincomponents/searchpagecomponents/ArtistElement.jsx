import React from "react"
import {Link} from "react-router-dom"
import useHover from "../../../hooks/useHover"
import PlayButton from "../PlayButton"

export default function ArtistElement({artist}) {
    const [isHovered, handleHover] = useHover(false)
    
    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };


    return (

        <Link key={artist.id} to={`/artist/${artist.id}`} style={linkStyle}>
            <div className="playlist-item"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                {artist.images[0] && <img className="artist-image" width={200} height={200} src={artist.images[0].url} />}
                {isHovered && <PlayButton type="home" />}
                <h3>{artist.name}</h3>
                <p>{artist.type}</p>
            </div>
        </Link>

    )
}