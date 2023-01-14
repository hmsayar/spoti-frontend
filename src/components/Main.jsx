import { useState, useEffect } from "react"
import Header from "./maincomponents/Header"
import MainContent from "./maincomponents/MainContent"

export default function Main({userInf}) {

    const [query, setQuery] = useState("")
    const [playlistUriHeader, setPlaylistUriHeader] = useState("")


    function handlePlaylistUriHeader(id){
        setPlaylistUriHeader(id)
    }

    function handleQuery(event) {
        setQuery(event.target.value)
    }

    function resetQuery() {
        setQuery("")
    }






    return (

            <div className="my-main">
                
                <Header query={query} handleQ={handleQuery} resetQ={resetQuery} userInf={userInf} playlistUri={playlistUriHeader} />
                <MainContent
                    query={query}
                    playlistUriHeader={handlePlaylistUriHeader}
                />

        </div>


    )
}