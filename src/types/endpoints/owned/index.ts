import { CardMarketPrices, Images, TCGCard } from "../tcg/card"

type Owned = {
  _id: string
  userId: string
  cardId: string
  count: number
  notes: string
  createdAt: string
  updatedAt: string
  cardDetails: TCGCard
}

type BasicOwnedResponse = {
  _id: string
  userId: string
  cardId: string
  count: number
  notes: string
  createdAt: string
  updatedAt: string
}

/**
 * used when the response search for owned based on username will return all owned cards
 * @typedef {Object} BasicUserOwnedResponse
 *
 */  
type BasicUserOwnedResponse = {
  _id: string
  cardId: string
  cardSupertype: string
  cardRarity: string
  count: number
  cardName: string
  images: Images
}

type FindOneOwnedResponse = Owned;

type CreateOwnedBody = {
  cardId: string
  count: number
  notes: string
}

type UpdateOwnedBody = CreateOwnedBody;

type CreateOwnedResponse = BasicOwnedResponse;

type UpdateOwnedResponse = BasicOwnedResponse;

type DeleteOwnedResponse = BasicOwnedResponse;

type FindAllOwnedResponse = {
  owned: Owned[]
  currentPage: number
  totalCount: number
  totalNumberOfPages: number
}

type FindAllOwnedQuery = {
  pageNumber: number
  pageSize: number
}

type FindBySetId = {
  id: string
  count: number
}

type OwnedNetWorth = {
  cardId: string
  cardName: string
  images: Images
  marketPrice: CardMarketPrices;
  count: number
}

type FindNetWorthBySetIdResponse = {
  totalAveragedNetWorth: number
  cards: OwnedNetWorth[]
}


export type {
  Owned,
  FindOneOwnedResponse,
  CreateOwnedBody,
  CreateOwnedResponse,
  DeleteOwnedResponse,
  UpdateOwnedBody,
  UpdateOwnedResponse,
  FindAllOwnedQuery,
  FindAllOwnedResponse,
  FindBySetId,
  OwnedNetWorth,
  FindNetWorthBySetIdResponse,
  BasicUserOwnedResponse
}