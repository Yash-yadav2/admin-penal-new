import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import winnerReducer from "./winnerSlice";
import companyAccountReducer from "./companyAccountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    transaction: transactionReducer,
    companyAccounts: companyAccountReducer,
    winner: winnerReducer,
  },
});

export default store;
