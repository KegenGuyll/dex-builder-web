"use client";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { AuthProvider } from './context/AuthProvider';
import { User } from './context/AuthContext';

export function Providers({children, user}: { children: React.ReactNode, user: User | null}) {
  return (
    <AuthProvider user={user}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}