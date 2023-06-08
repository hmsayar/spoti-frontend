import {useContext} from "react"
import { Link } from "react-router-dom"
import { PlaylistContext } from "../../context/playlistContext";


export default function NavItem({ ext, logo, name, cssClass,style, isSelected, contextMenu }) {

    const { handleCreatePlaylist } = useContext(PlaylistContext)
    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };

      function createPlaylist(){
        if(name==="Create Playlist"){
           handleCreatePlaylist()
        }
      }


    return (
        <div onContextMenu={contextMenu} style={style} className="nav-item-container" onClick={createPlaylist}>
            <Link to={ext} style={linkStyle}>
                <div className="nav-item">
                    {logo && <img className="nav-item-logo" src={logo} width={24} height={24} alt="sidebar-logo" />}
                    <h4 style={isSelected ? {color:"white"}: null} className={cssClass}>{name}</h4>
                </div>
            </Link>

        </div>

    )
}