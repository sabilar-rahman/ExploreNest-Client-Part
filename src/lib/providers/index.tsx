"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { store } from "@/src/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    // <NextUIProvider navigate={router.push}>
    //   <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    // </NextUIProvider>

    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <Toaster richColors />
      </NextUIProvider>
    </Provider>
  );
}
