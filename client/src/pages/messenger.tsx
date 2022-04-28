import { UserThreads } from "../components/thread/userThreads";
import { Messages } from "../components/messages/messages";
import "../styles/messenger.css";
import { useWebSocket } from "../hooks/useWebSocket";

export const Messenger = () => {
  useWebSocket();

  return (
    <div id="messenger-container">
      <div id="wrapper">
        <UserThreads />
        <Messages />
      </div>
    </div>
  );
};
