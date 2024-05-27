import configReducer from "./config.slice";
import UserReducer from "./auth/auth.slice";
import AccountReducer from "./accounts/account.slice";
import TransactionsReducer from "./transactions/transactions.slice";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  config: configReducer,
  user: UserReducer,
  accounts: AccountReducer,
  transactions: TransactionsReducer,
});
export default rootReducers;
