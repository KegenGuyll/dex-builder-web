import { MeResponse, UpdateUserPayload } from "@/types/endpoints/user"

export default async function updateUser(authToken: string, payload: UpdateUserPayload): Promise<MeResponse> {
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