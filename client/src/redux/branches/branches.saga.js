import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { branchOperationError, fetchAllBranchesSuccess } from "./branches.slice";
import AlertUser from "../../utils/show_alert";

axios.defaults.withCredentials = true;

function* fetchAllbranches({ payload }) {
  const { page, sort, name } = payload;
  try {
    const { data } = yield axios.get(
      `http://localhost:8000/api/v1/branch/?page=${page}&sort=${sort}&name=${name}`
    );
    yield put(fetchAllBranchesSuccess(data));
  } catch (error) {
    yield put(branchOperationError(error.response.data));
  }
}

export function* watchFetchAllbranchesStart() {
  yield takeLatest("branches/fetchAllbranchesStart", fetchAllbranches);
}

function* fetchbranchDetails({ payload }) {
  const { id } = payload;
  try {
    const { data } = yield axios.get(`http://localhost:8000/api/v1/branch/${id}`);
    yield put(fetchAllBranchesSuccess(data));
  } catch (error) {
    yield put(branchOperationError(error.response.data));
  }
}

export function* WatchFetchbranchStart() {
  yield takeLatest("branches/fetchbranchStart", fetchbranchDetails);
}

function* deleteBranch({ payload }) {
  try {
    const { data } = yield axios.post(`http://localhost:8000/api/v1/branch/delete/`, payload);
    yield;
    yield put(fetchAllBranchesSuccess(data));
    yield window.location.replace("http://localhost:3000/branch");
  } catch (error) {
    yield put(branchOperationError(error.response.data));
  }
}

export function* WatchDeletebranchStart() {
  yield takeLatest("branches/deletebranchStart", deleteBranch);
}

function* addBranch({ payload }) {
  try {
    const { data } = yield axios.post(`http://localhost:8000/api/v1/branch/add`, payload);
    yield;
    yield AlertUser("Branch added", "success");
    yield put(fetchAllBranchesSuccess(data));
    yield window.location.replace("http://localhost:3000/branch");
  } catch (error) {
    yield AlertUser(error.response.data.message, "error");
    yield put(branchOperationError(error.response.data));
  }
}

export function* WatchAddBranchStart() {
  yield takeLatest("branches/addBranchStart", addBranch);
}

function* updateBranch({ payload }) {
  const { id, updatedFields } = payload;
  try {
    const { data } = yield axios.post(
      `http://localhost:8000/api/v1/branch/update/${id}`,
      updatedFields
    );
    yield;
    yield AlertUser("Branch updated", "success");
    yield put(fetchAllBranchesSuccess(data));
  } catch (error) {
    yield AlertUser(error.response.data.message, "error");
    yield put(branchOperationError(error.response.data));
  }
}

export function* WatchUpdateBranchStart() {
  yield takeLatest("branches/updateBranchStart", updateBranch);
}
