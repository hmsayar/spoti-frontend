import React from "react"
import { Link } from "react-router-dom"

import PlayButton from "../PlayButton"
import useHover from "../../../hooks/useHover"


export default function AlbumsRow({ data }) {


    const linkStyle = {
        textDecoration: "none",
        color: 'white',
    };


    return (

        <>
            <h1>Albums</h1>
            <div
                className="row-content"

            >
                {data.items.map(album => {
                    const [isHovered, handleHover] = useHover(false)
                    return (
                        

                            <Link key={album.id} to={`/album/${album.id}`} style={linkStyle}>
                                <div className="playlist-item"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}>
                                    <img className="playlist-item-img" width={200} height={200} src={album.images[0].url} />
                                    {isHovered && <PlayButton type="home" />}
                                    <h3>{album.name.length < 20 ? album.name : album.name.substring(0, 20) + "..."}</h3>
                                    <p>
                                        {album.release_date.substring(0, 4)} ·
                                    </p>
                                </div>
                            </Link>
                        
                    )
                })}
            </div>

        </>

    )
}