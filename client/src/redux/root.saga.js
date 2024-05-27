import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchSignUpUserStart,
  watchSignoutUserStart,
} from "./auth/auth.saga";
import { WatchUpdateUserStart } from "./user/user.saga";
import { watchFetchDashboardStart } from "./accounts/account.saga";

export default function* rootSaga() {
  yield all([
    currentUser(),
    signinUser(),
    watchSignUpUserStart(),
    watchSignoutUserStart(),
    WatchUpdateUserStart(),
    watchFetchDashboardStart(),
  ]);

  // code after all-effect
}
