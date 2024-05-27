import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchSignUpUserStart,
  watchSignoutUserStart,
} from "./auth/auth.saga";
import { WatchUpdateUserStart } from "./user/user.saga";

export default function* rootSaga() {
  yield all([
    currentUser(),
    signinUser(),
    watchSignUpUserStart(),
    watchSignoutUserStart(),
    WatchUpdateUserStart(),
  ]);

  // code after all-effect
}
