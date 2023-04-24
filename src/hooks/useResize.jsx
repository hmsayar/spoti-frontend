import { useState, useEffect } from "react";

export default function useResize() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            console.log("bbb")
        };
    },[])

    return [screenWidth]
}
