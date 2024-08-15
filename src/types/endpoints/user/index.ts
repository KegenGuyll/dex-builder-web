
type UserRoles = 'USER' | 'ADMIN' | 'DEVELOPER'

type MeResponse = {
  isPublic: boolean
  _id: string
  username: string
  email: string
  uid: string
  role: UserRoles
  photoURL: string
  createdAt: string
  updatedAt: string
}

type UpdateUserPayload = {
  username: string
  email: string
  photoURL: string
  isPublic: boolean
}

type CreateUserPayload = {
  username: string
  email: string
  photoURL: string
  isPublic: boolean
}

export type {
  UserRoles,
  MeResponse,
  UpdateUserPayload,
  CreateUserPayload
}