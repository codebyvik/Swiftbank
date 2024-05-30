import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import { fetchUserSuccess, fetchUserError, SignoutUserSuccess } from "./auth.slice";
import AlertUser from "../../utils/show_alert";

axios.defaults.withCredentials = true;

function* fetchCurrentUserData() {
  try {
    const { data } = yield axios.get("http://localhost:8000/api/v1/user/");
    yield localStorage.setItem("loggedIn", true);
    yield localStorage.setItem("user_type", data.user.user_type);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield localStorage.removeItem("loggedIn");
    yield localStorage.removeItem("user_type");
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
    yield localStorage.setItem("loggedIn", true);
    yield localStorage.setItem("user_type", data.user.user_type);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield localStorage.removeItem("loggedIn");
    yield localStorage.removeItem("user_type");
    if (error.response.data === "Unauthorized") {
      AlertUser("Incorrect user name/password", "error");
      yield put(fetchUserError({ status: "fail", message: "Incorrect user name/password" }));
    } else {
      AlertUser(error.response.data.message, "error");
      yield put(fetchUserError(error.response.data));
    }
  }
}

export function* signinUser() {
  yield takeLatest("user/SigninUserStart", signinUserStart);
}

function* SignUpUser({ payload }) {
  try {
    const { data } = yield axios.post(
      "http://localhost:8000/api/v1/auth/signup",
      payload.credentials
    );
    yield AlertUser("Registered successfully", "success");
    yield put(fetchUserSuccess(data));
    yield window.location.replace("http://localhost:3000/signin");
  } catch (error) {
    yield localStorage.removeItem("loggedIn");
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
    yield localStorage.removeItem("loggedIn");
    yield localStorage.removeItem("user_type");
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

function* sendresetLink({ payload }) {
  try {
    yield axios.post("http://localhost:8000/api/v1/auth/reset-link", payload);
    AlertUser("OTP sent to your mail", "success");
    setTimeout(() => {
      window.location.replace("http://localhost:3000/signin");
    }, 3000);
  } catch (error) {
    AlertUser(error.response.data.message, "error");

    yield put(fetchUserError(error.response.data));
  }
}

export function* watchSendresetLink() {
  yield takeLatest("user/sendresetLink", sendresetLink);
}

function* resetPassword({ payload }) {
  const { id, credentials } = payload;
  try {
    yield axios.post(`http://localhost:8000/api/v1/user/forgot-password/${id}`, credentials);
    AlertUser("Password has been reset", "success");
    setTimeout(() => {
      window.location.replace("http://localhost:3000/signin");
    }, 3000);
  } catch (error) {
    AlertUser(error.response.data.message, "error");
    yield put(fetchUserError(error.response.data));
  }
}

export function* watchResetpassword() {
  yield takeLatest("user/resetpassword", resetPassword);
}

function* resetPIN({ payload }) {
  try {
    yield axios.post(`http://localhost:8000/api/v1/account/update-pin`, payload);
    AlertUser("PIN has been reset", "success");
    setTimeout(() => {
      window.location.replace("http://localhost:3000/");
    }, 3000);
  } catch (error) {
    AlertUser(error.response.data.message, "error");
    yield put(fetchUserError(error.response.data));
  }
}

export function* watchResetPIN() {
  yield takeLatest("user/resetPIN", resetPIN);
}
