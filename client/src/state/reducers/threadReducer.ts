import { IMessage } from "../../models/message";
import { emptyThread, IThread } from "../../models/thread";

export enum IThreadActions {
  RETRIEVE = "RETRIEVE",
  SELECT_THREAD = "SELECT_THREAD",
}

type Payload = IMessage[] & IThread;

interface IAction {
  type: IThreadActions;
  payload: Payload;
}

interface IThreadState {
  messages: IMessage[];
  selectedThread: IThread;
}

const initialState = {
  messages: [],
  selectedThread: emptyThread(),
};

const threadActionMap = {
  RETRIEVE: (state: IThreadState, payload: IMessage[]) => ({
    ...state,
    messages: payload,
  }),
  SELECT_THREAD: (state: IThreadState, payload: IThread) => ({
    ...state,
    selectedThread: payload,
  }),
};

export const threadReducer = (
  state: IThreadState = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  const handler = threadActionMap[type];
  return handler ? handler(state, payload) : state;
};
