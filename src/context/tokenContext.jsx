import React, {useState} from "react"
const TokenContext = React.createContext()

function TokenContextProvider(props){
    const [token, setToken] = useState(null)
    function handleToken(accessToken){
        setToken(accessToken)
    }
    return(
        <TokenContext.Provider value={{token, handleToken}}>
            {props.children}
        </TokenContext.Provider>

    )
}

export {TokenContextProvider, TokenContext}