import React from "react"
import putWithToken from "../utils/putWithToken"
import { TokenContext } from "../../context/tokenContext"
import { useContext } from "react"
import axios from "axios"

export default function PlayButton({ type, item, listUri }) {

    const { token } = useContext(TokenContext)
    const source = axios.CancelToken.source()

    function PlayItem() {
        let body

        if (type === "track" || type==="track-search") {
            if(listUri){
                body = {
                    context_uri: listUri,
                    offset:{
                        uri:item
                    }
                }
            }else{

                body = {
                    uris: [item]
                }
            }
        } else {
            body = {
                context_uri: item
            }
        }

        const request = putWithToken("https://api.spotify.com/v1/me/player/play", token, source, body)
        request().then(response => {
            if (response.status === 202) {
                console.log("success")
            } else {
                console.log("error")
            }
        })
    }

    return (
        <button
            className={`${type === "home" ? "play-button-home" :
                type === "track" ? "play-button-track" :
                    type === "track-search" ? "play-button-track-search" :
                    type==="top-item-play" ? "top-item-play-button":
                    type==="liked-song-collection" ? "liked-song-collection-button":
                        "play-button-playlist"}`}
            onClick={PlayItem}
        >
            &#9658;
        </button>
    )
}