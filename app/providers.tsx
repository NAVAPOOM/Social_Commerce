// app/providers.tsx
"use client";
import React from "react";
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { I18nextProvider } from 'react-i18next';
import { store } from '@/redux/store';
import { ThemeProviderProps } from "next-themes/dist/types";
import i18n from '@/utils/i18n';
import { useRouter } from 'next/navigation';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider defaultTheme="dark" attribute="class" {...themeProps}>
            <I18nextProvider i18n={i18n}>
              {children}
            </I18nextProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}