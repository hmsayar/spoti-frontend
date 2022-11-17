import { useState } from "react"
import PlayButton from "./PlayButton"
import useHover from "../../hooks/useHover"
import { Link } from "react-router-dom"

export default function RowItem({ data }) {

    const [isHovered, handleHover] = useHover(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };


    return (

        <Link to={`/playlist/${data.id}`} style={linkStyle}>


            <div
                className="playlist-item"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
            >
                <img className="playlist-item-img" src={data.images[0].url} width={180} height={180} />
                {isHovered && <PlayButton type="home" />}
                <h3>{data.name}</h3>
                <p>{data.description.length<50 ? data.description : data.description.substring(0,45) + "..."}</p>
            </div>
        </Link>


    )
}