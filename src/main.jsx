import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter } from "react-router-dom"
import { LoginContextProvider } from "./context/loginContext"
import { TokenContextProvider } from "./context/tokenContext"
import { UserContextProvider } from './context/userContext'
import { LikedSongsContextProvider } from "./context/likedSongsContext"
import { PlaylistContextProvider } from "./context/playlistContext"
import { MenuContextProvider } from './context/contextMenuContext'
import CustomContextMenu from './components/maincomponents/CustomContextMenu'



ReactDOM.createRoot(document.getElementById('root')).render(

  <HashRouter>
    <LoginContextProvider>
        <TokenContextProvider>
          <UserContextProvider>
            <PlaylistContextProvider>
              <LikedSongsContextProvider>
                <MenuContextProvider>
                <App />
                <CustomContextMenu />
                </MenuContextProvider>
              </LikedSongsContextProvider>
            </PlaylistContextProvider>
          </UserContextProvider>
        </TokenContextProvider>
    </LoginContextProvider>
  </HashRouter>
)
