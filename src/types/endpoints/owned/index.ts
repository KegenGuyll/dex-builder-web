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


export type {
  Owned,
  FindOneOwnedResponse,
  CreateOwnedBody,
  CreateOwnedResponse,
  DeleteOwnedResponse,
  UpdateOwnedBody,
  UpdateOwnedResponse
}