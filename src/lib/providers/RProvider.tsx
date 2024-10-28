"use client";

import { persistor, store } from "@/src/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import persistStore from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const RProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default RProvider;
