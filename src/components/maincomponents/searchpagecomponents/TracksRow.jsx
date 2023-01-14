import React from "react"

import TrackElement from "./TrackElement"


export default function TracksRow({ data }) {


    const trackElements = data.map(track => {
        return(
            <TrackElement key={track.id} track={track} />
        )
    })


    return (
        <div
            className="search-tracks-container"
        >
            <h1 className="tracks-search-title">Songs</h1>

            {trackElements}

        </div>
    )
}