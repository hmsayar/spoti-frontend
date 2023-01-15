import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Artist(){

    const { artistId } = useParams()
    const [artistData, setArtistData] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/artists/${artistId}`
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
                const artist = result.data
                setArtistData(artist)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])



    return(
        <div className="playlist-content">
            {loading ?
                null :
                <>
                <div className="playlist-cover">
                    <img  src={artistData.images[1].url} />
                    <div className="cover-texts">
                        <h4 className="cover-type">{artistData.type.toUpperCase()}</h4>
                        <h1 className="cover-title">{artistData.name}</h1>
                        <div className="cover-flex">
                            <h4 className="cover-info">{artistData.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
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