import {useEffect} from "react"


export default function SearchBar(...props){

    useEffect(() => {
        return () => props[0].resetQ()
    }, [])




    return(
        <input 
        type="text"
        placeholder="What do you want to listen to?" 
        className="search-style"
        value={props[0].query}
        onChange={props[0].handleQ}
        name="query" />
    )
}