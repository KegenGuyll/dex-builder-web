"use client";

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"
import { app } from "@/firebase";

import { useCallback, useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  const logout =  useCallback(async () => {
    try {
      await signOut(getAuth(app));

      await fetch("/api/logout");

      router.push('/login')
    } catch (error) {
      console.error('An error occurred while logging out', error) 
    }
  }, [router])

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <div className="p-8">
      <h1>You have successfully Logout</h1>
      <span>you will be redirect back to the login page</span>
    </div>
  )
}

export default LogoutPage;