import React, { useState, useEffect } from "react";

const MenuContext = React.createContext();


function MenuContextProvider({children}) {
    const [contextMenuData, setContextMenuData] = useState({
        customData: {},
        owner:{},
        playlist_id:"",
        type: "",
        isVisible: false,
        xPos:0, //left
        yPos:0, //top
    });

    function handleContextMenuData(obj){
        setContextMenuData(obj)
    }

    function closeContextMenu(){
        setContextMenuData({
            customData: {},
            owner:{},
            playlist_id:"",
            type: "",
            isVisible: false,
            xPos:0,
            yPos:0,
        })
    }



    return (
        <MenuContext.Provider value={{contextMenuData, handleContextMenuData, closeContextMenu}}>
            {children}
        </MenuContext.Provider>
    )
}

export { MenuContextProvider, MenuContext }