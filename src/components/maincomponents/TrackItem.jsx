import { Link } from "react-router-dom"
import useHover from "../../hooks/useHover"
import PlayButton from "./PlayButton"
import emptyHeart from "../../images/heart-line.png"
import fillHeart from "../../images/heart-fill.png"
import { LikedSongsContext } from "../../context/likedSongsContext"
import { useState, useContext, useEffect } from "react"
import { LoginContext } from "../../context/loginContext"
import putWithToken from "../utils/putWithToken"
import deleteWithToken from "../utils/deleteWithToken"
import axios from "axios"
import { TokenContext } from "../../context/tokenContext"


export default function TrackItem(props) {

    const [isHovered, handleHover] = useHover(false)
    const { likedSongs, likeItem, unlikeItem } = useContext(LikedSongsContext)
    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)

    const [isLiked, setIsLiked] = useState(likedSongs.some(liked => liked.track.id === props.data.track.id))

    function handleIsLiked() {
        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!isLiked) {
                body = {
                    ids: [props.data.track.id]
                }
                const request = putWithToken(`https://api.spotify.com/v1/me/tracks?ids=${props.data.track.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        setIsLiked(prev => !prev)
                        likeItem(props.data.track)
                    }
                })
            }else if(isLiked){
                body = {
                    ids: [props.data.track.id]
                }
                const request = deleteWithToken(`https://api.spotify.com/v1/me/tracks?ids=${props.data.track.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        setIsLiked(prev => !prev)
                        unlikeItem(props.data.track)
                    }
                })
            }
        }
    }





    return (
        <div
            className="track-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >

            <div className="track-first">
                {isHovered ?
                    <PlayButton type="track" item={props.data.track.uri} listUri={props.listUri} /> :
                    <h4 className="track-no">{props.index + 1}</h4>
                }
                <img className="track-img" src={props.data.track.album.images[0].url} width={50} height={50} />
                <div className="song-artist">
                    <Link className="track-link" to={`/track/${props.data.track.id}`}>
                        <h4>{props.data.track.name}</h4>
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
            <Link className="artist-link" to={`/album/${props.data.track.album.id}`}>
                <h5>{props.data.track.album.name}</h5>
            </Link>
            <h5>Date</h5>
            <div>
                {(login && isLiked) ?
                    <img
                        className="heart-icon-track"
                        src={fillHeart}
                        width={20}
                        height={20}
                        onClick={handleIsLiked}
                    /> :
                    (isHovered && !isLiked) ?
                        <img
                            className="heart-icon-track"
                            src={emptyHeart}
                            width={20}
                            height={20}
                            onClick={handleIsLiked}
                        /> :
                        null}

                {/* {isHovered && <img className="heart-icon-track" src={emptyHeart} width={20} height={20} />}  */}
            </div>
            <h5>{Math.floor(props.data.track.duration_ms / 60000)}:{((props.data.track.duration_ms % 60000) / 1000).toFixed(0)}</h5>


        </div>
    )
}