import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { LoginContextProvider } from "./context/loginContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <LoginContextProvider>

        <App />
      </LoginContextProvider>
    </Router>
  </React.StrictMode>
)
