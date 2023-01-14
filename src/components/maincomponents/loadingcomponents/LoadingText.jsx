import React from "react"

const loadingStyle = {
    marginLeft:"1rem", 
    marginRight:"1rem",
    backgroundColor:"rgb(68,68,68)",
    borderRadius: "10px",
    margin:"1rem"
}

export default function LoadingText({textWidth, textHeight="20px"}) {
    return (
        <div style={{...loadingStyle, width:textWidth, height:textHeight}} />
    )
}