import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import AlbumItem from "./AlbumItem"
import PlayButton from "./PlayButton"

export default function AlbumPage() {

    const [albumData, setAlbumData] = useState({})
    const [loading, setLoading] = useState(true)
    const { albumId } = useParams()


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/albums/${albumId}`
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
                const album = result.data
                setAlbumData(album)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])


    const albumElements = albumData.tracks?.items.map((item, i) => {
        return (
            <AlbumItem key={item.id} data={item} index={i} />
        )
    })

    return (
        <div className="playlist-content">
            {loading ?
                null :
                <>
                    <div className="playlist-cover">
                        <img src={albumData.images[1].url} />
                        <div className="cover-texts">
                            <h4 className="cover-type">{albumData.type.toUpperCase()}</h4>
                            <h1 className="cover-title">{albumData.name}</h1>
                            <div className="cover-flex">
                                <Link className="cover-owner" to="/">{albumData.artists[0].name}</Link>
                                <h4 className="cover-info"> · {albumData.release_date} · </h4>
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
                            <h3>Duration</h3>
                        </div>
                        {albumElements}
                    </div>
                </>
            }

        </div>
    )
}