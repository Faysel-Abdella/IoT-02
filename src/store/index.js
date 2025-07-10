import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import authReducer from "./reducer/reducer";
import formReducer from "../lib/features/form/formSlice"; // Adjust path if needed

const PERSISTED_KEYS = ["reducer"];

const store = () =>
  configureStore({
    reducer: {
      authReducer,
      form: formReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(
        // Use save middleware only on the client side
        typeof window !== "undefined"
          ? save({ states: PERSISTED_KEYS, debounce: 1000 })
          : () => (next) => (action) => next(action)
      ),
    // Handle preloaded state only on the client side
    preloadedState:
      typeof window !== "undefined" ? load({ states: PERSISTED_KEYS }) : {},
  });

export { store };
