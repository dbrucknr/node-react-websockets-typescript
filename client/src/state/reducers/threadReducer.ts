import { IUser, IMessage, IParticipant, IThread } from "../types/state";

export enum IThreadActions {
  RETRIEVE = "RETRIEVE",
}

interface IAction {
  type: IThreadActions;
  payload: IMessage[];
}

interface IThreadState {
  messages: IMessage[];
}

const initialState = {
  messages: [],
};

const threadActionMap = {
  RETRIEVE: (state: IThreadState, payload: IMessage[]) => ({
    ...state,
    messages: payload,
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
