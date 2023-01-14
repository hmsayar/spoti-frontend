import React from "react"
import AlbumElement from "./AlbumElement"


export default function AlbumsRow({ data }) {

    const albumElements = data.items.map(album => {
        return(
            <AlbumElement key={album.id} data={album} /> 
        )
    })


    return (

        <>
            <h1 style={{marginBottom:"2rem", marginLeft:"1.5rem"}}>Albums</h1>
            <div
                className="row-content"
                style={{marginBottom:"5rem"}}
            >
                {albumElements}
            </div>

        </>

    )
}