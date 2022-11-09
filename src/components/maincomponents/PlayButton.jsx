import React from "react"

const homeStyle ={
    position: "absolute",
    top: "130px",
    right: "20px",
    border: "none",
    backgroundColor: "#1ed760",
    borderRadius: "50%",
    padding: "0.8rem",
    fontSize: "1.5rem"
}

const playlistStyle ={
    border: "none",
    backgroundColor: "#1ed760",
    borderRadius: "50%",
    padding: "1rem",
    fontSize: "1.5rem"
}

export default function PlayButton({type}) {

    return (
        <button 
        className="play-button" 
        style={type==="home" ? homeStyle : playlistStyle}
        >
            &#9658;
        </button>
    )
}