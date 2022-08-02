import React from "react";

export default function Navbar() {
  const loggedIn = true;
  return (
    <>
      {loggedIn ? (
        <div className="navbar">
          <div className="left-nav">
            <img
              className="avatar"
              src="https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg"
              alt="avatar"
            />
            <span>Username</span>
          </div>
          <span>Logout</span>
        </div>
      ) : (
        <div className="navbar">
          <div className="left-nav"></div>
        </div>
      )}
    </>
  );
}
