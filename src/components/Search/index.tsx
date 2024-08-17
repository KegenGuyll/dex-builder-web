'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import useCreateQueryString from '@/hooks/useCreateQueryString'
 
type SearchBarProps = {
  placeholder?: string
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { createQueryStringFromMany } = useCreateQueryString()

  const [searchValue, setSearchValue] = useState('')

  const searchQuery = useMemo(() => searchParams.get('q'), [searchParams])

  const deleteQueryString = useCallback((name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)

    return params.toString()
  }, [searchParams]) 

  useEffect(() => {
    setSearchValue(searchQuery || '')
  }, [])

  const handleOnSubmit = useCallback((e?: FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault()

    if(!searchValue) {
      deleteQueryString('q')
      return router.push(pathname)
    }


    const params = createQueryStringFromMany({
      q: searchValue,
    })

    router.push(`${pathname}?${params}`)
  }, [searchValue, createQueryStringFromMany, router, pathname, deleteQueryString])

  const handleClearSearch = () => {
    setSearchValue('')
    
    deleteQueryString('q')
    router.push(pathname)
  }

  return (
    <form className='flex w-full justify-center flex-col items-center' onSubmit={handleOnSubmit}>
      <div className="px-4 pt-4 pb-2 md:p-8 flex items-center gap-4 w-full max-w-[800px]">
        <Input 
          isClearable
          onClear={handleClearSearch}
          value={searchValue} 
          onChange={(e) => setSearchValue(e.currentTarget.value)}  
          placeholder={placeholder || `Search for cards...` }
          variant="bordered" 
        />
        <Button type='submit'>Search</Button>
      </div> 
    </form>
  )
}