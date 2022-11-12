import {useState, useEffect} from "react"
import Header from "./maincomponents/Header"
import MainContent from "./maincomponents/MainContent"
import { useNavigate, useParams } from "react-router-dom"

export default function Main(){

    const[query, setQuery] = useState("")
    
    const navigate = useNavigate();
    const goToSearch = (e) =>
    navigate({
        pathname: "/search",
        goto: e.target.value
    })

    function handleQuery(event){
        setQuery(event.target.value)
    }

    function resetQuery(){
        setQuery("")
    }

    useEffect(()=> {
        if(query){
        const goToSearch = () =>
        navigate({
            pathname: "/search/",
            search: query
        })

        goToSearch()
    }

    },[query]) 



    return(
        <div className="my-main">
            <Header query= {query} handleQ={handleQuery} resetQ={resetQuery}/>
            <MainContent query={query} />
        </div>

        
    )
}