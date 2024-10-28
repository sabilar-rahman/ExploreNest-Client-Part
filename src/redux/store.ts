import { configureStore } from "@reduxjs/toolkit";

//  import registerReducer from "./api/auth/registerSlice";

import authSlice from "./featureApi/auth/authSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

// Fallback storage if localStorage is not available
// const createNoopStorage = () => ({
//   getItem(_key: string) {
//     return Promise.resolve(null);
//   },
//   setItem(_key: string, _value: any) {
//     return Promise.resolve();
//   },
//   removeItem(_key: string) {
//     return Promise.resolve();
//   },
// });

const persistConfig = {
  key: "auth",
    storage,
  // storage: typeof window !== "undefined" ? storage : createNoopStorage(),
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,

    // register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
