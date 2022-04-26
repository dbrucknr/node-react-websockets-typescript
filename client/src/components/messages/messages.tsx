import "../../styles/messages.css";
import { ThreadActions } from "../../state/actions/threadActions";
import { AuthActions } from "../../state/actions/authActions";
import { Message } from "../../state/reducers/threadReducer";

export const Messages = () => {
  const { messages } = ThreadActions();
  const { self } = AuthActions();

  const determineOwner = (message: Message) =>
    message.sender.id === self.id ? "owner" : "other";

  return (
    <div id="messages">
      <h1>Messages</h1>
      {messages.map((message) => {
        return (
          <div key={message.id} className={determineOwner(message)}>
            {message.sender.firstName}:{message.content}
          </div>
        );
      })}
    </div>
  );
};
