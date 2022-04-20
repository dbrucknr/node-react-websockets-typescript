export enum IAuthActions {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

interface IAction {
  type: IAuthActions;
  payload: any;
}

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   threads: any[];
//   threadParticipant: any[];
// }

// firstName: "",
// lastName: "",
// email: "",
// threads: [],
// threadParticipant: [],

interface IAuthState {
  user: {}; // TODO - set this to a User type (model)
  isLoggedIn: boolean;
}

const initialState = {
  user: {},
  isLoggedIn: false,
};

const authActionMap = {
  LOGIN: (state: IAuthState, payload: IAction) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  }),
  LOGOUT: (state: IAuthState) => ({
    ...state,
    user: {},
    token: "",
    isLoggedIn: false,
  }),
  REGISTER: (state: IAuthState, payload: IAction) => ({
    ...state,
    user: payload,
    isLoggedIn: true,
  }),
};

export const authReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;
  const handler = authActionMap[type];
  return handler ? handler(state, payload) : state;
};