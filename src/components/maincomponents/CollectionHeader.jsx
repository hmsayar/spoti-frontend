import React from "react"
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};


export default function CollectionHeader({ type }) {
    return (
        <div className="header-menu">
            <Link to="/collection/playlists" style={linkStyle}>

                <div className={`header-menu-item ${type === "playlists" ? "selected-menu-item" : null}`}>
                    <p><strong>Playlist</strong></p>
                </div>
            </Link>
            <Link to="/collection/podcasts" style={linkStyle}>

                <div className={`header-menu-item ${type === "podcasts" ? "selected-menu-item" : null}`}>
                    <p><strong>Podcasts</strong></p>
                </div>
            </Link>
            <Link to="/collection/artists" style={linkStyle}>

                <div className={`header-menu-item ${type === "artists" ? "selected-menu-item" : null}`}>
                    <p><strong>Artists</strong></p>
                </div>
            </Link>
            <Link to="/collection/albums" style={linkStyle}>
                <div className={`header-menu-item ${type === "albums" ? "selected-menu-item" : null}`}>
                    <p><strong>Albums</strong></p>
                </div>
            </Link>

        </div>
    )
}