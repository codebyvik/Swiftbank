import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: null,
  loading: false,
  error: false,
  errorMsg: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.pending = false;
      state.isAuthenticated = true;
      state.errorMsg = null;
    },
    fetchUserError: (state, action) => {
      state.errorMsg = action.payload.message;
      state.loading = false;
      state.error = true;
    },
    SigninUserStart: (state) => {
      state.loading = true;
    },
    SignUpUserStart: (state) => {
      state.loading = true;
    },
    SignoutUserStart: (state) => {
      state.loading = true;
    },
    SignoutUserSuccess: (state) => {
      return (state = initialUserState);
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
} = userSlice.actions;

export default userSlice.reducer;
