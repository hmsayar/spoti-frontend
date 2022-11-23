import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { LoginContextProvider } from "./context/loginContext"
import { TokenContextProvider } from "./context/tokenContext"
import { UserContextProvider } from './context/userContext'
import { PlayerContextProvider } from "./context/playerContext"
import { LikedSongsContextProvider } from "./context/likedSongsContext"


ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
    <LoginContextProvider>
      <PlayerContextProvider>
        <TokenContextProvider>
          <UserContextProvider>
            <LikedSongsContextProvider>

              <App />
            </LikedSongsContextProvider>
          </UserContextProvider>
        </TokenContextProvider>
      </PlayerContextProvider>
    </LoginContextProvider>
  </Router>
)
