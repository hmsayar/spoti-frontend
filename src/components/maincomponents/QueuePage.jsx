import { useContext, useState, useEffect } from "react"
import axios from "axios"
import reqWithToken from "../utils/reqWithToken"
import { TokenContext } from "../../context/tokenContext"
import AlbumItem from "./AlbumItem"




export default function QueuePage() {
    const { token } = useContext(TokenContext)
    const [queue, setQueue] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const cancelSource = axios.CancelToken.source()
        const makeRequests = async () => {
            const requestQueue = reqWithToken(`https://api.spotify.com/v1/me/player/queue`, token, cancelSource)
            const _queue = await requestQueue()
            setQueue(_queue.data)
            setLoading(false)
        }
        makeRequests()
    }, [])

    
    const queueElements = queue.queue?.map((item, i) => {
        return (
            <AlbumItem key={item.id} data={item} index={i} listUri=""/>
        )
    })

    if(loading){
        return(<></>)
    }else{
        return (
            <div className="main-content">
                <h1 style={{marginBottom:"20px"}} >Queue</h1>
                <AlbumItem key={queue.currently_playing.id} data={queue.currently_playing} index={0} listUri="" />
                <h3 style={{marginBottom:"20px", marginTop:"20px", color:"#757575"}} >Next from</h3>
                {queueElements}
            </div>
        )

    }

}