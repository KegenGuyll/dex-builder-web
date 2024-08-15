'use client'

import { faNoteSticky, faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useRef, useState } from "react"
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/context/AuthContext";
import updateOwned from "@/endpoints/owned/updateOwned";

type AddNotesProps = {
  cardId: string
  cardName: string
  cardCount?: number
  prePopulatedNotes?: string
}

const AddNotes: React.FC<AddNotesProps> = ({ cardId, cardName, prePopulatedNotes, cardCount }: AddNotesProps) => {
  const [notes, setNotes] = useState<string>(prePopulatedNotes || '')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { token } = useAuth()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleToggleEditing = () => {
    if(isEditing) {
      textAreaRef.current?.focus()
      window.scrollTo({
        top: textAreaRef.current?.offsetTop,
        behavior: 'smooth'
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      
      await updateOwned({
        cardId,
        count: cardCount || 1,
        notes 
      }, token) 

      setIsEditing(false)
    } catch (error) {
      alert('An error occurred while saving your notes')
    }
  }, [cardId, cardCount, notes, token])

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="font-semibold" >Notes</h2>
      <button 
        onClick={handleToggleEditing} 
        className="bg-default bg-opacity-20 rounded py-3 px-4 flex flex-row gap-4 items-center text-start"
        >
          <FontAwesomeIcon color="#9ca3af" icon={faNoteSticky} className="fa-fw" />
          <span className="text-sm flex-grow">{prePopulatedNotes ? 'Update Note' :  'Add Note'}</span>
          <FontAwesomeIcon icon={faAdd} className="fa-fw" />
      </button>
      {isEditing && (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
          <Textarea
            ref={textAreaRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            label="Notes"
            placeholder={`Add a note for ${cardName}`}
          />
          <Button fullWidth type="submit">Save</Button>
        </form>
      )}
    </div>
  )
}

export default AddNotes;