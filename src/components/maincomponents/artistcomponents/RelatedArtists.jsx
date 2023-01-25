import { useState, useEffect } from "react";
import axios from "axios";
import ArtistElement from "../searchpagecomponents/ArtistElement";

export default function RelatedArtists({id}){

    const[related, setRelated] = useState({})
    const[loading, setLoading] = useState(true)


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/artists/${id}/related-artists`
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
                const relatedArtist = result.data
                setRelated(relatedArtist)
                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])

    
    const artistElements = related.artists?.map(artist => {
        return(
            <ArtistElement key={artist.id} artist={artist} />
        )
      })

    return(
        <>
        <h2 style={{ marginBottom: "2rem", marginLeft: "1rem", fontSize: "1.7rem" }}>Fans also like</h2>
        <div
                className="row-content"
                style={{ marginBottom: "5rem" }}
            >
                {artistElements}
            </div>
        </>
    )

}