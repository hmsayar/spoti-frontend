import { useEffect, useState, useContext } from "react"
import { TokenContext } from "../../context/tokenContext"
import reqWithToken from "../utils/reqWithToken"
import axios from "axios"
import UserTop from "./UserTop"
import getTime from "../utils/getTime"


export default function UserTopItems() {

    const [userItems, setUserItems] = useState([])
    const { token } = useContext(TokenContext)

    useEffect(() => {

        const requestTopItems = async () => {
            const cancelSource = axios.CancelToken.source()
            const requestItems = reqWithToken(`https://api.spotify.com/v1/me/top/artists?limit=6`, token, cancelSource)
            const topItems = await requestItems()
            setUserItems(topItems.data.items)
        }

        requestTopItems()

    }, [])

    const topItems = userItems.map(item => {
        return (
            <UserTop key={item.id} data={item} />
        )
    })

    return (
        <>
            <h1 style={{ marginBottom: "2rem" }}>{getTime()}</h1>

            <div className="top-items-container">
                {topItems}
            </div>
        </>

    )
}