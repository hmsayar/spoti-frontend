import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import SearchPage from "./SearchPage"

export default function MainContent() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    )
}