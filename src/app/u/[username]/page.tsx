'use client';

import { useAuth } from "@/context/AuthContext";
import { Button } from "@nextui-org/button";
import dayjs from "dayjs";
import { redirect, useRouter } from "next/navigation";


const UserProfilePage = () => {
  const {user} = useAuth();
  const router = useRouter();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1>Welcome back {user.username}!</h1>
      <span>existing user since {dayjs(user.createdAt).format('MMMM DD, YYYY')}</span>
      <div>
        <Button onClick={() => router.push('/logout')} >Logout</Button>
      </div>
    </div>
  )
};

export default UserProfilePage;