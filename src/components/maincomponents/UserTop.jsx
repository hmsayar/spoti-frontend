import React from "react"
import PlayButton from "./PlayButton"
import useHover from "../../hooks/useHover"
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};


export default function UserTop({ data }) {
    const [isHovered, handleHover] = useHover(false)

    return (
        <div
            className="top-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            {isHovered && <PlayButton type="top-item-play" item={data.uri} />}
            <Link style={linkStyle} to={`/artist/${data.id}`}>
                <div className="top-item-right">
                    <img className="top-item-img" src={data.images[2].url} height={72} width={72} />
                    <h3 style={{ marginLeft: "1rem" }}>{data.name}</h3>
                </div>
            </Link>
        </div>
    )
}