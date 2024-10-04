import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/useUserStore";
import { doc } from "firebase/firestore"; 
import { db } from "C:/Users/Utkarsh Sharma/Desktop/COLLEGE/ELECTRICAL AND COMMUNICATION/Web Development/TattleTown/react-firebase-chat/src/lib/firebase.js";
import "./detail.css";
import { auth } from "C:/Users/Utkarsh Sharma/Desktop/COLLEGE/ELECTRICAL AND COMMUNICATION/Web Development/TattleTown/react-firebase-chat/src/lib/firebase.js";

const Detail = () => {
  const {
    checkActionCode,
    user,
    isCurrentUserBlocked,
    isReciverBlocked,
    changeBlock,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReciverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Detail">
      <div className="user">
        <img className="lip" src={user?.avatar || "avatar.png"} alt="Avatar" />
        <h3>{user?.username}</h3>
        <p>Lorem ipsum dolor sit, amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img className="img" src="arrowUp.png" alt="Arrow Up" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img className="img" src="arrowUp.png" alt="Arrow Down" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Images</span>
            <img className="img" src="arrowDown.png" alt="Arrow Up" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photodetails">
                <img src="sent.png" alt="Sent" className="img" />
                <span className="span">Photo Name</span>
              </div>
              <img src="download.png" alt="Download" className="opi" />
            </div>
            <div className="photoItem">
              <div className="photodetails">
                <img src="sent.png" alt="Sent" className="img" />
                <span className="span">Photo Name</span>
              </div>
              <img src="download.png" alt="Download" className="opi" />
            </div>
            <div className="photoItem">
              <div className="photodetails">
                <img src="sent.png" alt="Sent" className="img" />
                <span className="span">Photo Name</span>
              </div>
              <img src="download.png" alt="Download" className="opi" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img className="img" src="arrowUp.png" alt="Arrow Up" />
          </div>
        </div>
        <div className="blockLogButtons">
          <button className="BlockU" onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked"
              : isReciverBlocked
              ? "User Blocked"
              : "Block User"}
          </button>
          <button className="LogOut" onClick={() => auth.signOut()}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
