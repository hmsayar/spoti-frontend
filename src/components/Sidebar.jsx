import {useContext} from "react"
import spotiLogo from "../images/Spotify_Logo_RGB_White.png"
import NavList from "./sidebarcomponents/NavList"
import NavItem from "./sidebarcomponents/NavItem"
import homeLogo from "./icons/home-line.jpg"
import homeSelectedLogo from "./icons/home-filled.jpg"
import searchLogo from "./icons/search-line.jpg"
import { LoginContext } from "../context/loginContext"


export default function Sidebar({playlists}){


    const {login} = useContext(LoginContext)

    return(
        <div className="sidebar"> 
            <a href="/">
                <img src={spotiLogo} className="spoti-logo" width={140} height={40} />
            </a>

            <NavList>
                <NavItem ext="/" logo={homeSelectedLogo} name="Home" /> 
                <NavItem ext="/search" logo={searchLogo} name="Search" />
                <NavItem ext={login ? "/collection/playlists" : "/"} logo={homeLogo} name="Library" />
                {
                    login && 
                    <>
                    <NavItem ext="/collection/tracks" logo={homeLogo} name="Favorites" />
                    {playlists.map(playlist => {
                        return(
                            <NavItem key={playlist.id} ext={`/playlist/${playlist.id}`} logo={null} name={playlist.name}/>
                        )
                    })}
                    </>
                }


            </NavList>
            
        </div>
    )

}
