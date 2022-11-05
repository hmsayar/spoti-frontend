import { useEffect, useState } from "react"
import axios from "axios"
import getRandomColor from "../utils/getRandomColor"

export default function SearchPage() {

    const [genres, setGenres] = useState([])
    const [displayGenres, setDisplayGenres] = useState([])

    useEffect(() => {
        let source = axios.CancelToken.source()
        const locale = "SE"
        const language = "sv"
        let endpoint = `https://api.spotify.com/v1/recommendations/available-genre-seeds`
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
                setGenres(result.data.genres)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }

        }
        makeRequest()


    }, [])

    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            let rand = Math.floor(Math.random() * genres.length)
            if (genres[rand]) {
                setDisplayGenres(prev => ([...prev, genres[rand]]))
                setDisplayGenres(prev => [...new Set(prev)])
            }
        }
    }, [genres])

    const myGenres = displayGenres.map((name,index) => (<div 
        key={name}
        className="search-genres" 
        style={{
            "color":"white",
            "backgroundColor":`#${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`}}>
            {name}
        </div>))


    return (
        <div className="search-page">
            {myGenres}

        </div>
    )
}