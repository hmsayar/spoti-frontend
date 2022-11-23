import React, {useState} from "react"
const LikedSongsContext = React.createContext()


function LikedSongsContextProvider(props){
    const [likedSongs, setLikedSongs] = useState([])

    function handleLikedSongs(liked){
        setLikedSongs(prev => liked)
    }

    function likeItem(track){
        const date = new Date()
        setLikedSongs(prev=> [{
            added_at:date.toJSON(),
            track:track
        }, ...prev])
    }

    function unlikeItem(track){
        setLikedSongs(prev => prev.filter(item => item.track.id !== track.id))
    }



    return(
        <LikedSongsContext.Provider value={{likedSongs, handleLikedSongs, likeItem, unlikeItem}}>
            {props.children}
        </LikedSongsContext.Provider>

    )
}

export {LikedSongsContextProvider, LikedSongsContext}