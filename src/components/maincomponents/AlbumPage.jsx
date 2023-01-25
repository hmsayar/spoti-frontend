import { useState, useEffect, useContext, useLayoutEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import AlbumItem from "./AlbumItem"
import PlayButton from "./PlayButton"
import duratioLogo from "../../images/time-line.png"
import heartLine from "../../images/heart-line-playlist.png"
import heartFill from "../../images/heart-fill-playlist.png"
import { LoginContext } from "../../context/loginContext"
import { TokenContext } from "../../context/tokenContext"
import putWithToken from "../utils/putWithToken"
import deleteWithToken from "../utils/deleteWithToken"
import reqWithToken from "../utils/reqWithToken"
import getDuration from "../utils/duration"

export default function AlbumPage() {
    const {login} = useContext(LoginContext)
    const {token} = useContext(TokenContext)

    const [albumData, setAlbumData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState()
    const { albumId } = useParams()


    useEffect(() => {
        let source = axios.CancelToken.source()
        const endpoint = `https://api.spotify.com/v1/albums/${albumId}`
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
                const album = result.data
                setAlbumData(album)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }
        }
        makeRequest()
    }, [])

    useEffect(()=>{

        if(Object.entries(albumData).length !== 0 ){
            var cancelSource = axios.CancelToken.source()
            const checkIsliked = async () => {
                const requestIsLiked = reqWithToken(`https://api.spotify.com/v1/me/albums/contains?ids=${albumData.id}`, token, cancelSource)
                const _requestIsLiked = await requestIsLiked()
                setIsLiked(_requestIsLiked.data[0])
                setLoading(false)
            }
            checkIsliked()
        }

    },[albumData])


    function likeAlbum(){

        const source = axios.CancelToken.source()
        let body
        if (login) {
            if (!isLiked) {
                body = {
                    ids:[albumData.id]
                }
                const request = putWithToken(`https://api.spotify.com/v1/me/albums?ids=${albumData.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        setIsLiked(true)
                    }
                })
            } else if (isLiked) {
                body = {}
                const request = deleteWithToken(`https://api.spotify.com/v1/me/albums?ids=${albumData.id}`, token, source, body)
                request().then(response => {
                    if (response.status === 200) {
                        setIsLiked(false)
                    }
                })
            }
        }
    }

    const albumElements = albumData.tracks?.items.map((item, i) => {
        return (
            <AlbumItem key={item.id} data={item} index={i} listUri={albumData.uri} />
        )
    })




    return (
        <div className="playlist-content">
            {loading ?
                null :
                <>
                    <div className="playlist-cover">
                        <img src={albumData.images[1].url} height={256} width={256} />
                        <div className="cover-texts">
                            <h4 className="cover-type">{albumData.album_type.toUpperCase()}</h4>
                            <h1 className="cover-title">{albumData.name}</h1>
                            <div className="cover-flex">
                                <Link className="cover-owner" to="/">{albumData.artists[0].name}</Link>
                                <h4 
                                className="cover-info">
                                     · {albumData.release_date} · 
                                     
                                     </h4>
                            </div>
                        </div>
                    </div>
                    <div className="track-list">
                        <div className="track-actions">
                            <PlayButton type="playlist" item={albumData.uri} />
                            <img 
                            className="track-actions-img" 
                            src={isLiked ? heartFill : heartLine} 
                            onClick={likeAlbum}/>
   
                        </div>
                        <div className="album-tracks-title" >
                            <div className="tracks-title-title">
                                <h3 style={{color:"#a9a9aa"}} className="title-first">#</h3>
                                <h3 style={{color:"#a9a9aa"}}>Title</h3>
                            </div>
                            <img src={duratioLogo} />
                        </div>
                        {albumElements}
                    </div>
                </>
            }

        </div>
    )
}