import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
const AlbumPage = lazy(() => import("./AlbumPage"))
const Home = lazy(() => import("./Home"))
const Playlist = lazy(() => import("./Playlist"))
const SearchPage = lazy(() => import("./SearchPage"))
const TrackPage = lazy(() => import("./TrackPage"))
const Artist = lazy(() => import("./Artist"))
const Collection = lazy(() => import("./Collection"))
const CollectionPlaylists = lazy(() => import("./librarypages/CollectionPlaylists"))
const CollectionArtists = lazy(() => import("./librarypages/CollectionArtists"))
const CollectionAlbums = lazy(() => import("./librarypages/CollectionAlbums"))
const CollectionPodcasts = lazy(() => import("./librarypages/CollectionPodcasts"))
const QueuePage = lazy(() => import("./QueuePage"))

import Loading from "./Loading"




export default function MainContent({ query, playlistUriHeader }) {




    return (
        <Suspense fallback={<div>...</div>} >
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path={`/search/`} element={<SearchPage q={query} />} />
                <Route path="/playlist/:playlistId" element={<Playlist playlistUriHeader={playlistUriHeader} />} />
                <Route path="/collection/tracks" element={<Collection />} />
                <Route path="/queue" element={<QueuePage />} />
                <Route path="/collection/playlists" element={<CollectionPlaylists />} />
                <Route path="/collection/artists" element={<CollectionArtists />} />
                <Route path="/collection/albums" element={<CollectionAlbums />} />
                <Route path="/collection/podcasts" element={<CollectionPodcasts />} />
                <Route path="/track/:trackId" element={<TrackPage />} />
                <Route path="/album/:albumId" element={<AlbumPage />} />
                <Route path="/artist/:artistId" element={<Artist />} />
            </Routes>
        </Suspense>
    )
}