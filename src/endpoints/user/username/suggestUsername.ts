import { DEX_BUILDER_API } from "@/contants"

type SuggestUsernameResponse = {
  username: string;
}

const suggestUsername = async (email?: string): Promise<SuggestUsernameResponse> => {
  
  const response = await fetch(`${DEX_BUILDER_API.baseURL}/user/username/${email}/suggest`);

  if (!response.ok) {
    throw new Error("Failed to suggest username");
  }

  return await response.json();
}

export default suggestUsername;