"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-[300px] md:max-w-[320px] lg:max-w-96">
        <CardHeader>
          <h4>Login</h4>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <Input
              label="Email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Button className="w-full" type="submit" >
              Login
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-500 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}