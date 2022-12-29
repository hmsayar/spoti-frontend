import { useContext } from "react"
import spotiLogo from "../images/Spotify_Logo_RGB_White.png"
import NavList from "./sidebarcomponents/NavList"
import NavItem from "./sidebarcomponents/NavItem"
import searchLogoUnselected from "../images/search-line.png"
import libraryLogo from "../images/book-3-line.png"
import homeSelectedLogo from "../images/home-5-line-unhovered.png"
import addBoxLogo from "../images/add-box-fill.png"
import { LoginContext } from "../context/loginContext"
import likedSongs from "../images/liked_songs.png"
import { LikedSongsContext } from "../context/likedSongsContext"
import { PlaylistContext } from "../context/playlistContext"


export default function Sidebar() {


    const { login } = useContext(LoginContext)
    const { myPlaylists } = useContext(PlaylistContext)

    return (
        <div className="sidebar">
            <a href="/">
                <img src={spotiLogo} className="spoti-logo" width={140} height={40} />
            </a>

            <div className="nav-list">
                <NavItem ext="/" logo={homeSelectedLogo} name="Home" />
                <NavItem ext="/search" logo={searchLogoUnselected} name="Search" />
                <NavItem style={{marginBottom:"2em"}} ext={login ? "/collection/playlists" : "/"} logo={libraryLogo} name="Library" />
                {
                    login &&
                    <>
                        <NavItem ext="/" logo={addBoxLogo} name="Create Playlist" />
                        <NavItem ext="/collection/tracks" logo={likedSongs} name="Liked Songs" />
                        <hr></hr>

                        <div className="sidebar-list">

                            {myPlaylists.map(playlist => {
                                return (
                                    <NavItem cssClass={"second-list"} key={playlist.id} ext={`/playlist/${playlist.id}`} logo={null} name={playlist.name} />
                                )
                            })}
                        </div>
                    </>
                }
            </div>

        </div>
    )

}
