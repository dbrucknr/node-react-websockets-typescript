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
    if (!message.length) {
      return;
    }
    // Send Message with Socket
    console.log(template);
    setMessage("");
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="TS-Messenger.io"
          onChange={(e) => handleMessage(e)}
          value={message || ""}
        />
        <button
          id="input-submission"
          onClick={(e) => handleSend(e)}
          disabled={message.length < 1 ? true : false}
        >
          Send
        </button>
      </div>
    </div>
  );
};
