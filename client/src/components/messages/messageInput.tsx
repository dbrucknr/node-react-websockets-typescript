import "../../styles/message-input.css";
import { ChangeEvent, useState } from "react";
import { AuthActions } from "../../state/actions/authActions";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { self } = AuthActions();

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const template = {
    type: "standard",
    content: message,
    sender: self,
    thread: 0, // Need to set an active thread - pass here either by prop or in redux
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="TS-Messenger.io"
          onChange={(e) => handleMessage(e)}
        />
      </div>
    </div>
  );
};
