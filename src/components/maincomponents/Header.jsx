import { useContext, useState, useEffect } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import SearchBar from "./SearchBar"
import { LoginContext } from "../../context/loginContext"
import UserInfoButton from "./UserInfoButton"
import PlayButton from "./PlayButton"




export default function Header(props) {

    const { login } = useContext(LoginContext)
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        


        function handleScroll() {
            if (window.scrollY > 5) {
                setIsScrolledDown(true);
            } else {
                setIsScrolledDown(false);
            }
        }



        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])




    return (
        <div className="header">




                <div className="search-bar">

                    {/* todo navigation arrow */}


                    <Routes>
                        <Route path="/search" element={<SearchBar {...props} />} />
                        {
                            isScrolledDown ?
                                <Route path="/playlist/:playlistId" element={<PlayButton type="playlist" item={props.playlistUri} />} /> :
                                null
                        }

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