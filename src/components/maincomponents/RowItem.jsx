import { useState } from "react"
import PlayButton from "./PlayButton"

export default function RowItem({ data }) {

    const [hovered, setHovered] = useState(false)

    return (

        <div
            className="playlist-item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={data.images[0].url} width={180} height={180}/>
            {hovered && <PlayButton />}
            <h3>{data.name}</h3>
            <p>{data.description}</p>
        </div>


    )
}