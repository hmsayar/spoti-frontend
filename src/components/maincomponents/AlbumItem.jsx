import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getDuration from "../utils/duration"
import emptyHeart from "../../images/heart-line.png"
import fillHeart from "../../images/heart-fill.png"
import { LoginContext } from "../../context/loginContext"
import { LikedSongsContext } from "../../context/likedSongsContext"
import useHover from "../../hooks/useHover"
import PlayButton from "./PlayButton"


export default function AlbumItem(props) {

    const {login} = useContext(LoginContext)
    const { likedSongs, handleLikeUnlike } = useContext(LikedSongsContext)
    const [isHovered, handleHover] = useHover(false)
    const [isLiked, setIsLiked] = useState(likedSongs.some(liked => liked.track.id === props.data.id))

    useEffect(() => {
        setIsLiked(likedSongs.some(liked => liked.track.id === props.data.id))
    }, [likedSongs])


    return (
        <div 
        className="album-track-item"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        >

            <div className="track-first">

                {isHovered ?
                    <div className="track-first-play-no">
                        <PlayButton type="track" item={props.data.uri} listUri={props.listUri}/>
                    </div> :
                    <div className="track-first-play-no">
                        <h4 className="track-no">{props.index + 1}</h4>
                    </div>
                }
                <div className="song-artist">
                    <h4>{props.data.name}</h4>
                    {props.data.artists.map(artist =>{
                        return(
                            <Link key={artist.id} className="artist-link" to={`/artist/${artist.id}`}>
                                {artist.name + " "} 
                            </Link>
                        )
                    })}
                </div>

            </div>
            <div style={{ display: "flex", alignItems:"center"}}>
                {(login && isLiked) ?
                    <div style={{ width: "3em" }}>

                        <img
                            style={{ marginRight: "1rem" }}
                            className="heart-icon-track"
                            src={fillHeart}
                            width={20}
                            height={20}
                            onClick={() => handleLikeUnlike(props.data.id)}
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
                                onClick={() => handleLikeUnlike(props.data.id)}
                            />
                        </div> :
                        <div style={{ width: "3em" }}></div>}

                        <h5>{getDuration(props.data.duration_ms)}</h5>

            </div>

        </div>
    )
}