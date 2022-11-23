import React from "react"
import { Link } from "react-router-dom"
import useHover from "../../../hooks/useHover"
import PlayButton from "../PlayButton"

export default function AlbumElement({data}) {

    const [isHovered, handleHover] = useHover(false)
    const linkStyle = {
        textDecoration: "none",
        color: 'white',
    };

    return (

        <div className="playlist-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}>
            {isHovered && <PlayButton type="home" item={data.uri} />}
            <Link key={data.id} to={`/album/${data.id}`} style={linkStyle}>
                <img className="playlist-item-img" width={200} height={200} src={data.images[0].url} />
                <h3>{data.name.length < 20 ? data.name : data.name.substring(0, 20) + "..."}</h3>
                <p>
                    {data.release_date.substring(0, 4)} ·
                </p>
            </Link>
        </div>
    )
}