import { useState, useEffect, useContext } from "react"
import PlayButton from "./PlayButton"
import useHover from "../../hooks/useHover"
import { Link } from "react-router-dom"
import CustomContextMenu from "./CustomContextMenu"
import { MenuContext } from "../../context/contextMenuContext"

// const onContextMenuStyle = {
//     textDecoration:"underline"
// }

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};

export default function RowItem({ data }) {

    const [isHovered, handleHover] = useHover(false)

    // const { menuRef, setVisible } = useContext(MenuContext);

    // const [contextMenuProps, setContextMenuProps] = useState(null);

    // function handleContextMenu(event) {
    //   event.preventDefault();
    //   setContextMenuProps({
    //     x: event.clientX,
    //     y: event.clientY,
    //     item: data.id
    //   });
    // }

    const { handleContextMenuData } = useContext(MenuContext);
    const handleContextMenu = (event) => {
        event.preventDefault();
        handleContextMenuData({
            customData: data,
            owner:data.owner,
            playlist_id:"",
            type: "playlist",
            isVisible: true,
            xPos:event.clientX,
            yPos: event.clientY
        });
    };


    return (


        <div
            className="playlist-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onContextMenu={handleContextMenu}
        >
            {isHovered && <PlayButton type="home" item={data.uri} />}
            <Link to={`/playlist/${data.id}`} style={linkStyle}>
                <img className="playlist-item-img" src={data.images[0].url} width={180} height={180} />
                <h3> {data.name}</h3>
                <p>{data.description.length < 50 ? data.description : data.description.substring(0, 45) + "..."}</p>
            </Link>

        </div>

    )
}
