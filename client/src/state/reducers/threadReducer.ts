import { IMessage } from "../../models/message";
import { emptyThread, IThread } from "../../models/thread";
import { IUser } from "../../models/user";
import { actionMapper } from "../utilities/actionMapper";
import { StatusOptions } from "../utilities/actionMapper";

export enum IThreadActions {
  RETRIEVE_MESSAGES = "RETRIEVE_MESSAGES",
  SELECT_THREAD = "SELECT_THREAD",
  SET_THREADS = "SET_THREADS",
  SET_PARTICIPANT_ONLINE = "SET_PARTICIPANT_ONLINE",
  PARTICIPANTS_ONLINE = "PARTICIPANTS_ONLINE",
}

type Payload = IMessage[] & IThread & IThread[] & IUser & number[];

interface IAction {
  type: IThreadActions;
  payload: Payload;
}

export interface IThreadState {
  messages: IMessage[];
  selectedThread: IThread;
  threads: IThread[];
}

const initialState = {
  messages: [],
  selectedThread: emptyThread(),
  threads: [],
};

const { setUserStatus, getOnlineUsers } = actionMapper();

const threadActionMap = {
  RETRIEVE_MESSAGES: (state: IThreadState, payload: IMessage[]) => ({
    ...state,
    messages: payload,
  }),
  SELECT_THREAD: (state: IThreadState, payload: IThread) => ({
    ...state,
    selectedThread: payload,
  }),
  SET_THREADS: (state: IThreadState, payload: IThread[]) => ({
    ...state,
    threads: payload,
  }),
  SET_PARTICIPANT_ONLINE: (state: IThreadState, payload: IUser) => ({
    ...setUserStatus(state, payload, StatusOptions.ONLINE),
  }),
  PARTICIPANTS_ONLINE: (state: IThreadState, payload: number[]) => ({
    ...getOnlineUsers(state, payload),
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
