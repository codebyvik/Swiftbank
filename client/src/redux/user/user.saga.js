import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import { fetchUserSuccess, fetchUserError } from "../auth/auth.slice";
import AlertUser from "../../utils/show_alert";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

function* UpdateUser({ payload }) {
  try {
    // const userId = useSelector((state) => state.user.user.id);

    const { data } = yield axios.post(
      `http://localhost:8000/api/v1/user/update/${payload.id}`,
      payload.updatedFields
    );

    yield put(fetchUserSuccess(data));
    AlertUser("Updated successfully", "success");
  } catch (error) {
    console.log("err", error);
    AlertUser(error?.response?.data?.message, "error");
    yield put(fetchUserError(error?.response?.data));
  }
}

export function* WatchUpdateUserStart() {
  yield takeLatest("user/UpdateUserStart", UpdateUser);
}
