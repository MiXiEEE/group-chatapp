import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "../hooks/hooks";
import Messages from "./Messages";
import { AuthContext } from "../context/authContext";

const SEND_MESSAGE = gql`
  mutation SendMessage($messageInput: MessageInput) {
    sendMessage(messageInput: $messageInput) {
      body
      username
    }
  }
`;

export default function ChatContainer() {
  const { user } = useContext(AuthContext);
  const messageEndRef = useRef(null);

  const sendMessagesCallback = () => {
    SendMessage();
  };

  const { onChange, onSubmit, values } = useForm(sendMessagesCallback, {
    body: "",
    username: user.username,
  });

  const [SendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    variables: { messageInput: values },
  });

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [onSubmit, loading]);

  return (
    <div className="chat-container">
      <div className="chat-sub-container">
        <Messages />
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={onSubmit}>
        <textarea name="body" onChange={onChange}></textarea>
        <button onSubmit={onSubmit}>
          <i className="material-icons">message</i>
        </button>
      </form>
    </div>
  );
}
