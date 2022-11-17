import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { LoginContextProvider } from "./context/loginContext"
import { TokenContextProvider } from "./context/tokenContext"
import { UserContextProvider } from './context/userContext'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Router>
      <LoginContextProvider>
        <TokenContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </TokenContextProvider>
      </LoginContextProvider>
    </Router>
)
