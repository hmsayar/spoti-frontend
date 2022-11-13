import React from "react"
import { Link } from "react-router-dom"

import PlayButton from "../PlayButton"
import useHover from "../../../hooks/useHover"

export default function ArtistsRow ({ data }) {

    const [isHovered, handleHover] = useHover(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };

      

    return (
        <>
            <h1>Artists</h1>
            <div 
            className="row-content"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            >
                {data.items.map(artist => {
                    return (
                        <Link key={artist.id} to={`/artist/${artist.id}`} style={linkStyle}>
                            <div className="playlist-item">
                                {artist.images[0] && <img width={200} height={200} src={artist.images[0].url} />}
                                {isHovered && <PlayButton type="home" />}
                                <h3>{artist.name}</h3>
                                <p>{artist.type}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </>
    )
}