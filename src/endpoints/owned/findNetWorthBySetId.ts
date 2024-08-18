import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { FindBySetId, FindNetWorthBySetIdResponse } from "@/types/endpoints/owned"

export default async function findNetWorthBySetId(setId: string, authToken?: string): Promise<FindNetWorthBySetIdResponse | null | GenericDexBuilderError> {
  if(!authToken) return null


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/net-worth/${setId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    }
  })

  const data = await response.json()

  return data
}