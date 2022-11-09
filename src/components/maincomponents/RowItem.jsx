import { useState } from "react"
import PlayButton from "./PlayButton"
import { Link } from "react-router-dom"

export default function RowItem({ data }) {

    const [hovered, setHovered] = useState(false)

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };


    return (

        <Link to={`/playlist/${data.id}`} style={linkStyle}>


            <div
                className="playlist-item"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img src={data.images[0].url} width={180} height={180} />
                {hovered && <PlayButton type="home" />}
                <h3>{data.name}</h3>
                <p>{data.description.length<50 ? data.description : data.description.substring(0,45) + "..."}</p>
            </div>
        </Link>


    )
}