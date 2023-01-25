import { useEffect, useState, useContext } from "react";
import axios from "axios";
import reqWithToken from "../../utils/reqWithToken";
import { TokenContext } from "../../../context/tokenContext";
import ArtistElement from "../searchpagecomponents/ArtistElement";
import EmptyCollectionPage from "./EmptyCollectionPage";

export default function CollectionArtists() {

    const [artists, setArtists] = useState([])
    const { token } = useContext(TokenContext)

    useEffect(() => {
        var cancelSource = axios.CancelToken.source()
        const makeRequests = async () => {
            const requestArtists = reqWithToken('https://api.spotify.com/v1/me/following?type=artist', token, cancelSource)
            const _requestArtists = await requestArtists()
            setArtists(_requestArtists.data.artists)

        }
        makeRequests()

    }, [])


    const artistElements = artists.items?.map((item) => {
        return (
            <ArtistElement key={item.id} artist={item} />
        )
    })

    if(artists.items?.length === 0){
        return(
            <EmptyCollectionPage type="artist" />
        )
    }else{

        return (
            <div className="main-content">
                <div style={{padding:"0.5em", display:"flex", flexWrap:"wrap"}}>
                    {artistElements}
                </div>
            </div>
        )
    }

}