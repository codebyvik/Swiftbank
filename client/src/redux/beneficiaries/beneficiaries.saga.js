import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  beneficiaryOperationError,
  deleteBeneficiarySuccess,
  fetchAllBeneficiariesSuccess,
} from "./beneficiaries.slice";
import AlertUser from "../../utils/show_alert";

axios.defaults.withCredentials = true;

function* fetchAllBeneficiaries({ payload }) {
  const { page, sort, name } = payload;
  try {
    const { data } = yield axios.get(
      `http://localhost:8000/api/v1/beneficiary/?page=${page}&sort=${sort}&name=${name}`
    );
    yield put(fetchAllBeneficiariesSuccess(data));
  } catch (error) {
    yield put(beneficiaryOperationError(error.response.data));
  }
}

export function* watchFetchAllBeneficiariesStart() {
  yield takeLatest("beneficiaries/fetchAllBeneficiariesStart", fetchAllBeneficiaries);
}

function* fetchBeneficiaryDetails({ payload }) {
  const { id } = payload;
  try {
    const { data } = yield axios.get(`http://localhost:8000/api/v1/beneficiary/${id}`);
    yield put(fetchAllBeneficiariesSuccess(data));
  } catch (error) {
    yield put(beneficiaryOperationError(error.response.data));
  }
}

export function* WatchFetchBeneficiaryStart() {
  yield takeLatest("beneficiaries/fetchBeneficiaryStart", fetchBeneficiaryDetails);
}

function* deleteBeneficiary({ payload }) {
  const { id } = payload;
  try {
    yield axios.get(`http://localhost:8000/api/v1/beneficiary/delete/${id}`);
    yield AlertUser("Beneficiary deleted");
    yield put(deleteBeneficiarySuccess());
    yield window.location.reload();
  } catch (error) {
    yield put(beneficiaryOperationError(error.response.data));
  }
}

export function* WatchDeleteBeneficiaryStart() {
  yield takeLatest("beneficiaries/deleteBeneficiaryStart", deleteBeneficiary);
}

function* updateBeneficiary({ payload }) {
  const { id, updatedField } = payload;
  try {
    const { data } = yield axios.post(
      `http://localhost:8000/api/v1/beneficiary/update/${id}`,
      updatedField
    );
    yield;
    yield AlertUser("Beneficiary Updated", "success");
    yield put(fetchAllBeneficiariesSuccess(data));
  } catch (error) {
    yield AlertUser(error.response.data.message, "error");
    yield put(beneficiaryOperationError(error.response.data));
  }
}

export function* WatchUpdateBeneficiaryStart() {
  yield takeLatest("beneficiaries/updateBeneficiaryStart", updateBeneficiary);
}

function* addBeneficiary({ payload }) {
  try {
    const { data } = yield axios.post(`http://localhost:8000/api/v1/beneficiary/add`, payload);
    yield;
    yield AlertUser("beneficiary updated", "success");
    yield put(fetchAllBeneficiariesSuccess(data));
  } catch (error) {
    yield AlertUser(error.response.data.message, "error");
    yield put(beneficiaryOperationError(error.response.data));
  }
}

export function* WatchAddBeneficiaryStart() {
  yield takeLatest("beneficiaries/addBeneficiaryStart", addBeneficiary);
}
