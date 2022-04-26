import "../../styles/user-threads.css";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ThreadActions } from "../../state/actions/threadActions";
import { AuthActions } from "../../state/actions/authActions";

export const UserThreads = () => {
  const threads = useSelector(
    (state: RootState) => state.authReducer.user.threads
  );
  const { getMessages } = ThreadActions();
  const { self } = AuthActions();

  return (
    <div id="threads">
      <h1>User's Threads</h1>
      {threads.map((thread) => {
        return (
          <div key={thread.id} onClick={() => getMessages(thread.id)}>
            {thread.participants.map((participant: any) => {
              return participant.user.id !== self.id ? (
                <div key={participant.id}>
                  {participant.user.firstName} {participant.user.lastName}
                </div>
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
};
