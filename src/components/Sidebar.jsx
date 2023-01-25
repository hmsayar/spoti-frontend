import { useContext } from "react"
import spotiLogo from "../images/Spotify_Logo_RGB_White.png"
import { LoginContext } from "../context/loginContext"
import likedSongs from "../images/liked_songs.png"
import { PlaylistContext } from "../context/playlistContext"
import { useLocation } from 'react-router-dom'
import NavItem from "./sidebarcomponents/NavItem"

import { MenuContext } from "../context/contextMenuContext"
import { UserContext } from "../context/userContext"



import searchLogoUnselected from "../images/search-line.png"
import searchLogoSelected from "../images/search-fill.png"


import libraryLogoUnselected from "../images/book-3-line.png"
import libraryLogoSelected from "../images/book-3-fill.png"


import homeLogoUnselected from "../images/home-5-line-unhovered.png"
import homeLogoSelected from "../images/home-5-fill.png"

import addBoxLogo from "../images/add-box-fill.png"


export default function Sidebar() {



    const location = useLocation()

    const { login } = useContext(LoginContext)
    const { myPlaylists } = useContext(PlaylistContext)
    const { user } = useContext(UserContext)
    
    const { handleContextMenuData } = useContext(MenuContext);

    function handleContextMenu(playlist,e){
        e.preventDefault()
        let playlist_type = playlist.owner.display_name === user.display_name ? "my-playlist" : "playlist"
        handleContextMenuData({
            customData: playlist,
            owner: playlist.owner.display_name,
            playlist_id: playlist.id,
            type: playlist_type,
            isVisible: true,
            xPos: e.clientX,
            yPos: e.clientY
        });
    }


    return (
        <div className="sidebar">
            <a href="/">
                <img src={spotiLogo} className="spoti-logo" width={140} height={40} />
            </a>

            <div className="nav-list">
                <NavItem
                    ext="/"
                    logo={location.pathname === "/" ? homeLogoSelected : homeLogoUnselected}
                    name="Home"
                    isSelected={location.pathname === "/"}
                />
                <NavItem
                    ext="/search"
                    logo={location.pathname === "/search" ? searchLogoSelected : searchLogoUnselected}
                    name="Search"
                    isSelected={location.pathname === "/search"}
                />
                <NavItem
                    style={{ marginBottom: "2em" }}
                    ext={login ? "/collection/playlists" : location.pathname}
                    logo={location.pathname === "/collection/playlists" ? libraryLogoSelected : libraryLogoUnselected}
                    name="Library"
                    isSelected={location.pathname === "/collection/playlist"}
                />
                <NavItem
                    ext="/"
                    logo={addBoxLogo}
                    name="Create Playlist"
                />

                <NavItem
                    ext={login ? "/collection/tracks" : location.pathname}
                    logo={likedSongs}
                    name="Liked Songs" />
                {
                    login &&
                    <>
                        <hr></hr>

                        <div className="sidebar-list">

                            {myPlaylists.map(playlist => {
                                return (
                                    <NavItem
                                        contextMenu={(e)=>handleContextMenu(playlist,e)}
                                        cssClass={"second-list"}
                                        key={playlist.id}
                                        ext={`/playlist/${playlist.id}`}
                                        logo={null}
                                        name={playlist.name}
                                        isSelected={location.pathname === `/playlist/${playlist.id}`}
                                    />
                                )
                            })}
                        </div>
                    </>
                }
            </div>

        </div>
    )

}
