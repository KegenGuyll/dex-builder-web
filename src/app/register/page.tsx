"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      const {user} = await createUserWithEmailAndPassword(getAuth(app), email, password);

      const authToken = await user.getIdToken();

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": authToken,
        },
        body: JSON.stringify({ role: "USER", username }),
      })
      router.push("/login");
    } catch (e) {
      const currentUser = getAuth(app).currentUser;

      if (currentUser) {
        await deleteUser(currentUser);
      }

      setError((e as Error).message);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-[300px] md:max-w-[320px] lg:max-w-96">
        <CardHeader>
          <h4>Create an Account</h4>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <Input
              label="Username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
            <Input
              label="Confirm password"
              placeholder="••••••••"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              required
              type="password"
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
              Create an account
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}