import React from "react"
import spotiLogo from "../images/Spotify_Logo_RGB_White.png"
import NavList from "./NavList"
import NavItem from "./NavItem"

export default function Sidebar(){
    console.log("sidebar")
    return(
        <div className="sidebar"> 
            <a href="/">
                <img src={spotiLogo}  width={140} height={40} />
            </a>

            <NavList>
                <NavItem /> 


            </NavList>
            
        </div>
    )

}
