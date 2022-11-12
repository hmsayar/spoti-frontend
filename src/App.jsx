import { useState, useEffect, useContext } from 'react'
import getHashParams from './components/utils/getHashParams'
import { LoginContext } from './context/loginContext'
import { TokenContext } from './context/tokenContext'
import { UserContext } from './context/userContext'
import Axios from "axios"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

import reqWithToken from './components/utils/reqWithToken'

function App() {

  const {login,handleLogin} = useContext(LoginContext)
  const {token, handleToken} = useContext(TokenContext)
  const {user, handleUser} = useContext(UserContext)

  const [playlists,setPlaylists] =useState([])


  useEffect(()=> {
    let params = getHashParams();
    const {access_token, error} = params

    var cancelSource = Axios.CancelToken.source()

    if (access_token) {
      handleToken(access_token)
      handleLogin(true)
      window.location.hash = ''

      const makeRequests = async () => {
        const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource) 
        const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource)
        const [_userInfo, _playlists] = await Promise.all([requestUserInfo(), requestPlayList()])
        handleUser(_userInfo.data)
        setPlaylists(_playlists.data.items)

      }

      makeRequests()
    }


  },[])


  return (
    <div className="App">

        <Sidebar playlists= {playlists} />
        <Main />
        

        
    </div>
  )
}

export default App
