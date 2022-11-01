import React from "react"
import spotiLogo from "../images/Spotify_Logo_RGB_White.png"
import NavList from "./sidebarcomponents/NavList"
import NavItem from "./sidebarcomponents/NavItem"
import homeLogo from "./icons/home-line.jpg"
import homeSelectedLogo from "./icons/home-filled.jpg"
import searchLogo from "./icons/search-line.jpg"

export default function Sidebar(){
    console.log("sidebar")
    return(
        <div className="sidebar"> 
            <a href="/">
                <img src={spotiLogo} className="spoti-logo" width={140} height={40} />
            </a>

            <NavList>
                <NavItem ext="/" logo={homeSelectedLogo} name="Home" /> 
                <NavItem ext="/search" logo={searchLogo} name="Search" /> 


            </NavList>
            
        </div>
    )

}
