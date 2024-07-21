import { configureStore } from "@reduxjs/toolkit";
import searchProblemReducer from "./slices/searchProblemSlice";
import { userSlice } from "./slices/UserSlice";
import { scheduleSlice } from "./slices/scheduleSlice";

export const store = configureStore({
  reducer: {
    searchProblem: searchProblemReducer,
    user:userSlice.reducer,
    schedule: scheduleSlice.reducer
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
