import { Link } from "react-router-dom"
import useHover from "../../hooks/useHover"
import PlayButton from "./PlayButton"
import emptyHeart from "../../images/heart-line.png"
import fillHeart from "../../images/heart-fill.png"
import { LikedSongsContext } from "../../context/likedSongsContext"
import { useState, useContext, useEffect } from "react"
import { LoginContext } from "../../context/loginContext"
import { MenuContext } from "../../context/contextMenuContext"
import getDuration from "../utils/duration"
import dateFormatter from "../utils/dateFormat"



// const onContextStyle = {
//     textDecoration: "underline"
// }


export default function TrackItem(props) {

    const [isHovered, handleHover] = useHover(false)
    const { likedSongs, handleLikeUnlike } = useContext(LikedSongsContext)
    const { login } = useContext(LoginContext)

    const [isLiked, setIsLiked] = useState(likedSongs.some(liked => liked.track.id === props.data.track.id))
    // const [onContextLinkStyle, setOnContextLinkStyle] = useState(false)

    const { handleContextMenuData } = useContext(MenuContext);

    useEffect(() => {
        setIsLiked(likedSongs.some(liked => liked.track.id === props.data.track.id))
    }, [likedSongs])


    const handleContextMenu = (event) => {
        event.preventDefault();
        handleContextMenuData({
            customData: props.data.track,
            owner: props.data.added_by,
            playlist_id: props.playlistId,
            type: "track",
            isVisible: true,
            xPos: event.clientX,
            yPos: event.clientY
        });
    };


    return (
        <div
            className="track-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onContextMenu={handleContextMenu}
        >

            <div className="track-first">
                {isHovered ?
                    <div className="track-first-play-no">
                        <PlayButton type="track" item={props.data.track.uri} listUri={props.listUri} />
                    </div> :
                    <div className="track-first-play-no">
                        <h4 className="track-no">{props.index + 1}</h4>
                    </div>
                }
                <img className="track-img" src={props.data.track.album.images[0].url} width={40} height={40} />
                <div className="song-artist">
                    <Link className="track-link" to={`/track/${props.data.track.id}`}>
                        <h4 className="track-name-overflow">{props.data.track.name}</h4>
                    </Link>
                    {props.data.track.artists.map((artist, i, arr) => {
                        return (
                            <Link key={artist.id} className="artist-link" to={`/artist/${artist.id}`}>
                                {i + 1 === arr.length ? artist.name : artist.name + ", "}
                            </Link>
                        )
                    })}

                </div>

            </div>
            {props.windowWidth > 820 && <Link className="artist-link" to={`/album/${props.data.track.album.id}`}>
                <h5>{props.data.track.album.name}</h5>
            </Link>}
            {props.windowWidth > 1070 && <h5 className="track-date-link">{dateFormatter(props.data.added_at)}</h5>}

            <div style={{ display: "flex", alignItems: "center" }}>
                {(login && isLiked) ?
                    <div style={{ width: "3em" }}>

                        <img
                            style={{ marginRight: "1rem" }}
                            className="heart-icon-track"
                            src={fillHeart}
                            width={20}
                            height={20}
                            onClick={() => handleLikeUnlike(props.data.track.id)}
                        />
                    </div> :
                    (isHovered && !isLiked) ?
                        <div style={{ width: "3em" }}>


                            <img
                                style={{ marginRight: "1rem" }}
                                className="heart-icon-track"
                                src={emptyHeart}
                                width={20}
                                height={20}
                                onClick={() => handleLikeUnlike(props.data.track.id)}
                            />
                        </div> :
                        <div style={{ width: "3em" }}></div>}

                <h5>{getDuration(props.data.track.duration_ms).forTrack}</h5>

            </div>


        </div>
    )
}