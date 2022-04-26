export enum IAuthActions {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

interface IAction {
  type: IAuthActions;
  payload: User;
}

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  threads: any[];
  threadParticipant: any[];
};

interface IAuthState {
  user: User; // TODO - set this to a User type (model)
  isLoggedIn: boolean;
}

const initialState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    threads: [],
    threadParticipant: [],
  },
  isLoggedIn: false,
};

const authActionMap = {
  LOGIN: (state: IAuthState, payload: User) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  }),
  LOGOUT: (state: IAuthState) => ({
    ...state,
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      threads: [],
      threadParticipant: [],
    },
    token: "",
    isLoggedIn: false,
  }),
  REGISTER: (state: IAuthState, payload: User) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  }),
};

export const authReducer = (
  state: IAuthState = initialState,
  action: IAction
) => {
  const { type, payload } = action;
  const handler = authActionMap[type];
  return handler ? handler(state, payload) : state;
};
