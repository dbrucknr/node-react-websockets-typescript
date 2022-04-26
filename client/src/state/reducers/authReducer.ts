import { IUser } from "../types/state";

export enum IAuthActions {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

interface IAction {
  type: IAuthActions;
  payload: IUser;
}

interface IAuthState {
  user: IUser; // TODO - set this to a User type (model)
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
  LOGIN: (state: IAuthState, payload: IUser) => ({
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
  REGISTER: (state: IAuthState, payload: IUser) => ({
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
