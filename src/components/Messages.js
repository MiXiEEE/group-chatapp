import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import defaultavatar from "../img/defaultavatar.jpg";

const DISPLAY_MESSAGES = gql`
  query Messages {
    messages {
      body
      username
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageAdded {
    MessageAdded {
      body
      username
    }
  }
`;

export default function Messages() {
  const { data, loading } = useQuery(DISPLAY_MESSAGES, {
    fetchPolicy: "cache-and-network",
  });

  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    if (loading === false && data) {
      setMessagesList(data?.messages);
    }
  }, [data, loading]);

  const { user } = useContext(AuthContext);
  const { justIgnoreThisDoesNothing } = useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.MessageAdded;

      setMessagesList((messagesList) => [...messagesList, message]);
      console.log("MESSAGE RECEIVED");
    },
    fetchPolicy: "cache-and-network",
  });
  // console.log(justIgnoreThisDoesNothing);
  // const messages = [
  //   {
  //     userid: 1,
  //     msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
  //     userimg:
  //       "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
  //   },
  // ];
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {messagesList?.map((msg, index) => {
        if (msg.username !== user.username) {
          return (
            <div key={"received" + index} className="message-styles">
              <div className="message-top-section-other">
                <span className="myMessageUsername-other">{msg.username}:</span>
              </div>
              <div className="message-mid-section-other">
                <span>
                  <img className="msg-avatar" src={defaultavatar} alt="img" />
                </span>
                <span className="msg-text">{msg.body}</span>
              </div>
            </div>
          );
        } else {
          return (
            <div key={"sent" + index} className="message-styles-ownmsg">
              <div className="message-top-section">
                <span className="myMessageUsername">:{msg.username}</span>
              </div>
              <div className="message-mid-section">
                <span className="msg-text-owntext">{msg.body}</span>
                <span>
                  <img className="msg-avatar" src={defaultavatar} alt="img" />
                </span>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
