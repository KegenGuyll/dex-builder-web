import { TCG } from "@/contants"
import { TCGCard } from "@/types/endpoints/tcg/card"

type TCGCardQuery = {
  q: string | undefined
  page?: number
  pageSize?: number
  orderBy?: string
  select?: string
}

type TCGSearchResponse = {
  data: TCGCard
}

type TCGError = {
  error: {
    message: string
    code: number
  }
}

const getTCGCard = async (id: string): Promise<TCGSearchResponse | null | TCGError> => {
  const url = `${TCG.baseURL}/cards/${id}`
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data 
}

export default getTCGCard