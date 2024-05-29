import { createSlice } from "@reduxjs/toolkit";

const InitialBranchState = {
  errorFetching: false,
  error: null,
  fetching: false,
  branch: null,
  branches: null,
  totalPages: 0,
  totalEntries: 0,
};

export const branchSlice = createSlice({
  name: "branches",
  initialState: InitialBranchState,
  reducers: {
    fetchbranchStart: (state) => {
      state.fetching = true;
    },
    fetchAllbranchesStart: (state) => {
      state.fetching = true;
    },
    fetchAllBranchesSuccess: (state, action) => {
      state.fetching = false;
      state.branches = action.payload?.branches;
      state.branch = action.payload?.branch || state.branch;
      state.totalPages = action.payload.totalPages;
      state.totalEntries = action.payload.totalEntries;
    },
    branchOperationError: (state, action) => {
      state.fetching = false;
      state.errorFetching = true;
      state.error = action.payload.messages;
    },
    deletebranchStart: (state) => {
      state.fetching = true;
    },
    deletebranchSuccess: (state) => {
      state.fetching = false;
    },
    updatebranchStart: (state) => {
      state.fetching = true;
    },
    addBranchStart: (state) => {
      state.fetching = true;
    },
    updateBranchStart: (state) => {
      state.fetching = true;
    },
  },
});

export const {
  fetchbranchStart,
  fetchAllbranchesStart,
  fetchAllBranchesSuccess,
  branchOperationError,
  deletebranchStart,
  deletebranchSuccess,
  updatebranchStart,
  addBranchStart,
  updateBranchStart,
} = branchSlice.actions;
export default branchSlice.reducer;
