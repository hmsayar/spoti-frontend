import { Routes, Route } from "react-router-dom"
import AlbumPage from "./AlbumPage"
import Home from "./Home"
import Playlist from "./Playlist"
import SearchPage from "./SearchPage"
import TrackPage from "./TrackPage"
import Artist from "./Artist"
import Collection from "./Collection"
import CollectionPlaylists from "./librarypages/CollectionPlaylists"
import CollectionArtists from "./librarypages/CollectionArtists"
import CollectionAlbums from "./librarypages/CollectionAlbums"
import CollectionPodcasts from "./librarypages/CollectionPodcasts"
import QueuePage from "./QueuePage"



export default function MainContent({query, playlistUriHeader}) {




    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={`/search/`} element={<SearchPage q={query} />} />
            <Route path="/playlist/:playlistId" element={<Playlist playlistUriHeader={playlistUriHeader} />} />
            <Route path="/collection/tracks" element={<Collection /> } />
            <Route path="/queue" element={<QueuePage /> } />


            <Route path="/collection/playlists" element={<CollectionPlaylists />} />
            <Route path="/collection/artists" element={<CollectionArtists />} />
            <Route path="/collection/albums" element={<CollectionAlbums />} />
            <Route path="/collection/podcasts" element={<CollectionPodcasts />} />
            <Route path="/track/:trackId" element={<TrackPage />} />
            <Route path="/album/:albumId" element={<AlbumPage />} />
            <Route path="/artist/:artistId" element={<Artist />} />
        </Routes>
    )
}