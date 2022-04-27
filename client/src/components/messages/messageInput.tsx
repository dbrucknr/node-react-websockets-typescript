import "../../styles/message-input.css";
import { ChangeEvent, MouseEvent, useState } from "react";
import { AuthActions } from "../../state/actions/authActions";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { self } = AuthActions();

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const template = {
    type: "standard", // This will be default for now until images are completed
    content: message,
    sender: self,
    thread: 0, // Need to set an active thread - pass here either by prop or in redux
  };

  const handleSend = (event: MouseEvent<HTMLButtonElement>) => {
    // Send Message with Socket
    console.log(template);
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="TS-Messenger.io"
          onChange={(e) => handleMessage(e)}
        />
        <button id="input-submission" onClick={(e) => handleSend(e)}>
          Send
        </button>
      </div>
    </div>
  );
};
