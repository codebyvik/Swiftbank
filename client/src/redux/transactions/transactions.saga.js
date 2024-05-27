import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { fetchTransactionError, fetchTransactionsSuccessfull } from "./transactions.slice";

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
