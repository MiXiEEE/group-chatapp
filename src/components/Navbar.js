import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import defaultavatar from "../img/defaultavatar.jpg";

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
            <img className="avatar" src={defaultavatar} alt="avatar" />
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
