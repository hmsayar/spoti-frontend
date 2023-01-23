import React, { useState, useContext, useEffect, useRef } from 'react';
import { MenuContext } from '../../context/contextMenuContext';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { LoginContext } from "../../context/loginContext"
import { PlaylistContext } from "../../context/playlistContext"
import { LikedSongsContext } from '../../context/likedSongsContext';
import CustomMenuItem from './CustomMenuItem';
import { UserContext } from "../../context/userContext"
import { TokenContext } from '../../context/tokenContext';
import deleteWithToken from '../utils/deleteWithToken';
import axios from 'axios';





export default function CustomContextMenu() {
  const [isLikedPlaylist, setIsLikedPlaylist] = useState(false)
  const [isLikedSong, setIsLikedSong] = useState(false)


  const [menuPos, setMenuPos] = useState({ rightPos: false, leftPos: false, topPos: false, bottomPos: false })
  const [menuSize, setMenuSize] = useState({ menuHeight: 0, menuWidth: 0 })



  const { login } = useContext(LoginContext)
  const { token } = useContext(TokenContext)
  const { myPlaylists, handleLikePlaylist } = useContext(PlaylistContext)
  const { likedSongs, handleLikeUnlike } = useContext(LikedSongsContext)
  const { user } = useContext(UserContext)


  const { contextMenuData, closeContextMenu } = useContext(MenuContext);
  const containerRef = useRef(null)


  const visibleStyle = {
    display: "block",
    position: "fixed",
    backgroundColor: "#282828",
    padding: "0.6em",
    color: "white",
    borderRadius: "5px",
    zIndex: "998"
  }




  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);


    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      console.log("unmounted")

    };
  }, []);



  useEffect(() => {

    let idLockerEl = document.getElementById("id-locker")

    if (contextMenuData.isVisible) {

      idLockerEl.classList.add("scrollbar-hidden")

    } else if (!contextMenuData.isVisible) {

      idLockerEl.classList.remove("scrollbar-hidden")


    }

    if (login) {
      if (contextMenuData.type === "playlist") {
        let bool = myPlaylists.some(item => item.id === contextMenuData.customData.id)
        setIsLikedPlaylist(bool)
      }
      if (contextMenuData.type === "track") {
        let bool = likedSongs.some(item => item.track.id === contextMenuData.customData.id)
        setIsLikedSong(bool)
      }
    }


    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = containerRef.current.offsetWidth;
    const rootH = containerRef.current.offsetHeight;
    setMenuSize({ menuHeight: rootH, menuWidth: rootW })

    const right = (screenW - contextMenuData.xPos) > rootW;
    const left = !right;
    const top = (screenH - contextMenuData.yPos) > rootH;
    const bottom = !top;

    if (right) {
      containerRef.current.style.left = `${contextMenuData.xPos + 5}px`;
    }

    if (left) {
      containerRef.current.style.left = `${contextMenuData.xPos - rootW - 5}px`;
    }

    if (top) {
      containerRef.current.style.top = `${contextMenuData.yPos + 5}px`;
    }

    if (bottom) {
      containerRef.current.style.top = `${contextMenuData.yPos - rootH - 5}px`;
    }
    setMenuPos({ rightPos: right, leftPos: left, topPos: top, bottomPos: bottom })

  }, [contextMenuData])



  function handleMouseDown(event) {
    if (!containerRef.current.contains(event.target)) {
      closeContextMenu();

    }
    setMenuPos({ right: false, left: false, top: false, bottom: false })
  }


  function handleAddToLibrary() {
    handleLikePlaylist(contextMenuData.customData.id)
    closeContextMenu();
  }
  function handleRemovefromLibrary() {
    const source = axios.CancelToken.source()
    let body
    if (login) {
      body = {
        tracks: [{ uri: contextMenuData.customData.uri }]
      }

      const request = deleteWithToken(`https://api.spotify.com/v1/playlists/${contextMenuData.playlist_id}/tracks`, token, source, body)
      request().then(response => {
        if (response.status === 200) {
          console.log("deleted")
        } else {
          console.log(response)
        }
      })
    }
    closeContextMenu()
  }

  function handleLikedSongs() {
    handleLikeUnlike(contextMenuData.customData.id)
    closeContextMenu();
  }



  return createPortal(
    <div
      ref={containerRef}
      style={
        contextMenuData.isVisible ?
          visibleStyle :
          { display: "none" }}>
      {
        contextMenuData.type === "playlist" ?
          <div className='context-menu-container'>
            <Link className='context-menu-item context-menu-item-link' to={`/playlist/${contextMenuData.customData.id}`} onClick={closeContextMenu}>Go to Playlist Radio</Link>
            {isLikedPlaylist ?
              <button className='context-menu-item context-menu-item-button' onClick={handleAddToLibrary}>Remove from Your Library</button> :
              <button className='context-menu-item context-menu-item-button' onClick={handleAddToLibrary}>Add to Your Library</button>
            }
            <hr></hr>
            <CustomMenuItem type="share" menuPos={menuPos} menuSize={menuSize} >
              <span>Share</span> <span> &#9658;</span>
            </CustomMenuItem>
            <hr></hr>
            <button className='context-menu-item context-menu-item-button'>About recommendation</button>
            <hr></hr>
            <button className='context-menu-item context-menu-item-button'>Open in Desktop app</button>
          </div>
          :
          contextMenuData.type === "track" ?
            <div className='context-menu-container'>
              <button className='context-menu-item context-menu-item-button'>Add to Queue</button>
              <hr></hr>
              <Link className='context-menu-item context-menu-item-link' to={`/artist/${contextMenuData.customData.artists[0].id}`} onClick={closeContextMenu}>Go to Artist</Link>
              <Link className='context-menu-item context-menu-item-link' to={`/album/${contextMenuData.customData.album.id}`} onClick={closeContextMenu}>Go to Album</Link>
              <button className='context-menu-item context-menu-item-button'>Show Credits</button>
              <hr></hr>

              {isLikedSong ?
                <button className='context-menu-item context-menu-item-button' onClick={handleLikedSongs}>Remove from Your Liked Songs</button> :
                <button className='context-menu-item context-menu-item-button' onClick={handleLikedSongs}>Save to your Liked Songs</button>
              }

              {user.id === contextMenuData.owner.id ?
                <button className='context-menu-item context-menu-item-button' onClick={handleRemovefromLibrary}>Remove from this playlist</button> :
                null
              }

              <CustomMenuItem type="add-playlist" menuPos={menuPos} menuSize={menuSize} index={6} >
                <span>Add to Playlist</span> <span> &#9658;</span>
              </CustomMenuItem>
              <hr></hr>
              <CustomMenuItem type="share" menuPos={menuPos} menuSize={menuSize} index={7}>
                <span>Share</span> <span> &#9658;</span>
              </CustomMenuItem>


            </div> :
            contextMenuData.type === "my-playlist" ?
              <div className='context-menu-container'>
                <button className='context-menu-item context-menu-item-button'>Open in Desktop app</button>
                <Link className='context-menu-item context-menu-item-link' to={`/playlist/${contextMenuData.playlist_id}`} onClick={closeContextMenu}>Go to Playlist Radio</Link>
                <button className='context-menu-item context-menu-item-button'>Add to Profile</button>
                <hr></hr>
                <button onClick={handleAddToLibrary} className='context-menu-item context-menu-item-button'>Delete</button>

              </div> :
              null

      }

    </div>, document.body
  );
}