import React, {useState} from "react"
const LoginContext = React.createContext()

function LoginContextProvider(props){
    const [login, setLogin] = useState(false)
    function handleLogin(bool){
        setLogin(bool)
    }
    return(
        <LoginContext.Provider value={{login, handleLogin}}>
            {props.children}
        </LoginContext.Provider>

    )
}

export {LoginContextProvider, LoginContext}