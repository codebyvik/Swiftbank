import { all } from "redux-saga/effects";
import {
  currentUser,
  signinUser,
  watchResetpassword,
  watchSendresetLink,
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
import {
  WatchAddMoneyStart,
  WatchAddTransactionStart,
  watchFetchTransactionStart,
} from "./transactions/transactions.saga";
import {
  WatchAddBranchStart,
  WatchDeletebranchStart,
  WatchFetchbranchStart,
  WatchUpdateBranchStart,
  watchFetchAllbranchesStart,
} from "./branches/branches.saga";
import {
  WatchAddBeneficiaryStart,
  WatchDeleteBeneficiaryStart,
  WatchFetchBeneficiaryStart,
  WatchUpdateBeneficiaryStart,
  watchFetchAllBeneficiariesStart,
} from "./beneficiaries/beneficiaries.saga";

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
    watchFetchAllBeneficiariesStart(),
    WatchAddBeneficiaryStart(),
    WatchFetchBeneficiaryStart(),
    WatchUpdateBeneficiaryStart(),
    WatchDeleteBeneficiaryStart(),
    WatchAddTransactionStart(),
    WatchAddMoneyStart(),
    watchResetpassword(),
    watchSendresetLink(),
  ]);

  // code after all-effect
}
