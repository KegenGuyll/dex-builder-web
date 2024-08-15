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
  data: TCGCard[]
  page: number
  pageSize: number
  totalCount: number
}

type TCGError = {
  error: {
    message: string
    code: number
  }
}

const tcgCardSearch = async (query: TCGCardQuery): Promise<TCGSearchResponse | null | TCGError> => {
  if(!query.q) return null;

  const url = `${TCG.baseURL}/cards?q=name:${query.q}*&pageSize=12&page=${query.page || 1}`
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data 
}

export default tcgCardSearch