import "../../styles/user-threads.css";
import { ThreadActions } from "../../state/actions/threadActions";
import { AuthActions } from "../../state/actions/authActions";
import { ParticipantCard } from "../participants/participantCard";
import { IThread } from "../../models/thread";

export const UserThreads = () => {
  const { getMessages, setActiveThread } = ThreadActions();
  const { self } = AuthActions();

  const handleClick = (thread: IThread) => {
    getMessages(thread.id);
    setActiveThread(thread);
  };

  return (
    <div id="threads">
      <h1>{self.fullName}'s Threads</h1>
      <p id="thread-count-summary">
        You have {self.threadCount}{" "}
        {self.threadCount > 1 ? "conversations" : "conversation"}
      </p>
      {self.threads.map((thread) => {
        return (
          <div key={thread.id} onClick={() => handleClick(thread)}>
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
