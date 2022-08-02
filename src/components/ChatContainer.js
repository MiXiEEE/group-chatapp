import React from "react";
import Messages from "./Messages";

export default function ChatContainer() {
  return (
    <div className="chat-container">
      <div className="chat-sub-container">
        <Messages />
      </div>
      <form>
        <textarea multiline></textarea>
        <button>
          <i class="material-icons">message</i>
        </button>
      </form>
    </div>
  );
}
