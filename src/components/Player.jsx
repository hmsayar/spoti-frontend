import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';
import axios from 'axios';
import putWithToken from './utils/putWithToken';

import nextIcon from "../images/skip-forward-fill.png"
import prevIcon from "../images/skip-back-fill.png"



function WebPlayback(props) {

    const {
        player,
        handlePlayer,
        is_paused,
        handleIsPaused,
        is_active,
        handleIsActive,
        current_track,
        handleCurrentTrack } = useContext(PlayerContext)

    const [deviceId, setDeviceId] = useState("")

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            handlePlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setTimeout(PlayThis(device_id), 1000)
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {

                if (!state) {
                    return;
                }

                handleCurrentTrack(state.track_window.current_track);
                handleIsPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? handleIsActive(false) : handleIsActive(true)
                });

            }));

            player.connect();

        };


        return () => {
            source.cancel();
            player.disconnect();
        };

    }, []);


    const source = axios.CancelToken.source()


    function PlayThis(device_id) {


        var body = {
            device_ids: [device_id]
        }

        const request = putWithToken("https://api.spotify.com/v1/me/player", props.token, source, body)
        request().then(response => {
            if (response.status === 204) {
                console.log("yess")
            }
        })

    }



    if (!is_active) {
        return (
            <>
                <div className="player-container">
                    <div className="main-wrapper">
                        <b> Instance not active.</b>
                    </div>
                    <div className='player-right'>
                        <button className='btn-activate' onClick={PlayThis} >
                            Activate
                        </button>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="player-container">

                    <div className='player-song-img-info'>

                        <img className="player-song-img" src={current_track.album.images[0].url} alt="" />

                        <div className='player-song-info'>

                            <div>{current_track.name}</div>
                            <div>{current_track.artists[0].name}</div>
                        </div>
                    </div>


                    <div className="control-buttons">
                        <img src={prevIcon} className="btn-spotify-nav" onClick={() => { player.previousTrack() }} />

                        {is_paused ? 
                        <button className="btn-spotify-resume" onClick={() => { player.togglePlay() }}> || </button> 
                        :

                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                &#9658;
                            </button>
                        }

                        <img src={nextIcon} className="btn-spotify-nav" onClick={() => { player.nextTrack() }} />

                    </div>

                    <div className='player-right'>
                        <h1>Hellooo</h1>
                    </div>

                </div>
            </>
        );
    }
}

export default WebPlayback