export enum IThreadActions {
  RETRIEVE = "RETRIEVE",
}

interface IAction {
  type: IThreadActions;
  payload: Message[];
}

export interface Message {
  id: number;
  type: string;
  content: string;
  sender: any; // Make a User type
  createdAt: string;
  thread: any; // Make a Thread type
}

// interface ThreadMessages {
//   id: number;
//   type: string;
//   messages: Message[];
// }

interface IThreadState {
  messages: Message[];
}

const initialState = {
  messages: [],
};

const threadActionMap = {
  RETRIEVE: (state: IThreadState, payload: Message[]) => ({
    ...state,
    messages: payload,
  }),
};

export const threadReducer = (
  state: IThreadState = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  console.log("threadReducer", type, payload);
  const handler = threadActionMap[type];
  return handler ? handler(state, payload) : state;
};
