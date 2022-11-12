import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import PlayButton from "./PlayButton"
import TrackItem from "./TrackItem"

export default function Playlist() {

    const { playlistId } = useParams()
    const [playlist, setPlaylist] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: "http://localhost:4000/",
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                const playlist = result.data
                setPlaylist(playlist)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [playlistId])



    const trackElements = playlist.tracks?.items.map((item, i) => {
        return(
            <TrackItem key={item.id} data={item} index={i}/>
        )
    })



    return (
        <div className="playlist-content">
            {loading ?
                null :
                <>
                <div className="playlist-cover">
                    <img className="cover-image" src={playlist.images[0].url}/>
                    <div className="cover-texts">
                        <h4 className="cover-type">{playlist.type.toUpperCase()}</h4>
                        <h1 className="cover-title">{playlist.name}</h1>
                        <h2 className="cover-desc">{playlist.description}</h2>
                        <div className="cover-flex">
                            <Link className="cover-owner" to="/">{playlist.owner.display_name}</Link>
                            <h4 className="cover-info"> · {new Intl.NumberFormat().format(playlist.followers.total)} · {playlist.tracks.total} songs</h4>
                        </div>
                    </div>
                </div>
                
                <div className="track-list">
                    <div className="track-actions">
                        <PlayButton type="playlist" />
                    </div>
                    <div className="tracks-title" >
                        <div className="tracks-title-title">
                            <h3 className="title-first">#</h3>
                            <h3>Title</h3>
                        </div>
                        <h3>Album</h3>
                        <h3>Date</h3>
                        <h3>Duration</h3>
                    </div>

                    {trackElements}
                </div>
                </>
            }
        </div>

    )
}