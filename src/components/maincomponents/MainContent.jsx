import {useState, useEffect} from "react"
import RowContent from "./RowContent"
import axios from "axios"

export default function MainContent(){

    const [data, setData] = useState({})

    useEffect(()=> {

        let source = axios.CancelToken.source()
        const locale = "SE"
        const language = "sv"
        let endpoint = `https://api.spotify.com/v1/browse/categories?limit=6&country=${locale}&locale=${language}_${locale}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: "http://localhost:4000/",
                data: {endpoint},
                withCredentials: true,
                cancelToken
            }
            try{
                var result = await axios(config)
                console.log(result)
            }catch (error){
                if (axios.isCancel(error)) return
                return error
            }
            
            setData(result.data)
        }
        makeRequest()

    },[])

    console.log(data)




    return (
        <div className="main-content">
            <RowContent />
            <RowContent />


        </div>
    )
}