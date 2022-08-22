import React from "react";
import User from "./User";
import { gql, useQuery } from "@apollo/client";

const GET_USERNAMES = gql`
  query GetUsernames {
    users {
      username
    }
  }
`;

export default function UserList() {
  // {loading, error, data}
  const { data } = useQuery(GET_USERNAMES, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="user-list">
      <h3 className="userlist-header">
        Total Users: <span>{data?.users.length || 0}</span>
      </h3>
      {data?.users.map((user) => (
        <User key={user.username} user={user} />
      ))}
    </div>
  );
}
