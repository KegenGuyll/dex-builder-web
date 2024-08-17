import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { FindBySetId } from "@/types/endpoints/owned"

export default async function findBySetId(setId: string, authToken?: string): Promise<FindBySetId[] | null | GenericDexBuilderError> {
  if(!authToken) return null


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/set/${setId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    cache: 'no-cache',
  })

  const data = await response.json()

  return data
}