import { useState, useEffect } from "react"
import { useParams,Link } from "react-router-dom"
import axios from "axios"

export default function TrackPage() {

    const [trackData, setTrackData] = useState({})
    const [loading, setLoading] = useState(true)
    const { trackId } = useParams()

    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/tracks/${trackId}`
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
                const track = result.data
                setTrackData(track)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])
    console.log(trackData)

    return (

        <div className="playlist-content">
            {loading ?
                null :
                <>
                <div className="playlist-cover">
                    <img  src={trackData.album.images[1].url} />
                    <div className="cover-texts">
                        <h4 className="cover-type">{trackData.type.toUpperCase()}</h4>
                        <h1 className="cover-title">{trackData.name}</h1>
                        <div className="cover-flex">
                            <Link className="cover-owner" to={`/artist/${trackData.artists[0].id}`}>{trackData.artists[0].name}</Link>
                            <h4 className="cover-info"> · {trackData.album.release_date} ·  {Math.floor(trackData.duration_ms/60000)}:{((trackData.duration_ms % 60000) / 1000).toFixed(0)}</h4>
                        </div>
                    </div>
                    
                </div>
                <div className="track-list">
                    <h1>Some artist infos</h1>
                </div>
                </>
            }

        </div>


    )
}