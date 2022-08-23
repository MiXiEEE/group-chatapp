import React from "react";
import defaultavatar from "../img/defaultavatar.jpg";
export default function User({ user }) {
  return (
    <div className="user-styles">
      <span className="user">
        <img className="userlist-avatar" src={defaultavatar} alt="userimg" />
      </span>
      <span className="user">{user.username}</span>
    </div>
  );
}
