import React from "react"
import {Link} from "react-router-dom"
import useHover from "../../hooks/useHover"
import PlayButton from "./PlayButton"
import emptyHeart from "../../images/empty-heart.png"

export default function TrackItem(props){

    const [isHovered, handleHover] = useHover(false)

    
    return(
        <div 
        className="track-item"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        >

            <div className="track-first" >
                {isHovered ?
                    <PlayButton type="track" /> :
                    <h4 className="track-no">{props.index + 1}</h4>
                }
                <img className="track-img" src={props.data.track.album.images[0].url} width={50} height={50} />
                <div className="song-artist">
                    <Link className="track-link" to={`/track/${props.data.track.id}`}>
                        <h4>{props.data.track.name}</h4>
                    </Link>
                    {props.data.track.artists.map((artist, i, arr) =>{
                        return(
                            <Link key={artist.id} className="artist-link"  to={`/artist/${artist.id}`}>
                                {i+1===arr.length ? artist.name :artist.name + ", "} 
                            </Link>
                        )
                    })}

                </div>

            </div>
            <Link className="artist-link" to={`/album/${props.data.track.album.id}`}>
                <h5>{props.data.track.album.name}</h5>
            </Link>
            <h5>Date</h5>
            <div className="duration">

                {/* <img className="heart-icon-track" src={emptyHeart} width={20} height={20} /> */}
                <h5>{Math.floor(props.data.track.duration_ms / 60000)}:{((props.data.track.duration_ms % 60000) / 1000).toFixed(0)}</h5>
            </div>

        </div>
    )
}