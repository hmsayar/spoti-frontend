import { useState, useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import RowItem from "./RowItem"

export default function RowContent({ data }) {

    const [row, setRow] = useState([])

    useEffect(() => {
        let source = axios.CancelToken.source()
        const { name, id } = data
        const limit = 9
        const endpoint = `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}`
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
                const playlists = result.data.playlists.items
                setRow(playlists)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()

    }, [])

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };

    const rowItems = row.map(item => {
        return (
            <Link key={item.id} to="/" style={linkStyle}>
                <RowItem key={item.id} data={item} />
            </Link>
        )
    })

    return (
        <div className="row-content">
            {rowItems}

        </div>
    )
}