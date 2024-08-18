'use client'

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";


export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // this is a hack to refresh the cookies
  useEffect(() => {
    router.refresh()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-xl mb-4">Super secure home page</h1>
      <p>
        Only <strong>{user?.email}</strong> holds the magic key to this kingdom!
      </p>
      <Button>Press Me</Button>
    </main>
  );
}