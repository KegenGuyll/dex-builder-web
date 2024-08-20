import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { FindNetWorthBySetIdResponse } from "@/types/endpoints/owned"

export default async function findUserNetWorth(username:string): Promise<FindNetWorthBySetIdResponse | GenericDexBuilderError> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}/net-worth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    'cache': 'no-cache',
  })

  const data = await response.json()

  return data
}