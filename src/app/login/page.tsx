"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteUser, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import suggestUsername from "@/endpoints/user/username/suggestUsername";
import isUsernameAvailable from "@/endpoints/user/username/doesUsernameExist";

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
      router.refresh()
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(getAuth(app), provider);
      const idToken = await credential.user.getIdToken();

      // if value is false, then user exist in the database and should be logged in
      const user = await isUsernameAvailable(credential.user.displayName);

      if(!user.isUsernameAvailable) {
        const newToken = await credential.user.getIdToken(true)

        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });


      } else {
        const {username} = await suggestUsername(credential.user.email || "test");

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": idToken,
          },
          body: JSON.stringify({ role: "USER", username, isPublic: true }),
        })

        const newToken = await credential.user.getIdToken(true)

        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
      }

      router.refresh()
      router.replace("/");
    } catch (error) {
      const currentUser = getAuth(app).currentUser;

      if (currentUser) {
        await deleteUser(currentUser);
      }

      console.error(error);
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
            <Button onClick={handleGoogleLogin} className="bg-white text-black" fullWidth >
              <Image src="/assets/google.png" alt="Google Logo" width={24} height={24} />
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