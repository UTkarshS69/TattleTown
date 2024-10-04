import React, { useEffect } from "react";
import Chat from "./Components/chat/Chat";
import Detail from "./Components/details/Detail";
import List from "./Components/list/List.jsx";
import Login from "./Components/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js"; 
import { useUserStore } from "./lib/useUserStore.js"; 
import { useChatStore } from "./lib/chatStore.js";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(); 
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
