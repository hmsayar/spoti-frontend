import React from "react"
import ArtistElement from "./ArtistElement"

export default function ArtistsRow ({ data }) {



      const artistElements = data.items.map(artist => {
        return(
            <ArtistElement key={artist.id} artist={artist} />
        )
      })
      

    
    return (
        <>
            <h1 className="tracks-search-title" style={{marginBottom:"2rem", marginLeft:"1.5rem"}} >Artists</h1>
            <div 
            className="row-content" style={{marginBottom:"5rem"}}
            >
                {artistElements}
            </div>

        </>
    )
}