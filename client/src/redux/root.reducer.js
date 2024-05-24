import configReducer from "./config.slice";
import UserReducer from "./auth/auth.slice";
export const StateType = {
  // Reducers types here
};

const rootReducers = {
  config: configReducer,
  user: UserReducer,
};
export default rootReducers;
