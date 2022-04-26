import { ThreadService, IThreadMessages } from "../../services/thread.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IThreadActions } from "../reducers/threadReducer";

export const ThreadActions = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.threadReducer.messages
  );

  const { retrieveThreadMessages } = ThreadService();

  const getMessages = async (id: number) => {
    const service = await retrieveThreadMessages(id);
    console.log("getMessages", service);
    if (service) {
      dispatch({ type: IThreadActions.RETRIEVE, payload: service });
      return;
    }
  };

  return { getMessages, messages };
};
