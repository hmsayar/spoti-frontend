import React, {useState} from "react"
const PlayerContext = React.createContext()

function PlayerContextProvider(props){
    const [player, setPlayer] = useState(null);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState({});



    function handlePlayer(_player){
        setPlayer(_player)
    }

    function handleIsPaused(){
        setPaused(prev => !prev)
    }

    function handleIsActive(bool){
        setActive(bool)
    }

    function handleCurrentTrack(track){
        setTrack(track)
    }


    return(
        <PlayerContext.Provider value={{
            player, 
            handlePlayer, 
            is_paused, 
            handleIsPaused, 
            is_active, 
            handleIsActive, 
            current_track, 
            handleCurrentTrack}}>
            {props.children}
        </PlayerContext.Provider>

    )
}

export {PlayerContextProvider, PlayerContext}