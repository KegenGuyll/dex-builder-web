import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { CreateOwnedBody, FindOneOwnedResponse } from "@/types/endpoints/owned"

export default async function createOwned(payload: CreateOwnedBody, authToken?: string | null): 
  Promise<FindOneOwnedResponse | null | GenericDexBuilderError> {
    if(!authToken) return null

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/`, {
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