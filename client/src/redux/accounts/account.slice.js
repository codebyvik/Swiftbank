import { createSlice } from "@reduxjs/toolkit";

const InitialAccountState = {
  errorFetching: false,
  error: null,
  fetching: false,
  account: null,
  accounts: null,
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState: InitialAccountState,
  reducers: {
    fetchAccountStart: (state) => {
      state.fetching = true;
    },
    fetchDashboardStart: (state) => {
      state.fetching = true;
    },
    fetchdashboardSuccess: (state, action) => {
      state.fetching = false;
      state.accounts = action.payload?.accounts;
      state.account = action.payload?.account;
    },
    fetchDashboardError: (state, action) => {
      state.fetching = false;
      state.errorFetching = true;
      state.error = action.payload.messages;
    },
    fetchAccountError: (state, action) => {
      state.fetching = false;
      state.errorFetching = true;
      state.error = action.payload.messages;
    },
    fetchAllAccounts: (state, action) => {
      state.fetching = true;
      state.accounts = action.payload.accounts;
    },
    fetchAccountSuccess: (state, action) => {
      state.fetching = false;
      state.account = action.payload.account;
    },
    fetchAllAccountsSuccess: (state, action) => {
      state.fetching = false;
      state.accounts = action.payload.accounts;
    },
  },
});

export const {
  fetchAccountStart,
  fetchAccountError,
  fetchAllAccounts,
  fetchAccountSuccess,
  fetchAllAccountsSuccess,
  fetchDashboardStart,
  fetchdashboardSuccess,
  fetchDashboardError,
} = accountSlice.actions;
export default accountSlice.reducer;
