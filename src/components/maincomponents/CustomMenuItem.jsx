import React, { useContext, useState, useEffect, useRef } from "react"
import useHover from "../../hooks/useHover"
import { MenuContext } from "../../context/contextMenuContext"
import { PlaylistContext } from "../../context/playlistContext"
import { LoginContext } from "../../context/loginContext"
import { TokenContext } from "../../context/tokenContext"
import { UserContext } from "../../context/userContext"

import axios from "axios"
import putWithToken from "../utils/putWithToken"


export default function CustomMenuItem({ children, type, menuPos, menuSize, index }) {
    const [isHovered, handleHover] = useHover(false)
    const { contextMenuData, closeContextMenu } = useContext(MenuContext);
    const { myPlaylists } = useContext(PlaylistContext)
    const { login } = useContext(LoginContext)
    const { token } = useContext(TokenContext)
    const { user } = useContext(UserContext)


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
        height: "250px",
        overflowY: "auto",
        border: "solid black"
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
        const rootW = positionRef.current.offsetWidth; 



        let xPosition

        if (menuPos.rightPos) {
            const right = (screenW - contextMenuData.xPos - rootW) > parseInt(extMenuStyle.width);
            const left = !right;
            if (right) {
                xPosition = `${contextMenuData.xPos + rootW + 5}px`;
            }
            if (left) {
                xPosition = `${contextMenuData.xPos - parseInt(extMenuStyle.width) + 5}px`;
            }
        }
        if (menuPos.leftPos) {
            xPosition = `${contextMenuData.xPos - parseInt(extMenuStyle.width) - rootW - 20}px`;
        }


        if (type === "add-playlist") {
            setExtMenuStyle(prev => {
                return ({ ...prev, left: xPosition, top: "auto" })
            })
        } else if (type === "share") {
            setExtMenuStyle(prev => {
                return ({ ...prev, left: xPosition, top: "auto", height: "" })
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
                            user.display_name === pl.owner.display_name &&
                            <button key={pl.id} onClick={() => addToPlaylist(pl.id)} className='context-menu-item context-menu-item-button'>
                                {pl.name}
                            </button>
                        )

                    })}

                </div> : null}
        </div>


    )
}