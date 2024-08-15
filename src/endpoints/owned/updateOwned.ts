import { GenericDexBuilderError } from "@/types/endpoints/generic"
import {  UpdateOwnedBody } from "@/types/endpoints/owned"

export default async function updateOwned(payload: UpdateOwnedBody, authToken?: string | null): 
  Promise<UpdateOwnedBody | null | GenericDexBuilderError> {
    if(!authToken) return null

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      },
    })

    const data = await response.json()

    return data
}