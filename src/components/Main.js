import React from "react";
import ChatContainer from "./ChatContainer";
import UserList from "./UserList";
import Navbar from "./Navbar";

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="container">
          <UserList />
          <ChatContainer />
        </div>
      </div>
    </>
  );
}
