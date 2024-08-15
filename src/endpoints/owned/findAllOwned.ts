import { GenericDexBuilderError } from "@/types/endpoints/generic"
import { FindAllOwnedQuery, FindAllOwnedResponse } from "@/types/endpoints/owned"

export default async function findAllOwned(query: FindAllOwnedQuery, authToken?: string): Promise<FindAllOwnedResponse | null | GenericDexBuilderError> {
  if(!authToken) return null


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owned/?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })

  const data = await response.json()

  return data
}