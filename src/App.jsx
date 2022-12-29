import { useState, useEffect, useContext } from 'react'
import getHashParams from './components/utils/getHashParams'
import { LoginContext } from './context/loginContext'
import { TokenContext } from './context/tokenContext'
import { UserContext } from './context/userContext'
import { LikedSongsContext } from './context/likedSongsContext'
import { PlaylistContext } from './context/playlistContext'
import Axios from "axios"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import Player from "./components/Player"
import CustomContextMenu from './components/maincomponents/CustomContextMenu'


import reqWithToken from './components/utils/reqWithToken'


function App() {

  const { login, handleLogin } = useContext(LoginContext)
  const { token, handleToken } = useContext(TokenContext)
  const { user, handleUser } = useContext(UserContext)
  const { likedSongs, handleLikedSongs } = useContext(LikedSongsContext)
  const { myPlaylists, handleMyPlaylists } = useContext(PlaylistContext)


  const [isVisible, setVisible] = useState(false)

  const [playerData, setPlayerData] = useState({})


  useEffect(() => {
    let params = getHashParams();
    const { access_token, error } = params
    var cancelSource = Axios.CancelToken.source()

    if (access_token) {
      handleToken(access_token)
      handleLogin(true)
      window.location.hash = ''

      const makeRequests = async () => {
        const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource)
        const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource)
        const requestPlayerInfo = reqWithToken('https://api.spotify.com/v1/me/player', access_token, cancelSource)
        const requestLikedSongs = reqWithToken(`https://api.spotify.com/v1/me/tracks?offset=0&limit=50`, access_token, cancelSource)

        const [_userInfo, _playlists, _likedSongs, _playerData] = await Promise.all([
          requestUserInfo(),
          requestPlayList(),
          requestLikedSongs(),
          requestPlayerInfo()
        ])
        handleUser(_userInfo.data)
        handleMyPlaylists(_playlists.data.items)
        handleLikedSongs(_likedSongs.data.items)
        setPlayerData(_playerData.data)

      }

      makeRequests()
    }


  }, [])

  function handleVisible() {
    setVisible(prev => !prev)
  }

  


   function handleContextMenu(e) {
     e.preventDefault()
   }

  return (
    <div className="App" onContextMenu={handleContextMenu}>

      <Sidebar />
      <div id="id-locker">
        
      <Main userInf={handleVisible} />
      </div>
      {isVisible && <div className="user-info-visible">
        <ul>
          <li>
            <button className='user-info-button'>Profile</button>
          </li>
          <li>
            <button className='user-info-button'>Log Out</button>
          </li>
        </ul>
      </div>}


      {login && <Player token={token} />}


    </div>
  )
}

export default App
