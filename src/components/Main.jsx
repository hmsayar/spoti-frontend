import {useState} from "react"
import Header from "./maincomponents/Header"
import MainContent from "./maincomponents/MainContent"

export default function Main(){

    const[query, setQuery] = useState("")

    function handleQuery(event){
        setQuery(event.target.value)
    }

    return(
        <div className="my-main">
            <Header query= {query} handleQ={handleQuery} />
            <MainContent query={query} />
        </div>

        
    )
}