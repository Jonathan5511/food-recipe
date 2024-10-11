import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import foodReducer from "./food";
import modalReducer from "./modal";

const store = configureStore({
  reducer: { auth: authReducer, food: foodReducer, modal: modalReducer },
});

export default store;
