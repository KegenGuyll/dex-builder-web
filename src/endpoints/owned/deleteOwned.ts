import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { DeleteOwnedResponse } from "@/types/endpoints/owned"

export default async function deleteOwned(cardId: string, authToken?: string | null): Promise<DeleteOwnedResponse | null | GenericDexBuilderError> {
  if(!authToken) return null


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })

  const data = await response.json()

  return data
}