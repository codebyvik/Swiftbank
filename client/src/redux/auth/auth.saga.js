import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import { fetchUserSuccess, fetchUserError, SignoutUserSuccess } from "./auth.slice";
import AlertUser from "../../utils/show_alert";

axios.defaults.withCredentials = true;

function* fetchCurrentUserData() {
  try {
    const { data } = yield axios.get("http://localhost:8000/api/v1/user/");
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserError(error.response.data));
  }
}

export function* currentUser() {
  yield takeLatest("user/fetchUserStart", fetchCurrentUserData);
}

function* signinUserStart({ payload }) {
  try {
    const { data } = yield axios.post("http://localhost:8000/api/v1/auth/signin", payload);
    AlertUser("Signin success", "success");
    yield put(fetchUserSuccess(data));
  } catch (error) {
    if (error.response.data === "Unauthorized") {
      AlertUser("Incorrect user name/password", "error");
      yield put(fetchUserError({ status: "fail", message: "Incorrect user name/password" }));
    } else {
      AlertUser(error.response.data, "error");
      yield put(fetchUserError(error.response.data));
    }
  }
}

export function* signinUser() {
  yield takeLatest("user/SigninUserStart", signinUserStart);
}

function* SignUpUser({ payload }) {
  try {
    yield axios.post("http://localhost:8000/api/v1/auth/signup", payload);
    yield AlertUser("Registered successfully", "success");
    yield put(fetchUserSuccess());
    yield window.location.replace("http://localhost:3000/signin");
  } catch (error) {
    AlertUser(error.response.data.message, "error");
    yield put(fetchUserError(error.response.data));
  }
}

export function* watchSignUpUserStart() {
  yield takeLatest("user/SignUpUserStart", SignUpUser);
}

function* SignoutUser() {
  try {
    yield axios.get("http://localhost:8000/api/v1/auth/signout");
    AlertUser("Logged out successfully", "success");
    document.cookie = `Swiftbank=; expires= ${new Date(0).toUTCString()}; path=/;`;
    yield put(SignoutUserSuccess());
    yield window.location.reload();
  } catch (error) {
    AlertUser(error.response.data.message, "error");
    yield put(fetchUserError(error.response.data));
  }
}

export function* watchSignoutUserStart() {
  yield takeLatest("user/SignoutUserStart", SignoutUser);
}
