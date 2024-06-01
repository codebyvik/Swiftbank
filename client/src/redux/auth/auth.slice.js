import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: null,
  loading: false,
  error: false,
  errorMsg: null,
  isAuthenticated: false,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.status = "fetching";
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.errorMsg = null;
      state.status = "processed";
    },
    fetchUserError: (state, action) => {
      state.errorMsg = action?.payload?.message;
      state.loading = false;
      state.error = true;
      state.status = "processed";
    },
    SigninUserStart: (state) => {
      state.loading = true;
      state.status = "fetching";
    },
    SignUpUserStart: (state) => {
      state.loading = true;
    },
    SignoutUserStart: (state) => {
      state.loading = true;
    },
    SignoutUserSuccess: (state) => {
      state = initialUserState;
    },
    UpdateUserStart: (state) => {
      state.loading = true;
    },
    sendresetLink: (state) => {
      return (state = initialUserState);
    },
    resetpassword: (state) => {
      return (state = initialUserState);
    },
    resetPIN: (state) => {
      return state;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  SigninUserStart,
  SignUpUserStart,
  SignoutUserStart,
  SignoutUserSuccess,
  UpdateUserStart,
  sendresetLink,
  resetpassword,
  resetPIN,
} = userSlice.actions;

export default userSlice.reducer;
