import "./Cosinfo.css"; 
import { useUserStore } from "../../../lib/useUserStore";

const Cosinfo = () => { 

  const { currentUser }= useUserStore();
  return (
    <div className="Cosinfo">
      <div className="user">
        <img className="ava" src={currentUser.avatar || "avatar.png"} alt="" /> 
        <h3>{currentUser.username}</h3>
      </div>
      <div className="icons">
        <img className="" src="more.png" alt="" />
        <img src="video.png" alt="" />
        <img src="edit.png" alt="" />
      </div>
    </div>
  );
};

export default Cosinfo;
