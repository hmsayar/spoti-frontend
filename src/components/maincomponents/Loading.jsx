import React from "react"
import LoadingTopItem from "./loadingcomponents/LoadingTopItem"
import LoadingPlaylistItem from "./loadingcomponents/LoadingPlaylistItem"
import LoadingText from "./loadingcomponents/LoadingText"


export default function Loading() {
    return (
        <div style={{"marginTop":"10em"}}>
            <div className="loading-top-item-container">
                <LoadingTopItem />
                <LoadingTopItem />
                <LoadingTopItem />
                <LoadingTopItem />
                <LoadingTopItem />
                <LoadingTopItem />
            </div>
            <LoadingText textWidth="20%" textHeight="25px" />
            <div className="loading-row-content">
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
            </div>
            <LoadingText textWidth="20%" textHeight="25px" />
            <div className="loading-row-content">
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
            </div>
            <LoadingText textWidth="20%" textHeight="25px" />
            <div className="loading-row-content">
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
                <LoadingPlaylistItem />
            </div>
        </div>
    )
}