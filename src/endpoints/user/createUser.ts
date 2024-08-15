import { CreateUserPayload, MeResponse } from "@/types/endpoints/user"

export default async function createUser(authToken: string, payload: CreateUserPayload): Promise<MeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })

  const data = await response.json()

  return data
}