import {useEffect} from "react"


export default function SearchBar(...props){

    useEffect(() => {
        return () => props[0].resetQ()
        // eslint-disable-next-line
    }, [])

    console.log(props)



    return(
        <input 
        type="text" 
        className="search-style"
        value={props[0].query}
        onChange={props[0].handleQ}
        name="query" />
    )
}