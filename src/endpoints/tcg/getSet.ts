import { TCG } from "@/contants"
import { TCGSet } from "@/types/endpoints/tcg/set"

type TCGSearchResponse = {
  data: TCGSet
}

type TCGError = {
  error: {
    message: string
    code: number
  }
}

const getTCGSet = async (id: string): Promise<TCGSearchResponse | null | TCGError> => {
  const url = `${TCG.baseURL}/sets/${id}`
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': TCG.apiKey
    } as any
  })

  const data = await response.json()

  return data 
}

export default getTCGSet