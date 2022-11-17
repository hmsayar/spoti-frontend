import React from "react"
import { Link } from "react-router-dom"

import ArtistElement from "./ArtistElement"

export default function ArtistsRow ({ data }) {



      const artistElements = data.items.map(artist => {
        return(
            <ArtistElement key={artist.id} artist={artist} />
        )
      })
      

    
    return (
        <>
            <h1>Artists</h1>
            <div 
            className="row-content"
            >
                {artistElements}
            </div>

        </>
    )
}