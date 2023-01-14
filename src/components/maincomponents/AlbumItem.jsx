import React from "react"
import { Link } from "react-router-dom"
import getDuration from "../utils/duration"


export default function AlbumItem(props) {


    return (
        <div className="track-item">

            <div className="track-first">
                <h4 className="track-no">{props.index+1}</h4>
                <div className="song-artist">
                    <h4>{props.data.name}</h4>
                    {props.data.artists.map(artist =>{
                        return(
                            <Link key={artist.id} className="artist-link" to={`/artist/${artist.id}`}>
                                {artist.name + " "} 
                            </Link>
                        )
                    })}
                </div>

            </div>
            <h5 className="duration">{getDuration(props.data.duration_ms)}</h5>

        </div>
    )
}