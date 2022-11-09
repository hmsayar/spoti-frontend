import { useState, useEffect } from "react"
import RowContent from "./RowContent"
import axios from "axios"
import getLocale from "../utils/locale"

export default function Home() {

    const [allData, setAllData] = useState([])

    useEffect(() => {
        let source = axios.CancelToken.source()
        const [language, locale] = getLocale()
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

    const rowElements = allData.map(item => {
        return (

            <div key={item.id}>
                <h1 className="row-title">{item.name}</h1>
                <RowContent data={item} />
            </div>
        )
    })



    return (
        <div className="main-content">
            {rowElements}
        </div>
    )
}