import { DEX_BUILDER_API } from "@/contants"

type IsUsernameAvailableResponse = {
  isUsernameAvailable: boolean;
}

const isUsernameAvailable = async (username?: string | null): Promise<IsUsernameAvailableResponse> => {
  if(!username) {
    throw new Error("Username is required");
  }

  const response = await fetch(`${DEX_BUILDER_API.baseURL}/user/username/${username}/exists`);

  if (!response.ok) {
    throw new Error("Failed to suggest username");
  }

  return await response.json();
}

export default isUsernameAvailable;