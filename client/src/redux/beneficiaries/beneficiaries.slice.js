import { createSlice } from "@reduxjs/toolkit";

const InitialBeneficiaryState = {
  errorFetching: false,
  error: null,
  fetching: false,
  beneficiary: null,
  beneficiaries: null,
  totalPages: 0,
  totalEntries: 0,
};

export const beneficiarySlice = createSlice({
  name: "beneficiaries",
  initialState: InitialBeneficiaryState,
  reducers: {
    fetchBeneficiaryStart: (state) => {
      state.fetching = true;
    },
    fetchAllBeneficiariesStart: (state) => {
      state.fetching = true;
    },
    fetchAllBeneficiariesSuccess: (state, action) => {
      state.fetching = false;
      state.beneficiaries = action.payload?.beneficiaries;
      state.beneficiary = action.payload?.beneficiary || state.beneficiary;
      state.totalPages = action.payload.totalPages;
      state.totalEntries = action.payload.totalEntries;
    },
    beneficiaryOperationError: (state, action) => {
      state.fetching = false;
      state.errorFetching = true;
      state.error = action.payload.messages;
    },
    deleteBeneficiaryStart: (state) => {
      state.fetching = true;
    },
    deleteBeneficiarySuccess: (state) => {
      state.fetching = false;
    },
    updateBeneficiaryStart: (state) => {
      state.fetching = true;
    },
    addBeneficiaryStart: (state) => {
      state.fetching = true;
    },
  },
});

export const {
  fetchBeneficiaryStart,
  fetchAllBeneficiariesStart,
  fetchAllBeneficiariesSuccess,
  beneficiaryOperationError,
  deleteBeneficiaryStart,
  deleteBeneficiarySuccess,
  updateBeneficiaryStart,
  addBeneficiaryStart,
} = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
