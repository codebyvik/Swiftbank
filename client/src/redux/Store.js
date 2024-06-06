import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducers from "./root.reducer";
import rootSaga from "./root.saga";

const env = "production";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    env === "development"
      ? getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: [
              "user/UpdateUserStart",
              "transactions/addTransactionStart",
              "transactions/addMoneyStart",
            ],
            // Ignore these paths in the state
            ignoredPaths: [
              "user/UpdateUserStart",
              "transactions/addTransactionStart",
              "transactions/addMoneyStart",
            ],
          },
        }).concat([sagaMiddleware, logger])
      : getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: [
              "user/UpdateUserStart",
              "transactions/addTransactionStart",
              "transactions/addMoneyStart",
            ],
            // Ignore these paths in the state
            ignoredPaths: [
              "user/UpdateUserStart",
              "transactions/addTransactionStart",
              "transactions/addMoneyStart",
            ],
          },
        }).concat([sagaMiddleware]),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;
