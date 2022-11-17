import {useContext} from "react";
import { UserContext } from "../../context/userContext"

export default function UserInfoButton(props){
    const { user } = useContext(UserContext)
    return(
        <button onClick={props.userInf} className="user-info">
        {user.display_name}
       </button> 
    )
}