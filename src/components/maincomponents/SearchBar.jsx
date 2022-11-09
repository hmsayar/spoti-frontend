import React from "react"

export default function SearchBar(...props){
    return(
        <input 
        type="text" 
        className="search-style"
        value={props[0].query}
        onChange={props[0].handleQ}
        name="query" />
    )
}