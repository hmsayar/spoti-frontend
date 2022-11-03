import { useState, useEffect } from "react"
import RowContent from "./RowContent"
import axios from "axios"

export default function MainContent() {

    const [allData, setAllData] = useState([])
    const [allPlaylists, setAllPlaylists] = useState([])

    useEffect(() => {
        let source = axios.CancelToken.source()
        const locale = "SE"
        const language = "sv"
        let endpoint = `https://api.spotify.com/v1/browse/categories?limit=6&country=${locale}&locale=${language}_${locale}`
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
                setAllData(result.data.categories.items)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }

        }
        makeRequest()

    }, [])







    useEffect(() => {
        allData.map((item) => {
            let source = axios.CancelToken.source()
            const {name,id} = item
            const limit = 9
            const endpoint = `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}`

            const makeRequest = async () => {
                const cancelToken = source.token
                const config = {
                    method: 'POST',
                    url: "http://localhost:4000/",
                    data: {endpoint},
                    withCredentials: true,
                    cancelToken
                }
                try{
                    var result = await axios(config)
                    const playlists = result.data.playlists.items
                    setAllPlaylists(prev => {
                       return (prev.length === allData.length ? prev : [...prev ,{name, id, playlists}])
                    })
                }catch (error){
                    if (axios.isCancel(error)) return
                    return error
                }

            }
            makeRequest()
        })

    },[allData])
    console.log(allPlaylists)

    function displayCard(){
        const obj = allPlaylists[0]
        console.log(obj.name)
    }






    return (
        <div className="main-content">
            <RowContent />
            <RowContent />
            <button onClick={displayCard}>Click</button>


        </div>
    )
}