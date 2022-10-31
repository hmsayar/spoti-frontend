import React from "react"
import RowContent from "./RowContent"
import Header from "./Header"

export default function MainContent(){
    console.log("main")
    return(
        <div className="main-content">
            <Header />
            <RowContent />
            <RowContent />
            <RowContent />

            
        </div>

        
    )
}