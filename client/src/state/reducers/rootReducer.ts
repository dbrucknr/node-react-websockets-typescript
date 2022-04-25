import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { threadReducer } from "./threadReducer";

export const rootReducer = combineReducers({
  authReducer,
  threadReducer,
});
