import { useState, useEffect } from "react"
import axios from "axios"
import RowItem from "./RowItem"

export default function RowContent({ data }) {

    const [row, setRow] = useState([])


    useEffect(() => {
        let source = axios.CancelToken.source()
        const { id } = data
        const limit = 9
        const endpoint = `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: `${import.meta.env.VITE_APP_BACK_URI}/logout`,
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                const playlists = result.data.playlists.items
                setRow(playlists)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])

    const rowItems = row.map(item => {
        return (
                <RowItem key={item.id} data={item} />
        )
    })

    return (
        <div className="row-content">
            
            {rowItems}

        </div>
    )
}