import React from "react"
import emptyCover from "../../images/empty-playlist-image.png"
import emptyCoverHover from "../../images/empty-playlist-hover.png"
import useHover from "../../hooks/useHover"
import {Link} from "react-router-dom"

export default function EmptyPlaylist({ playlist }) {

    const [isHovered, handleHover] = useHover(false)

    return (
        <div className="playlist-content">

            <div className="playlist-cover" style={{ backgroundColor: "grey" }} >
                <img className="cover-image"             
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                src={isHovered ? emptyCoverHover : emptyCover}  />
                <div className="cover-overlay"></div>
                <div className="cover-texts">
                    <h4 className="cover-type">{playlist.type.toUpperCase()}</h4>
                    <h1 className="cover-title">{playlist.name}</h1>
                    <h2 className="cover-desc">{playlist.description}</h2>
                    <div className="cover-flex">
                        <Link className="cover-owner" to="/">{playlist.owner.display_name}</Link>
                        <h4 className="cover-info"> · {new Intl.NumberFormat().format(playlist.followers.total)} likes · {playlist.tracks.total} songs</h4>
                    </div>
                </div>

            </div>
            <hr style={{marginTop:"3em"}}></hr>
        </div>
    )
}