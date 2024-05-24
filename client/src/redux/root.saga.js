import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchSignUpUserStart,
  watchSignoutUserStart,
} from "./auth/auth.saga";

export default function* rootSaga() {
  yield all([currentUser(), signinUser(), watchSignUpUserStart(), watchSignoutUserStart()]);
  // code after all-effect
}
