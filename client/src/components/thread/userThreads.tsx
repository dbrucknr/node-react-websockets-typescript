import "../../styles/user-threads.css";
import { ThreadActions } from "../../state/actions/threadActions";
import { AuthActions } from "../../state/actions/authActions";

export const UserThreads = () => {
  const { getMessages } = ThreadActions();
  const { self } = AuthActions();

  return (
    <div id="threads">
      <h1>{self.fullName}'s Threads</h1>
      {self.threads.map((thread) => {
        return (
          <div key={thread.id} onClick={() => getMessages(thread.id)}>
            {thread.participants.map((participant) => {
              return participant.user.id !== self.id ? (
                <div key={participant.id} id="participant">
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
