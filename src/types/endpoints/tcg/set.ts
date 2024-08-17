import { Legalities } from "./card"

type TCGSet = {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  legalities: Legalities
  ptcgoCode: string
  releaseDate: string
  updatedAt: string
  images: SetImages
}

type SetImages = {
  symbol: string
  logo: string
}

type TCGSearchSetResponse = {
  data: TCGSet[]
  page: number
  pageSize: number
  count: number
  totalCount: number
}

type TCGSearchSetsQuery = {
  q: string | undefined
  page?: number
  pageSize?: number
  orderBy?: string
  select?: string
}

export type {
  TCGSet,
  TCGSearchSetResponse,
  TCGSearchSetsQuery,
  SetImages,
}