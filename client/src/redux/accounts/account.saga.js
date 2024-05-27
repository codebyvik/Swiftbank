import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { fetchdashboardSuccess, fetchDashboardError } from "./account.slice";
import { fetchTransactionsSuccessfull } from "../transactions/transactions.slice";

axios.defaults.withCredentials = true;

function* fetchDashboard({ payload }) {
  try {
    const { data } = yield axios.get("http://localhost:8000/api/v1/account/dashboard");
    yield put(fetchdashboardSuccess(data));
    yield put(fetchTransactionsSuccessfull(data));
  } catch (error) {
    yield put(fetchDashboardError(error.response.data));
  }
}

export function* watchFetchDashboardStart() {
  yield takeLatest("accounts/fetchDashboardStart", fetchDashboard);
}
