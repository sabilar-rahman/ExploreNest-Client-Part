"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { persistor, store } from "@/src/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

//   let persistor = persistStore(store);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>

    // ------------ REDUX STORE ----------------
    // <Provider store={store}>
    //   <NextUIProvider navigate={router.push}>
    //     <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    //     <Toaster richColors />
    //   </NextUIProvider>
    // </Provider>

    // <Provider store={store}>
    //   <NextUIProvider navigate={router.push}>
    //     <PersistGate loading={null} persistor={persistor}>
    //       <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    //       <Toaster richColors />
    //     </PersistGate>
    //   </NextUIProvider>
    // </Provider>
  );
}
