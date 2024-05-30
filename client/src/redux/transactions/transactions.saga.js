import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { fetchTransactionError, fetchTransactionsSuccessfull } from "./transactions.slice";
import AlertUser from "../../utils/show_alert";

axios.defaults.withCredentials = true;

function* fetchTransaction({ payload }) {
  const { page, sort, transactionType } = payload;
  try {
    const { data } = yield axios.get(
      `http://localhost:8000/api/v1/transaction/?page=${page}&sort=${sort}&transactionType=${
        transactionType ? transactionType : ""
      }`
    );

    yield put(fetchTransactionsSuccessfull(data));
  } catch (error) {
    yield put(fetchTransactionError(error.response.data));
  }
}

export function* watchFetchTransactionStart() {
  yield takeLatest("transactions/fetchTransactionStart", fetchTransaction);
}

function* initiateTransaction({ payload }) {
  const { navigate, transactionDetails, currlocation } = payload;
  try {
    const { data } = yield axios.post(
      `http://localhost:8000/api/v1/transaction/send`,
      transactionDetails
    );
    yield put(fetchTransactionsSuccessfull(data));
    yield navigate(`/send-money/success/${data?.newTransaction?.transaction_id}`, {
      state: { fromLocation: currlocation },
    });
  } catch (error) {
    yield AlertUser(error?.response?.data?.message, "error");
    yield put(fetchTransactionError(error.response.data));
  }
}

export function* WatchAddTransactionStart() {
  yield takeLatest("transactions/addTransactionStart", initiateTransaction);
}

function* addMoney({ payload }) {
  const { navigate, addMoneyDetails } = payload;

  try {
    const { data } = yield axios.post(
      `http://localhost:8000/api/v1/transaction/add`,
      addMoneyDetails
    );
    yield AlertUser("Money deposited", "success");
    yield put(fetchTransactionsSuccessfull(data));
    yield navigate(`/send-money/success/${data?.transaction?.transaction_id}`, {
      state: { fromLocation: "/send-money" },
    });
  } catch (error) {
    yield AlertUser(error?.response?.data?.message, "error");
    yield put(fetchTransactionError(error.response.data));
  }
}

export function* WatchAddMoneyStart() {
  yield takeLatest("transactions/addMoneyStart", addMoney);
}
