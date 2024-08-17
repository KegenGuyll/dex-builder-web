import { TCGCard } from "../tcg/card"

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
}