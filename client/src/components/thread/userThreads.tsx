import "../../styles/user-threads.css";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ThreadActions } from "../../state/actions/threadActions";

export const UserThreads = () => {
  const threads = useSelector(
    (state: RootState) => state.authReducer.user.threads
  );
  const { getMessages } = ThreadActions();

  return (
    <div id="threads">
      <h1>User's Threads</h1>
      {threads.map((thread) => {
        return (
          <div key={thread.id} onClick={() => getMessages(thread.id)}>
            {thread.id}{" "}
            {thread.participants.map((participant: any) => {
              return (
                <div key={participant.id}>{participant.user.firstName}</div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
