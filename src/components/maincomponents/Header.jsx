import { useContext, useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import SearchBar from "./SearchBar"
import { LoginContext } from "../../context/loginContext"
import UserInfoButton from "./UserInfoButton"
import PlayButton from "./PlayButton"
import CollectionHeader from "./CollectionHeader"




export default function Header(props) {

    const { login } = useContext(LoginContext)
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        


        function handleScroll() {
            if (window.scrollY > 20) {
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
                         <Route path="/collection/playlists" element={<CollectionHeader type="playlists" />} />
                         <Route path="/collection/podcasts" element={<CollectionHeader type="podcasts" />} />
                         <Route path="/collection/artists" element={<CollectionHeader type="artists" />} />
                         <Route path="/collection/albums" element={<CollectionHeader type="albums" />} />

                    </Routes>
                </div>



                <div className="btn-container">

                    {login ?
                        <UserInfoButton userInf={props.userInf} /> :
                        <>
                            <a href="/" className="btn-sign-up"><b>Sign Up</b></a>
                            <a href={`${import.meta.env.VITE_APP_BACK_URI}/login`} className="btn-log-in"><b>Log In</b></a>
                        </>
                    }


                </div>

        </div>
    )
}