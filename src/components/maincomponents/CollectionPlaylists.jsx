import { useContext } from "react"
import { PlaylistContext } from "../../context/playlistContext"
import { LikedSongsContext } from "../../context/likedSongsContext"
import RowItem from "./RowItem"
import PlayButton from "./PlayButton"
import useHover from "../../hooks/useHover"

export default function CollectionPlaylists() {
    const { myPlaylists } = useContext(PlaylistContext)
    const { likedSongs } = useContext(LikedSongsContext)
    const [isHovered, handleHover] = useHover(false)


    const rowItems = myPlaylists.map(item => {
        return (
            <RowItem key={item.id} data={item} />
        )
    })
    return (
        <div className="main-content">
            <div className="collection-playlists">
                <div
                    className="liked-songs-grid"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >

                    <div style={{ position: "absolute", bottom: "70px", left: "30px", }}>
                        <h1>Liked Songs</h1>
                    </div>
                    <div style={{ position: "absolute", bottom: "25px", left: "30px", }}>
                        <p style={{ opacity: 0.8 }}>{likedSongs.length} liked songs</p>
                    </div>
                    {isHovered ? <PlayButton type="liked-song-collection" /> : null}
                </div>
                {rowItems}
            </div>
        </div>
    )
}