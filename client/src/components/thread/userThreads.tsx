import "../../styles/user-threads.css";
import { ThreadActions } from "../../state/actions/threadActions";
import { AuthActions } from "../../state/actions/authActions";
import { ParticipantCard } from "../participants/participantCard";

export const UserThreads = () => {
  const { getMessages } = ThreadActions();
  const { self } = AuthActions();

  return (
    <div id="threads">
      <h1>{self.fullName}'s Threads</h1>
      <p id="thread-count-summary">
        You have {self.threadCount}{" "}
        {self.threadCount > 1 ? "conversations" : "conversation"}
      </p>
      {self.threads.map((thread) => {
        return (
          <div key={thread.id} onClick={() => getMessages(thread.id)}>
            {thread.participants.map((participant) =>
              participant.user.id !== self.id ? (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                />
              ) : null
            )}
          </div>
        );
      })}
    </div>
  );
};
