import { useContext } from "react"
import PlayButton from "./PlayButton"
import useHover from "../../hooks/useHover"
import { Link } from "react-router-dom"
import { MenuContext } from "../../context/contextMenuContext"
import defaultImg from "../../images/empty-playlist-image.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';




const linkStyle = {
    textDecoration: "none",
    color: 'white',
};

export default function RowItem({ data }) {

    const [isHovered, handleHover] = useHover(false)


    const { handleContextMenuData } = useContext(MenuContext);

    const handleContextMenu = (event) => {
        event.preventDefault();
        handleContextMenuData({
            customData: data,
            owner: data.owner,
            playlist_id: "",
            type: "playlist",
            isVisible: true,
            xPos: event.clientX,
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


            {isHovered && data.tracks.total > 0 && <PlayButton type="home" item={data.uri} />}
            <Link to={`/playlist/${data.id}`} style={linkStyle}>
                <LazyLoadImage
                    effect="blur"
                    className="playlist-item-img"
                    src={data.images.length > 0 ? data.images[0].url : defaultImg}
                />
                <h3> {data.name}</h3>
                {
                    data.description.length > 0 ?
                        <p>{data.description.length < 50 ? data.description : data.description.substring(0, 45) + "..."}</p> :
                        <p>By {data.owner.display_name}</p>
                }
            </Link>

        </div>

    )
}
