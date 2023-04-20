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
import DifferentLoading from "./loadingcomponents/DifferentLoading"




export default function MainContent({ query, playlistUriHeader }) {




    return (

        <div className="main-content-div">

            <Routes>
                <Route exact path="/" element={
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                } />
                <Route path={`/search/`} element={
                    <Suspense fallback={<DifferentLoading />}>
                        <SearchPage q={query} />
                    </Suspense>
                } />
                <Route path="/playlist/:playlistId" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <Playlist playlistUriHeader={playlistUriHeader} />
                    </Suspense>
                } />
                <Route path="/collection/tracks" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <Collection />
                    </Suspense>
                } />
                <Route path="/queue" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <QueuePage />
                    </Suspense>
                } />
                <Route path="/collection/playlists" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <CollectionPlaylists />
                    </Suspense>} />
                <Route path="/collection/artists" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <CollectionArtists />
                    </Suspense>} />
                <Route path="/collection/albums" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <CollectionAlbums />
                    </Suspense>} />
                <Route path="/collection/podcasts" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <CollectionPodcasts />
                    </Suspense>} />
                <Route path="/track/:trackId" element={<Suspense fallback={<DifferentLoading />}>
                    <TrackPage />
                </Suspense>} />
                <Route path="/album/:albumId" element={
                    <Suspense fallback={<DifferentLoading />}>
                        <AlbumPage />
                    </Suspense>} />
                <Route path="/artist/:artistId" element={<Suspense fallback={<DifferentLoading />}>
                    <Artist />
                </Suspense>} />
            </Routes>
        </div>
    )
}