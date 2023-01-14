import React from "react"
import LoadingImg from "./LoadingImg"
import LoadingText from "./LoadingText"


const loadingStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "10px",
    margin: "0px 5px 0 5px"
}


export default function LoadingPlaylistItem() {
    return (
        <div style={loadingStyle}>
            <LoadingImg style={{ height: "180px", width: "180px", backgroundColor: "rgba(94,94,94,1)", borderRadius: "10px" }} />
            <LoadingText textWidth="80%" />
            <LoadingText textWidth="65%" />
        </div>
    )
}