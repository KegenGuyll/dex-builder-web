'use client'

import { useAuth } from "@/context/AuthContext"
import createOwned from "@/endpoints/owned/createOwned"
import deleteOwned from "@/endpoints/owned/deleteOwned"
import updateOwned from "@/endpoints/owned/updateOwned"
import { Button, ButtonGroup } from "@nextui-org/button"
import { useCallback, useMemo, useState } from "react"

type GroupButtonOwnedProps = {
  cardId: string
  count: number
  isOwned: boolean
  notes: string | null
  size?: "sm" | "md" | "lg" | undefined
}

const GroupButtonOwned: React.FC<GroupButtonOwnedProps> = ({ isOwned, count, cardId, notes, size = 'md' }: GroupButtonOwnedProps) => {
  const [cardCount, setCardCount] = useState<number>(count || 0)
  const [localIsOwned, setLocalIsOwned] = useState<boolean>(isOwned)
  const { token } = useAuth()

  const handleButtonText = useMemo(() => {
    if(localIsOwned) {
      if(cardCount === 1) return 'Owned'

      return `Owned (${cardCount})`
    } else if (cardCount > 0 || !localIsOwned) {
      return 'Not Owned'
    }
  }, [localIsOwned, cardCount])


  const handleIncrement = () => {
    setCardCount(cardCount + 1)
    handleUpdateOwned(cardCount + 1)
  }

  const handleDecrement = () => {
    setCardCount(cardCount - 1)
    handleUpdateOwned(cardCount - 1)
  }

  const handleUpdateOwned = useCallback(async (passedCount: number) => {
    await updateOwned({
      cardId,
      count: passedCount,
      notes: notes || ''
    }, token)
    setCardCount(passedCount)
  }, [cardId, notes, token])

  const handleCreateOwned = useCallback(async (passedCount?: number) => {
    if(localIsOwned && !passedCount) {
      await deleteOwned(cardId, token)
      setCardCount(0)
      setLocalIsOwned(false)
    } else {
      await createOwned({
        cardId,
        count: passedCount || cardCount || 1,
        notes: ''
      }, token)
      setLocalIsOwned(true)
      setCardCount(passedCount || cardCount || 1)
    }
  }, [cardCount, cardId, token, localIsOwned])


  return (
    <ButtonGroup fullWidth size={size}>
      <Button onClick={handleDecrement} >-</Button>
      <Button onClick={() => handleCreateOwned()}>{handleButtonText}</Button>
      <Button onClick={handleIncrement} >+</Button>
    </ButtonGroup>
  )
}

export default GroupButtonOwned;