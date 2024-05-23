import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    mode: "light",
  },
  reducers: {
    toggleDarkMode: (state) => {
      if (state.mode === "light") {
        state.mode = "dark";
      } else {
        state.mode = "light";
      }
    },
  },
});

export const { toggleDarkMode } = configSlice.actions;
export default configSlice.reducer;
