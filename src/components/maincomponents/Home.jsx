import { useState, useEffect, useContext } from "react"
import RowContent from "./RowContent"
import axios from "axios"
import getLocale from "../utils/locale"
import UserTopItems from "./UserTopItems"
import { LoginContext } from "../../context/loginContext"



export default function Home() {

    const [allData, setAllData] = useState([])
    const { login } = useContext(LoginContext)
    const [isLoading, setIsLoading] = useState(true)


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

    const rowElements = allData.map(item => {
        return (

            <div key={item.id}>
                <h1 className="row-title">{item.name}</h1>
                <RowContent data={item} />
            </div>
        )
    })



    return (
        <div className="main-content">
            

                    <div className="home-main-content">

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