import React, { useContext, useState, useEffect, useRef } from "react"
import useHover from "../../hooks/useHover"
import { MenuContext } from "../../context/contextMenuContext"
import { PlaylistContext } from "../../context/playlistContext"
import { LoginContext } from "../../context/loginContext"
import { TokenContext } from "../../context/tokenContext"

import axios from "axios"
import putWithToken from "../utils/putWithToken"

// const extMenuStyle = {
//     display: "block",
//     position: "absolute",
//     backgroundColor: "#282828",
//     padding: "1em",
//     left: "160px",
//     top: "80px",
//     color: "white",
//     borderRadius: "10px",
//     zIndex: "999"
// }

export default function CustomMenuItem({ children, type, menuPos }) {
    const [isHovered, handleHover] = useHover(false)
    const { contextMenuData, closeContextMenu } = useContext(MenuContext);
    const { myPlaylists } = useContext(PlaylistContext)
    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)


    const positionRef = useRef(null)
    const extRef = useRef(null)
    const [extMenuStyle, setExtMenuStyle] = useState({
        position: "fixed",
        backgroundColor: "#282828",
        padding: "1em",
        width: "200px",
        color: "white",
        borderRadius: "5px",
        zIndex: "9999",
        maxHeight: "30em",
        height:"250px",
        overflowY: "auto",
        border:"solid black"
    })

    useEffect(() => {

    }, [isHovered])



    function copyClipboard() {
        navigator.clipboard.writeText(`http://localhost:5173/${contextMenuData.type}/${contextMenuData.customData.id}`)
        closeContextMenu()
    }


    function addToPlaylist(id) {
        const source = axios.CancelToken.source()
        let body
        if (login) {
            body = {
                uris: [contextMenuData.customData.uri]
            }
            console.log(body)
            const request = putWithToken(`https://api.spotify.com/v1/playlists/${id}/tracks?ids=${contextMenuData.customData.uri}`, token, source, body, "POST")
            request().then(response => {
                if (response.status === 200) {
                    console.log("added to:" + id)
                } else {
                    console.log(response)
                }
            })

        }
    }

    function handleExtension(e) {
        handleHover()
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = positionRef.current.offsetWidth; //151
        const rootH = positionRef.current.offsetHeight; //33

        // console.log("rootW:"+rootW)
        // console.log("rootH"+rootH)
        // console.log("offsetX:" + e.nativeEvent.offsetX)
        // console.log("offsetY:" + e.nativeEvent.offsetY)
        // console.log("clientX:" + e.clientX)
        // console.log("clientY:" + e.clientY)
        // console.log(posConst)

    let xPosition
    let yPosition=""

    if(menuPos.rightPos){
        const right = (screenW - contextMenuData.xPos - rootW) > parseInt(extMenuStyle.width);
        const left = !right;
        if (right) {
            xPosition = `${contextMenuData.xPos + rootW + 5}px`;
          }
        if(left){
            xPosition = `${contextMenuData.xPos - parseInt(extMenuStyle.width) + 5}px`;
        }
    }
    if(menuPos.leftPos){
        xPosition = `${contextMenuData.xPos - parseInt(extMenuStyle.width)- rootW -20}px`;
    }
    if(menuPos.topPos){
        const top = (screenH - contextMenuData.yPos - parseInt(extMenuStyle.height)) > parseInt(extMenuStyle.height)
        const bottom = !top
        if(bottom){
            yPosition = `${contextMenuData.yPos - rootH -5}px`;
        }

    }
    if(menuPos.bottomPos){
        yPosition = `${contextMenuData.yPos - parseInt(extMenuStyle.height)}px`;
    }

    // if (right) {
    //   xPosition = `${contextMenuData.xPos + rootW + 5}px`;
    // }

    // if (left) {
    //   xPosition = `${contextMenuData.xPos - rootW - 5 - parseInt(extMenuStyle.width)}px`;
    // }


        // let xPosition = contextMenuData.xPos + rootW + 10


        if (type === "add-playlist") {
            setExtMenuStyle(prev => {
                return ({ ...prev, left: xPosition, top:yPosition })
            })
        } else if (type === "share") {
            setExtMenuStyle(prev => {
                return ({ ...prev, left: xPosition, top:yPosition, height:""})
            })
        }


    }




    return (

        <div
            className="context-menu-item context-menu-item-button"
            onMouseEnter={handleExtension}
            onMouseLeave={handleExtension}
            ref={positionRef}
        >
            {children}


            {isHovered && type === "share" ?
                <div className="context-menu-container" style={extMenuStyle}>
                    <button onClick={copyClipboard} className='context-menu-item context-menu-item-button'>Copy link to Playlist</button>
                    <button className='context-menu-item context-menu-item-button'>Embed Playlist</button>
                </div> : null}

            {isHovered && type === "add-playlist" && login ?
                <div className="context-menu-container" style={extMenuStyle}>
                    {myPlaylists.map(pl => {

                        return (
                            <button key={pl.id} onClick={() => addToPlaylist(pl.id)} className='context-menu-item context-menu-item-button'>
                                {pl.name}
                            </button>
                        )

                    })}
                </div> : null}
        </div>

    )
}