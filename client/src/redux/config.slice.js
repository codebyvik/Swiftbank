import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    mode: "light",
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      if (action.payload) {
        state.mode = action.payload;
      } else {
        if (state.mode === "light") {
          state.mode = "dark";
          localStorage.setItem("mode", "dark");
        } else {
          state.mode = "light";
          localStorage.setItem("mode", "light");
        }
      }
    },
  },
});

export const { toggleDarkMode } = configSlice.actions;
export default configSlice.reducer;
