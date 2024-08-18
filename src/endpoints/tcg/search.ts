import { TCG } from "@/contants"
import { TCGCard } from "@/types/endpoints/tcg/card"
import { TCGSearchSetResponse, TCGSearchSetsQuery } from "@/types/endpoints/tcg/set"

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

const tcgCardSearch = async (query: TCGCardQuery, customQuery?: string, signal?: AbortSignal): Promise<TCGSearchResponse | null | TCGError> => {
  if(!query.q && !customQuery) return null;

  let url = `${TCG.baseURL}/cards`

  if(!customQuery) {
    url = `${url}?q=name:${query.q}*&pageSize=100&page=${query.page || 1}&select=name,id,images`
  } else {
    url = `${url}${customQuery}`
  }

  const response = await fetch(url, {
    signal,
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data 
}

const tcgSetSearch = async (query: TCGSearchSetsQuery): Promise<TCGSearchSetResponse | null | TCGError> => {
  if(!query.q) return null;

  const url = `${TCG.baseURL}/sets?q=name:${query.q}*&pageSize=12&page=${query.page || 1}`

  console.log('url', url)

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data
}

export type {
  TCGCardQuery,
  TCGSearchResponse,
  TCGError
}

export {
  tcgCardSearch,
  tcgSetSearch
}

export default tcgCardSearch