import React from "react"
import { Route, Routes } from "react-router-dom"
import SearchBar from "./SearchBar"


export default function Header() {
    return (
        <div className="header">

            <div className="search-bar">
                <a href="#">B</a>
                <a href="#">F</a>

                <Routes>
                    <Route path="/search" element={<SearchBar />} />
                </Routes>
            </div>



            <div className="btn-container">

                <a href="#" className="btn-sign-up"><b>Sign Up</b></a>
                <a href="#" className="btn-log-in"><b>Log In</b></a>

            </div>


        </div>
    )
}