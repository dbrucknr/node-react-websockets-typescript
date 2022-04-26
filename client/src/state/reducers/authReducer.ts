import { emptyUser, IUser, User } from "../../models/user";

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
  user: emptyUser(),
  isLoggedIn: false,
};

const authActionMap = {
  LOGIN: (state: IAuthState, payload: IUser) => {
    return { ...state, user: payload, isLoggedIn: true };
  },
  LOGOUT: (state: IAuthState) => ({
    ...state,
    user: emptyUser(),
    token: "",
    isLoggedIn: false,
  }),
  REGISTER: (state: IAuthState, payload: IUser) => ({
    ...state,
    user: new User(payload),
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
