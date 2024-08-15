"use client";

import { Next13ProgressBar } from 'next13-progressbar';;
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { AuthProvider } from './context/AuthProvider';
import { User } from './context/AuthContext';

export function Providers({children, user, token}: { children: React.ReactNode, user: User | null, token: string | null }) {
  return (
    <AuthProvider user={user} token={token}>
      <NextUIProvider>
        <Next13ProgressBar height="4px" color="#FFFFFF" options={{ showSpinner: true }} showOnShallow />
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}