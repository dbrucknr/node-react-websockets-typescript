import "../../styles/messages.css";
import { ThreadActions } from "../../state/actions/threadActions";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Message } from "../../state/reducers/threadReducer";

export const Messages = () => {
  const { messages } = ThreadActions();
  console.log("Messages", messages);
  return (
    <div id="messages">
      <h1>Messages</h1>
      {messages.map((message: Message) => {
        return (
          <div key={message.id}>
            {message.type}
            {message.content}
          </div>
        );
      })}
    </div>
  );
};
