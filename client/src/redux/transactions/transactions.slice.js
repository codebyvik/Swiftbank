import { createSlice } from "@reduxjs/toolkit";

const InititaltransactionState = {
  fetching: false,
  errorFetching: false,
  error: null,
  transaction: null,
  transactions: null,
  totalPages: 0,
  totalEntries: 0,
  totalTransactions: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: InititaltransactionState,
  reducers: {
    fetchTransactionStart: (state) => {
      state.fetching = true;
    },
    fetchTransactionError: (state, action) => {
      state.fetching = false;
      state.errorFetching = true;
      state.error = action.payload.message;
    },
    fetchTransactionsSuccessfull: (state, action) => {
      state.fetching = false;
      state.transaction = action?.payload?.transaction;
      state.transactions = action?.payload?.transactions;
      state.totalPages = action?.payload?.totalPages;
      state.totalEntries = action?.payload?.totalEntries;
    },
    addTransactionStart: (state) => {
      state.fetching = true;
    },
    addMoneyStart: (state) => {
      state.fetching = true;
    },
  },
});

export const {
  fetchTransactionStart,
  fetchTransactionError,
  fetchTransactionsSuccessfull,
  addTransactionStart,
  addMoneyStart,
} = transactionSlice.actions;

export default transactionSlice.reducer;
