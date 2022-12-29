import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import putWithToken from './utils/putWithToken';
import nextIcon from "../images/skip-forward-fill.png"
import prevIcon from "../images/skip-back-fill.png"
import emptyHeart from "../images/heart-line.png"
import fillHeart from "../images/heart-fill.png"
import { LikedSongsContext } from "../context/likedSongsContext"



function WebPlayback(props) {


    const [deviceId, setDeviceId] = useState("")


    const [player, setPlayer] = useState(null);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState({});

    const { likedSongs, unlikeItem } = useContext(LikedSongsContext)

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
                setTimeout(PlayThis(deviceId), 1000)
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

    console.log(current_track.artists)


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
                        <img src={prevIcon} className="btn-spotify-nav" onClick={() => { player.previousTrack() }} />
                        <div className='play-btn-container'>

                            {!is_paused ?
                                <button className="btn-spotify-resume" onClick={() => { player.togglePlay() }}> || </button>
                                :
                                <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                    &#9658;
                                </button>
                            }
                        </div>

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