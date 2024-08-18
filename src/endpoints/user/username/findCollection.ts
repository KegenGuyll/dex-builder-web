import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { BasicUserOwnedResponse } from "@/types/endpoints/owned"

export default async function findUserCollection(username: string): Promise<BasicUserOwnedResponse[] | null | GenericDexBuilderError> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}/collection`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return data
}