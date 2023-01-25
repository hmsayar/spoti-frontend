import React from "react"
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration:"none",
    backgroundColor:"white",
    color:"black",
    padding:"1rem",
    borderRadius:"40px",
}

export default function EmptyCollectionPage({ type }) {
    return (
        <div className="empty-collection">
            <div className="empty-content">
                {
                    type === "album" ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="rgba(255,255,255,1)" />
                        </svg> :
                        type === "artist" ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" fill="rgba(255,255,255,1)" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm0-2a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5zM3.055 11H5.07a7.002 7.002 0 0 0 13.858 0h2.016A9.004 9.004 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11z" fill="rgba(255,255,255,1)" />
                            </svg>
                }

                <h1>{`Follow your first ${type}`}</h1>
                {
                    type==="album" ?
                    <h4>Save albums by tapping the heart icon.</h4> :
                    <h4>{`Follow ${type}s you like by tapping the follow button`}</h4>
                }

                <Link to="/search" style={linkStyle} >
                    <h3 style={{fontSize:"bolder"}}>
                    {`Find ${type}s`}
                    </h3>
                </Link>

            </div>
        </div>

    )
}