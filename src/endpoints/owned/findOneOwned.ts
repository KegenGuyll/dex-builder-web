import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { FindOneOwnedResponse } from "@/types/endpoints/owned"

export default async function findOneOwned(cardId: string, authToken?: string): Promise<FindOneOwnedResponse | null | GenericDexBuilderError> {
  if(!authToken) return null


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })

  const data = await response.json()

  return data
}