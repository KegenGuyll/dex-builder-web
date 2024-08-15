import { MeResponse } from '@/types/endpoints/user'

export default async function getMe(authToken: string): Promise<MeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })

  const data = await response.json()

  return data
}