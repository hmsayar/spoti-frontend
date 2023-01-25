import { useEffect, useState } from "react"
import axios from "axios"
import ArtistsRow from "./searchpagecomponents/ArtistsRow"
import AlbumsRow from "./searchpagecomponents/AlbumsRow"
import TracksRow from "./searchpagecomponents/TracksRow"


export default function SearchPage({ q }) {

    const [searchData, setSearchData] = useState({})
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        if (q) {
            let source = axios.CancelToken.source()
            let endpoint = `https://api.spotify.com/v1/search?q=${q}&type=album,track,artist,playlist,show&limit=9`
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
                    setSearchData(result.data)
                    setLoading(false)
                } catch (error) {
                    if (axios.isCancel(error)) return
                    return error
                }

            }
            makeRequest()
        }
    }, [q])

    console.log(searchData)



    return (
        <div className="search-page">
            {loading ?
                null :
                <>
                    <TracksRow data={searchData.tracks.items} />
                    <ArtistsRow data={searchData.artists} />
                    <AlbumsRow data={searchData.albums} />
                </>
            }
        </div>
    )
}