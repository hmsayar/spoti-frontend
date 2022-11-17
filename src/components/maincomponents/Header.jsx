import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import SearchBar from "./SearchBar"
import { LoginContext } from "../../context/loginContext"
import UserInfoButton from "./UserInfoButton"




export default function Header(props) {

    const { login } = useContext(LoginContext)


    return (
        <div className="header">

            <div className="search-bar">

                {/* todo navigation arrow */}


                <Routes>
                    <Route path="/search" element={<SearchBar {...props} />} />
                </Routes>
            </div>



            <div className="btn-container">

                {login ?
                  <UserInfoButton userInf={props.userInf} /> :
                    <>
                        <a href="/" className="btn-sign-up"><b>Sign Up</b></a>
                        <a href="http://localhost:4000/login" className="btn-log-in"><b>Log In</b></a>
                    </>
                }


            </div>


        </div>
    )
}