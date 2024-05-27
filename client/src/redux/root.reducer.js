import configReducer from "./config.slice";
import UserReducer from "./auth/auth.slice";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  config: configReducer,
  user: UserReducer,
});
export default rootReducers;
