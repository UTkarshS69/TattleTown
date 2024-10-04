import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "C:/Users/Utkarsh Sharma/Desktop/COLLEGE/ELECTRICAL AND COMMUNICATION/Web Development/TattleTown/react-firebase-chat/src/lib/firebase.js"; 
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "C:/Users/Utkarsh Sharma/Desktop/COLLEGE/ELECTRICAL AND COMMUNICATION/Web Development/TattleTown/react-firebase-chat/src/lib/firebase.js"
import upload from "C:/Users/Utkarsh Sharma/Desktop/COLLEGE/ELECTRICAL AND COMMUNICATION/Web Development/TattleTown/react-firebase-chat/src/lib/upload.js";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  }); 

const [loading,setLoading] = useState(false)  

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setLoading(true)
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    console.log("Form Data:", { username, email, password });

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); 

      const imgUrl = await upload(avatar.file)

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email, 
        avatar: imgUrl,
        id: res.user.uid, 
        blocked: [],
      }); 

      await setDoc(doc(db, "userschats", res.user.uid), {
        chats: [],
      });

      toast.success("User registered successfully!");
       
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } 
    finally{
      setLoading(false)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In Successfully");
    } catch (err) {
      console.log(err); 
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="item login-form">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading" : "Log In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item signup-form">
        <h2>Create an Account,</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="avatar-upload" className="avatar-label">
            <img src={avatar.url || "avatar.png"} alt="Avatar" />
            <span>Upload an Avatar</span>
          </label>
          <input
            type="file"
            id="avatar-upload"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;