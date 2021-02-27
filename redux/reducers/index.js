import { combineReducers } from "redux";
import { user } from "./users";
import { addReducers } from "./add";

export const rootReducers = combineReducers({
  userState: user,
  addState: addReducers,
});
