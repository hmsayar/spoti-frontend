import {useState} from "react"
import { Routes, Route, useParams } from "react-router-dom"
import AlbumPage from "./AlbumPage"
import Home from "./Home"
import Playlist from "./Playlist"
import SearchPage from "./SearchPage"
import TrackPage from "./TrackPage"
import Artist from "./Artist"

export default function MainContent({query}) {

    console.log(query)

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={`/search/:query`} element={<SearchPage q={query} />} />
            <Route path="/playlist/:playlistId" element={<Playlist />} />
            <Route path="/track/:trackId" element={<TrackPage />} />
            <Route path="/album/:albumId" element={<AlbumPage />} />
            <Route path="/artist/:artistId" element={<Artist />} />
        </Routes>
    )
}