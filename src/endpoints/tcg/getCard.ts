import { TCG } from "@/contants"
import { TCGCard } from "@/types/endpoints/tcg/card"
import { TCGSearchResponse } from "./search"

type TCGCardQuery = {
  q: string | undefined
  page?: number
  pageSize?: number
  orderBy?: string
  select?: string
}

type TCGSingleCard = {
  data: TCGCard
}

type TCGError = {
  error: {
    message: string
    code: number
  }
}

const getTCGCard = async (id: string): Promise<TCGSingleCard | null | TCGError> => {
  const url = `${TCG.baseURL}/cards/${id}`
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data 
}

const getTCGCardBySetId = async (id: string): Promise<TCGSearchResponse | null | TCGError> => {
  const url = `${TCG.baseURL}/cards/?q=set.id:${id}&select=id,name,images,cardmarket,supertype,rarity,types`
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any,
  })

  const data = await response.json()

  return data
}

export {
  getTCGCard,
  getTCGCardBySetId
}

export default getTCGCard