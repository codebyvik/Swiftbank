import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchSignUpUserStart,
  watchSignoutUserStart,
} from "./auth/auth.saga";
import { WatchUpdateUserStart } from "./user/user.saga";
import {
  WatchToggleAccountStart,
  watchFetchAllAccounts,
  watchFetchDashboardStart,
  watchfetchAccountStart,
} from "./accounts/account.saga";
import { watchFetchTransactionStart } from "./transactions/transactions.saga";
import {
  WatchAddBranchStart,
  WatchDeletebranchStart,
  WatchFetchbranchStart,
  WatchUpdateBranchStart,
  watchFetchAllbranchesStart,
} from "./branches/branches.saga";

export default function* rootSaga() {
  yield all([
    currentUser(),
    signinUser(),
    watchSignUpUserStart(),
    watchSignoutUserStart(),
    WatchUpdateUserStart(),
    watchFetchDashboardStart(),
    watchFetchTransactionStart(),
    watchFetchAllAccounts(),
    watchfetchAccountStart(),
    WatchToggleAccountStart(),
    watchFetchAllbranchesStart(),
    WatchFetchbranchStart(),
    WatchDeletebranchStart(),
    WatchAddBranchStart(),
    WatchUpdateBranchStart(),
  ]);

  // code after all-effect
}
