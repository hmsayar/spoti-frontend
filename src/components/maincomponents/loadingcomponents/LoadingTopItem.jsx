import React from "react"
import LoadingImg from "./LoadingImg"
import LoadingText from "./LoadingText"


const loadingStyle = {
    display: "flex",
    position: "relative",
    minWidth: "300px",
    width: "20vw",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    borderRadius: "8px",
    maxWidth: "400px"
}


export default function LoadingTopItem({ children }) {
    return (


        <div style={loadingStyle} >
            <LoadingImg style={{ height: "72px", width: "72px", backgroundColor: "rgba(94,94,94,1)", borderRadius: "8px 0 0 8px" }} />
            <LoadingText textWidth="65%" />
        </div>

    )
}