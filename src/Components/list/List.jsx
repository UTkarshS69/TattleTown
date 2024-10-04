import ChatList from "./ChatList/ChatList"; 
import Cosinfo from "./Cosinfo/Cosinfo";
import "./list.css";
const list = () =>{
    return (
        <div className="List">
            <Cosinfo/>
            <ChatList/>
        </div>
    )
}  

export default list;