import { useEffect, useState } from "react";
import axios from "axios"
import duratioLogo from "../../images/time-line.png"

export default function ArtistToptems({id}){
    const[topItems, setTopItems] = useState({})
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/artists/${id}/top-tracks/`
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
                const artistTopItems = result.data
                setTopItems(artistTopItems)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])

    return(
        <div className="album-tracks-title" >
            <div className="tracks-title-title">
            <h3 style={{color:"#a9a9aa"}} className="title-first">#</h3>
            <h3 style={{color:"#a9a9aa"}}>Title</h3>
        </div>
        <img src={duratioLogo} />
    </div>
    )
}