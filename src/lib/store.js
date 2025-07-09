import { configureStore } from "@reduxjs/toolkit";
// 1. Make sure this import is correct and that the path leads to your formSlice file.
import formReducer from "./features/form/formSlice";

export const makeStore = () => {
  return configureStore({
    // 2. THIS IS THE MOST CRITICAL PART.
    // The "reducer" object MUST have a key named "form" that points to your formReducer.
    reducer: {
      form: formReducer,
    },
  });
};
