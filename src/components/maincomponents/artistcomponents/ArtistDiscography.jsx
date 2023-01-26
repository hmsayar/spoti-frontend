import { useState, useEffect } from "react";
import axios from "axios";
import AlbumElement from "../searchpagecomponents/AlbumElement";

export default function ArtistDiscography({ id }) {

    const [artistAlbums, setArtistAlbums] = useState({})
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState("album")

    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=9&include_groups=${selected}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: `${import.meta.env.VITE_APP_BACK_URI}`,
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                const artistAlbum = result.data
                setArtistAlbums(artistAlbum)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [selected,id])

    const albumElements = artistAlbums.items?.map(album => {
        return (
            <AlbumElement key={album.id} data={album} />
        )
    })

    return (
        <>
            <h2 style={{ marginBottom: "2rem", marginLeft: "1rem", fontSize: "1.7rem" }}>Discography</h2>
            <div style={{ display: "flex", marginLeft:"5px" }}>

                <div className={`artist-nav-item ${selected ==="album" ? "artist-nav-item-active" : "" }`} onClick={()=>setSelected("album")}>
                    <p>Albums</p>
                </div>
                <div className={`artist-nav-item ${selected ==="single" ? "artist-nav-item-active" : "" }`} onClick={()=>setSelected("single")}>
                    <p>Singles and EPs</p>
                </div>
            </div>
            <div
                className="row-content"
                style={{ marginBottom: "5rem" }}
            >
                {albumElements}
            </div>
        </>
    )
}