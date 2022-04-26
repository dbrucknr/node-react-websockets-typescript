import { UserThreads } from "../components/thread/userThreads";
import { Messages } from "../components/messages/messages";
import "../styles/messenger.css";

export const Messenger = () => {
  return (
    <div id="messenger-container">
      <div id="wrapper">
        <UserThreads />
        <Messages />
      </div>
    </div>
  );
};
