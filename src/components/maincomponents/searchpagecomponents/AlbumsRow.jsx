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
            <h1>Albums</h1>
            <div
                className="row-content"

            >
                {albumElements}
            </div>

        </>

    )
}