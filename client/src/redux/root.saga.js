import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchSignUpUserStart,
  watchSignoutUserStart,
} from "./auth/auth.saga";
import { WatchUpdateUserStart } from "./user/user.saga";
import { watchFetchDashboardStart } from "./accounts/account.saga";
import { watchFetchTransactionStart } from "./transactions/transactions.saga";

export default function* rootSaga() {
  yield all([
    currentUser(),
    signinUser(),
    watchSignUpUserStart(),
    watchSignoutUserStart(),
    WatchUpdateUserStart(),
    watchFetchDashboardStart(),
    watchFetchTransactionStart(),
  ]);

  // code after all-effect
}
