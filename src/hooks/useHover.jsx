import { useState } from "react";

export default function useHover(defaultOnValue=false){
    const [isHovered, setIsHoverd] = useState(defaultOnValue)

    function handleHover(){
        setIsHoverd(prev => !prev)
    }
    function trueHover(){
        setIsHoverd(true)
    }

    return[isHovered, handleHover, trueHover]
}
