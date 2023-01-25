import { useEffect, useState, useContext } from "react";
import axios from "axios";
import reqWithToken from "../../utils/reqWithToken";
import { TokenContext } from "../../../context/tokenContext";
import EmptyCollectionPage from "./EmptyCollectionPage";


export default function CollectionPodcasts(){

    const [podcasts, setPodcasts] = useState([])
    const { token } = useContext(TokenContext)


    if(true){
        return(
            <EmptyCollectionPage type="podcast" />

        )
    }else{
        return(
            <div className="main-content">
                <div style={{padding:"0.5em", display:"flex", flexWrap:"wrap"}}>
                    <h1>hello</h1>
                </div>
            </div>
        )
    }
}