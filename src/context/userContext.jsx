import React, {useState} from "react"
const UserContext = React.createContext()

function UserContextProvider(props){
    const [user, setUser] = useState({})
    function handleUser(userInfo){
        setUser(userInfo)
    }
    return(
        <UserContext.Provider value={{user, handleUser}}>
            {props.children}
        </UserContext.Provider>

    )
}

export {UserContextProvider, UserContext}