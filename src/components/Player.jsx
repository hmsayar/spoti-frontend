import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom"
import axios from 'axios';
import putWithToken from './utils/putWithToken';
import getDuration from './utils/duration';
import idFromUri from "./utils/idFromUri"



function WebPlayback(props) {
    const [deviceId, setDeviceId] = useState("")
    const [player, setPlayer] = useState(null);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState({});
    const [presentVolume, setPresentVolume] = useState()
    const [presentSongPosition, setPresentSongPosition] = useState()
    const [trackPosition, setTrackPosition] = useState()
    const location = useLocation()



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
                setTrackPosition(state.position)
                setPaused(state.paused);
                setPresentSongPosition(Math.floor((state.position / state.duration) * 100))


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
            } else {
                console.log("err")
            }
        })
    }

    function changeVolume(e) {
        let target = e.target
        let volume = target.value / 100
        player.setVolume(volume).then(() => {
            setPresentVolume(volume * 100)
        })
    }

    function handleMute() {
        if (presentVolume > 0) {
            player.setVolume(0).then(() => {
                setPresentVolume(0)
            })
        } else if (presentVolume < 1) {
            player.setVolume(0.5).then(() => {
                setPresentVolume(50)
            })
        }
    }


    function changePosition(e) {
        let target = e.target
        let position = target.value
        player.seek((current_track.duration_ms / 100) * position).then(() => {
            setPresentSongPosition(e.target.value);
        });

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
                        <img className="player-song-img" src={current_track?.album?.images[0].url} alt="" />

                        <div className='player-song-info'>
                            <Link className="track-link" to={`/track/${current_track.id}`}>
                                <div>{current_track.name}</div>
                            </Link>

                            {current_track.artists.map((artist, i, arr) => {
                                return (

                                    <Link key={artist.uri} className="artist-link" to={`/artist/${idFromUri(artist.uri)}`}>
                                        {i + 1 === arr.length ? artist.name : artist.name + ", "}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className='player-middle'>
                        <div className="control-buttons">

                            <svg className="btn-spotify-nav" onClick={() => { player.previousTrack() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path className='player-nav' d="M8 11.333l10.223-6.815a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L8 12.667V19a1 1 0 0 1-2 0V5a1 1 0 1 1 2 0v6.333z" fill="rgba(186,186,186,1)" />
                            </svg>


                            <div className='play-btn-container'>
                                <a href="https://github.com/hmsayar" className="footer-links-dot">.</a>
                                {!is_paused ?
                                    <svg className='toggle-resume' onClick={() => { player.togglePlay() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9 9v6h2V9H9zm4 0v6h2V9h-2z" fill="rgba(255,255,255,1)" />
                                    </svg>
                                    :
                                    <svg className="toggle-pause" onClick={() => { player.togglePlay() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z" fill="rgba(255,255,255,1)" />
                                    </svg>
                                }
                            </div>
                            <svg className="btn-spotify-nav" onClick={() => { player.nextTrack() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path className='player-nav' d="M16 12.667L5.777 19.482A.5.5 0 0 1 5 19.066V4.934a.5.5 0 0 1 .777-.416L16 11.333V5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0v-6.333z" fill="rgba(186,186,186,1)" />
                            </svg>
                        </div>
                        <div className='progress-bar-container'>
                            <div className='player-duration'>{getDuration(trackPosition).forTrack}</div>
                            <div className='progress-bar'>
                                <input
                                    id="song-input-bar"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={presentSongPosition}
                                    onInput={(e) => changePosition(e)}
                                    style={{ backgroundSize: `${presentSongPosition}% 100%` }}
                                />
                            </div>
                            <div className='player-duration'>{getDuration(current_track.duration_ms).forTrack}</div>
                        </div>
                    </div>



                    <div className='player-right'>


                        <Link to="/queue">

                            <svg className={location.pathname === "/queue" ? "" : "queue-icon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path className='queue-icon-color' d="M17 4V2.068a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H2V4h15zM2 18h20v2H2v-2zm0-7h20v2H2v-2z" fill={location.pathname === "/queue" ? "rgb(29,185,84)" : "rgba(120,120,120,1)"} />
                            </svg>

                        </Link>


                        {
                            presentVolume < 1 ?
                                <svg onClick={handleMute} className='a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path className='volume-icon' d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z" fill="rgba(120,120,120,1)" />
                                </svg> :
                                presentVolume > 0 && presentVolume < 51 ?
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
                            value={presentVolume}
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