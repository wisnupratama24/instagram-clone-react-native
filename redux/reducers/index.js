import { combineReducers } from "redux";
import { user } from "./users";
export const rootReducers = combineReducers({
  userState: user,
});
