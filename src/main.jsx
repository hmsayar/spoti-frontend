import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LoginContextProvider } from "./context/loginContext"
import { TokenContextProvider } from "./context/tokenContext"
import { UserContextProvider } from './context/userContext'
import { LikedSongsContextProvider } from "./context/likedSongsContext"
import { PlaylistContextProvider } from "./context/playlistContext"
import { MenuContextProvider } from './context/contextMenuContext'
import CustomContextMenu from './components/maincomponents/CustomContextMenu'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
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
  </Router>
)
