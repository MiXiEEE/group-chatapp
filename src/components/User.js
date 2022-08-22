import React from "react";

export default function User({ user }) {
  return (
    <div className="user-styles">
      <span className="user">
        <img
          className="userlist-avatar"
          src="https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg"
          alt="userimg"
        />
      </span>
      <span className="user">{user.username}</span>
    </div>
  );
}
