import { useState, useEffect, useContext } from "react"
import RowContent from "./RowContent"
import axios from "axios"
import getLocale from "../utils/locale"
import UserTopItems from "./UserTopItems"
import { LoginContext } from "../../context/loginContext"
import useResize from "../../hooks/useResize"



export default function Home() {

    const [allData, setAllData] = useState([])
    const { login } = useContext(LoginContext)
    const [isLoading, setIsLoading] = useState(true)
    const [columnCount, setColumnCount] = useState(getColumnCount(window.innerWidth))
    const [screenWidth] = useResize()

    useEffect(() => {
        let source = axios.CancelToken.source()
        const [language, locale] = getLocale()
        let endpoint = `https://api.spotify.com/v1/browse/categories?limit=6&country=${locale}&locale=${language}_${locale}`
        const makeRequest = async () => {
            const cancelToken = source.token
            const config = {
                method: 'POST',
                url: `${import.meta.env.VITE_APP_BACK_URI}`,
                data: { endpoint },
                withCredentials: true,
                cancelToken
            }
            try {
                var result = await axios(config)
                setAllData(result.data.categories.items)
                 setIsLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
                return error
            }

        }
        makeRequest()

    }, [])

    useEffect(() => {
        setColumnCount(getColumnCount(screenWidth));
      }, [screenWidth]);
    

    const rowElements = allData.map(item => {
        return (

            <div key={item.id}>
                <h1 className="row-title">{item.name}</h1>
                <RowContent data={item} columnCount={columnCount} />
            </div>
        )
    })


    return (
        <div className="main-content">
            

                    <div className="home-main-content" >
                        {/* <LoadingImg style={{ height: "180px", width: "180px", backgroundColor: "rgba(94,94,94,1)", borderRadius: "10px" }}  /> */}
                        <>
                            {login ?
                                <UserTopItems /> :
                                null
                            }


                            {rowElements}

                        </>
                    </div>
            

        </div>
    )
}


function getColumnCount(width){
    if (width <= 950) {
        return 2;
      } else if (width <= 1120) {
        return 3;
      } else if (width <=1300) {
        return 4;
      } else if (width <=1540) {
        return 5;
      } else if(width <= 1750) {
        return 6;
      }else if(width <= 1950) {
        return 7;
      }else{
        return 8;
      }
}