import { useEffect, useState, useContext } from "react";
import axios from "axios";
import reqWithToken from "../../utils/reqWithToken";
import { TokenContext } from "../../../context/tokenContext";
import AlbumElement from "../searchpagecomponents/AlbumElement";
import EmptyCollectionPage from "./EmptyCollectionPage";


export default function CollectionAlbums(){

    const [albums, setAlbums] = useState({})
    const { token } = useContext(TokenContext)

    useEffect(() => {
        var cancelSource = axios.CancelToken.source()
        const makeRequests = async () => {
            const requestAlbums = reqWithToken('https://api.spotify.com/v1/me/albums', token, cancelSource)
            const _requestAlbums = await requestAlbums()
            setAlbums(_requestAlbums.data)

        }
        makeRequests()

    }, [])

    const albumElements = albums.items?.map((item) => {
        return (
            <AlbumElement key={item.id} data={item.album} />
        )
    })

    console.log(albums)


    if(albums.items?.length === 0){
        return(
            <EmptyCollectionPage type="album"/>
        )
    }else{

        return(
            <div className="main-content">
                <div className="row-content">
                    {albumElements}
                </div>
            </div>
        )
    }

}