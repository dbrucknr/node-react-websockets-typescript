import { ThreadService } from "../../services/thread.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IThreadActions } from "../reducers/threadReducer";
import { IParticipant, IThread, Thread } from "../../models/thread";

export const ThreadActions = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.threadReducer.messages
  );
  const selectedThread = useSelector(
    (state: RootState) => new Thread(state.threadReducer.selectedThread)
  );

  const TEST = useSelector((state: RootState) => state.threadReducer.threads);

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

  const setParticipantOnline = (participant: IParticipant) =>
    dispatch({ type: IThreadActions, payload: participant });

  return {
    getMessages,
    setActiveThread,
    setParticipantOnline,
    messages,
    selectedThread,
    TEST,
  };
};
