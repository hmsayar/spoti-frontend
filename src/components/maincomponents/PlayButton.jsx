import React from "react"

export default function PlayButton({type}) {

    return (
        <button 
        className={ `${type === "home" ? "play-button-home" : 
        type==="track" ? "play-button-track": 
        "play-button-playlist"}`} 
        >
            &#9658;
        </button>
    )
}