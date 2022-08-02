import React from "react";
import User from "./User";

export default function UserList() {
  return (
    <div className="user-list">
      <h3 className="userlist-header">
        Total Users: <span>6</span>
      </h3>
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
}
