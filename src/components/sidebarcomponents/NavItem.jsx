import React from "react"

export default function NavItem({ext,logo,name}){
    return(
        <div className="nav-item">
            <img src={logo} width={24} height={24}/>
            <h4>{name}</h4>
        </div>
    )
}