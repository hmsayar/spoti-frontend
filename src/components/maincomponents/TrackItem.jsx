import React from "react"
import {Link} from "react-router-dom"

export default function TrackItem(props){


    
    return(
        <div className="track-item">

            <div className="track-first">
                <h4 className="track-no">{props.index+1}</h4>
                <img className="track-img" src={props.data.track.album.images[0].url} width={50} height={50} />
                <div className="song-artist">
                    <Link className="track-link" to={`/track/${props.data.track.id}`}>
                        <h4>{props.data.track.name}</h4>
                    </Link>
                    {props.data.track.artists.map(artist =>{
                        return(
                            <Link key={props.data.track.artists.id} className="artist-link"  to={`/artist/${artist.id}`}>
                                {artist.name + " "} 
                            </Link>
                        )
                    })}

                </div>

            </div>
            <Link className="artist-link" to={`/album/${props.data.track.album.id}`}>
                <h5>{props.data.track.album.name}</h5>
            </Link>
            <h5>{}</h5>
            <h5 className="duration">{Math.floor(props.data.track.duration_ms/60000)}:{((props.data.track.duration_ms % 60000) / 1000).toFixed(0)}</h5>

        </div>
    )
}