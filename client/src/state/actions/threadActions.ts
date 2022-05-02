import { ThreadService } from "../../services/thread.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IThreadActions } from "../reducers/threadReducer";
import { IThread, Thread } from "../../models/thread";
import { IUser } from "../../models/user";

export const ThreadActions = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.threadReducer.messages
  );
  const selectedThread = useSelector(
    (state: RootState) => new Thread(state.threadReducer.selectedThread)
  );

  const threads = useSelector(
    (state: RootState) => state.threadReducer.threads
  );

  const { retrieveThreadMessages } = ThreadService();

  const getMessages = async (id: number) => {
    const service = await retrieveThreadMessages(id);
    if (service) {
      dispatch({ type: IThreadActions.RETRIEVE_MESSAGES, payload: service });
      return;
    }
  };

  const setActiveThread = (thread: IThread) =>
    dispatch({ type: IThreadActions.SELECT_THREAD, payload: thread });

  const setParticipantOnline = (user: IUser) =>
    dispatch({ type: IThreadActions, payload: user });

  const seeOnlineParticipants = (participantsIds: number[]) => {
    dispatch({ type: IThreadActions });
  };

  return {
    getMessages,
    setActiveThread,
    setParticipantOnline,
    seeOnlineParticipants,
    messages,
    selectedThread,
    threads,
  };
};
