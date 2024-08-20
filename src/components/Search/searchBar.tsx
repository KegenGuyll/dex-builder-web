'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import useCreateQueryString from '@/hooks/useCreateQueryString'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchParams from './searchParams'
 
type SearchBarProps = {
  placeholder?: string
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { createQueryString, deleteQueryString } = useCreateQueryString()

  const [searchValue, setSearchValue] = useState('')

  const searchQuery = useMemo(() => searchParams.get('name'), [searchParams])

  useEffect(() => {
    setSearchValue(searchQuery || '')
  }, [])

  const handleOnSubmit = useCallback((e?: FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault()

    if(!searchValue) {
      deleteQueryString('name')
      return router.push(pathname)
    }


    const params = createQueryString('name', searchValue)

    router.push(`${pathname}?${params}`)
  }, [searchValue, createQueryString, router, pathname, deleteQueryString])

  const handleClearSearch = () => {
    setSearchValue('')
    
    deleteQueryString('name')
    router.push(pathname)
  }

  return (
    <form className='flex w-full justify-center flex-col items-center' onSubmit={handleOnSubmit}>
      <div className="pt-4 pb-2 flex items-center gap-4 w-full max-w-[800px]">
        <Input 
          autoCapitalize='off'
          autoCorrect='off'
          startContent={<FontAwesomeIcon icon={faSearch} />}
          isClearable
          onClear={handleClearSearch}
          value={searchValue} 
          onChange={(e) => setSearchValue(e.currentTarget.value)}  
          placeholder={placeholder || `Search for cards...` }
          variant="bordered" 
        />
        <Button type='submit'>Search</Button>
      </div>
      <SearchParams/>
    </form>
  )
}