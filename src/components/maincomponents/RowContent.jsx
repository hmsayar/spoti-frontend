import React from "react"
import myImg from "../../images/Spongebob.png"

export default function RowContent(){

    return(
        <div className="row-content">
            <img src={myImg} width={150} height={150} />
            <img src={myImg} width={150} height={150} />

            
        </div>

        
    )
}