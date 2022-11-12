import React from "react"
import { Link} from "react-router-dom"

export default function NavItem({ ext, logo, name }) {
    const linkStyle = {
        textDecoration: "none",
        color: 'white',
      };
    return (
        <div>
            <Link to={ext} style={linkStyle}>
                <div className="nav-item">
                    {logo && <img className="nav-item-logo" src={logo} width={24} height={24} />}
                    <h4>{name}</h4>
                </div>
            </Link>

        </div>

    )
}