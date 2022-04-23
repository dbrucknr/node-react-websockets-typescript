import "../../styles/user-threads.css";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const UserThreads = () => {
  const threads = useSelector(
    (state: RootState) => state.authReducer.user.threads
  );
  return (
    <div id="threads">
      <h1>User's Threads</h1>
      {threads.map((thread) => {
        return (
          <div key={thread.id}>
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
