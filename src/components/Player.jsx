import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import putWithToken from './utils/putWithToken';



function WebPlayback(props) {


    const [deviceId, setDeviceId] = useState("")



    const [player, setPlayer] = useState(null);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState({});
    const [presentVolume, setPresentVolume] = useState()



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

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id)
                setTimeout(PlayThis(device_id), 1000)

            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);


                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });

            }));
            player.getVolume().then(volume => {
                let volume_percentage = volume * 100;
                setPresentVolume(volume_percentage)
            });
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
            if (response.status === 202) {
                console.log("yess")
            }else{
                console.log("err")
            }
        })
    }

    function changeVolume(e) {
        let target = e.target
        let volume = target.value / 100
        player.setVolume(volume).then(() => {
            setPresentVolume(target.value)
        })
    }

    function handleMute(){
        if(presentVolume>0){
            player.setVolume(0).then(() => {
                setPresentVolume(0)
            })
        }else if(presentVolume<1){
            player.setVolume(0.5).then(() => {
                setPresentVolume(50)
            })
        }
    }




    if (!is_active) {
        return (
            <>
                <div className="player-container">
                    <div className="main-wrapper">
                        <b> Instance not active.</b>
                    </div>
                    <div className='player-right'>
                        <button className='btn-activate' onClick={() => PlayThis(deviceId)} >
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
                            <Link className="track-link" to={`/track/${current_track.id}`}>
                                <div>{current_track.name}</div>
                            </Link>

                            {current_track.artists.map((artist, i, arr) => {
                                return (

                                    <Link key={artist.id} className="artist-link" to={`/artist/${artist.id}`}>
                                        {i + 1 === arr.length ? artist.name : artist.name + ", "}
                                    </Link>
                                )
                            })}

                        </div>
                    </div>

                    <div className="control-buttons">
                        <img className="btn-spotify-nav btn-spotify-nav-back" onClick={() => { player.previousTrack() }} />
                        <div className='play-btn-container'>

                            {!is_paused ?
                                <button className="btn-spotify-resume" onClick={() => { player.togglePlay() }}> || </button>
                                :
                                <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                    &#9658;
                                </button>
                            }
                        </div>

                        <img className="btn-spotify-nav btn-spotify-nav-forward" onClick={() => { player.nextTrack() }} />
                    </div>


                    <div className='player-right'>

                        {
                            presentVolume < 1 ?
                                <svg onClick={handleMute} className='a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path className='volume-icon' d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z" fill="rgba(120,120,120,1)" />
                                </svg> :
                                presentVolume>0 && presentVolume < 51 ?
                                    <svg onClick={handleMute} className='a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path className='volume-icon' d="M13 7.22L9.603 10H6v4h3.603L13 16.78V7.22zM8.889 16H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L8.89 16zm9.974.591l-1.422-1.422A3.993 3.993 0 0 0 19 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 21 12c0 1.842-.83 3.49-2.137 4.591z" fill="rgba(120,120,120,1)" />
                                    </svg> :
                                    presentVolume > 50 ?
                                        <svg onClick={handleMute} className='a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path className='volume-icon' d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z" fill="rgba(120,120,120,1)" />
                                        </svg> :
                                        null
                        }

                        <input
                            type="range"
                            min="0"
                            max="100"
                            onInput={(e) => changeVolume(e)}
                            style={{ backgroundSize: `${presentVolume}% 100%` }}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback