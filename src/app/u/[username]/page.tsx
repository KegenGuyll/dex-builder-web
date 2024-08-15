import getMe from "@/endpoints/user/me";
import getTokens from "@/util/getTokens";
import { redirect } from "next/navigation";


const UserProfilePage = async () => {

  const token = await getTokens();

  if(!token) {
    redirect("/login");
  }

  const me = await getMe(token);

  console.log(me)

  return (
    <div className="p-8">
      <h1>Welcome back {me.username}!</h1>
      <span>since {me.createdAt}</span>
    </div>
  )
};

export default UserProfilePage;