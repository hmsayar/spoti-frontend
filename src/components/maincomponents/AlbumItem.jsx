import React from "react"
import { Link } from "react-router-dom"


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
            <h5 className="duration">{Math.floor(props.data.duration_ms / 60000)}:{((props.data.duration_ms % 60000) / 1000).toFixed(0)}</h5>

        </div>
    )
}