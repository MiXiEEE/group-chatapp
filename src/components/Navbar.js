import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <div className="navbar">
          <div className="left-nav">
            <img
              className="avatar"
              src="https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg"
              alt="avatar"
            />
            {user ? (
              <>
                <span>{user.username}</span>
              </>
            ) : (
              <>
                <span>Username</span>
              </>
            )}
          </div>
          <Link to="/" onClick={onLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="navbar">
          <div className="left-nav"></div>
        </div>
      )}
    </>
  );
}
