import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  fetchdashboardSuccess,
  fetchDashboardError,
  toggleAccountSuccess,
  fetchAccountSuccess,
  fetchAllAccountsSuccess,
} from "./account.slice";
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

function* fetchAllAccounts({ payload }) {
  const { page, sort, name } = payload;
  try {
    const { data } = yield axios.get(
      `http://localhost:8000/api/v1/account/?page=${page}&sort=${sort}&name=${name}`
    );
    yield put(fetchAllAccountsSuccess(data));
  } catch (error) {
    yield put(fetchDashboardError(error.response.data));
  }
}

export function* watchFetchAllAccounts() {
  yield takeLatest("accounts/fetchAllAccounts", fetchAllAccounts);
}

function* fetchAccountDetails({ payload }) {
  const { id } = payload;
  try {
    const { data } = yield axios.get(`http://localhost:8000/api/v1/account/${id}`);
    yield put(fetchAccountSuccess(data));
  } catch (error) {
    yield put(fetchDashboardError(error.response.data));
  }
}

export function* watchfetchAccountStart() {
  yield takeLatest("accounts/fetchAccountStart", fetchAccountDetails);
}

function* toggleAccountStatus({ payload }) {
  try {
    const { data } = yield axios.post(`http://localhost:8000/api/v1/auth/toggle`, payload);
    yield put(data);
    yield put(toggleAccountSuccess(data));
  } catch (error) {
    yield put(fetchDashboardError(error.response.data));
  }
}

export function* WatchToggleAccountStart() {
  yield takeLatest("accounts/toggleAccountStart", toggleAccountStatus);
}
