import { configureStore } from "@reduxjs/toolkit";

import configReducer from "./config.slice";

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export default store;
