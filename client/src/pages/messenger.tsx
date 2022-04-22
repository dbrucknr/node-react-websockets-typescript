import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { UserThreads } from "../components/thread/userThreads";
import { Messages } from "../components/messages/messages";
import "../styles/messenger.css";

export const Messenger = () => {
  const currentUser = useSelector((state: RootState) => state.authReducer.user);
  console.log("messenger currentUser", currentUser);
  return (
    <div id="messenger-container">
      <div id="wrapper">
        <UserThreads />
        <Messages />
      </div>
      {currentUser.firstName}
      {currentUser.lastName}
    </div>
  );
};
