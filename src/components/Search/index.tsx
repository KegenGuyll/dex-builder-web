'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useState } from 'react'
 
export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState('')

  const searchQuery = searchParams.get('q')

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

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

    router.push(`${pathname}?${createQueryString('q', searchValue)}&page=1`)
  }, [searchValue, router, pathname, createQueryString, deleteQueryString])

  const handleClearSearch = () => {
    setSearchValue('')
    
    deleteQueryString('q')
    router.push(pathname)
  }
 
  return (
    <form className='flex w-full justify-center' onSubmit={handleOnSubmit}>
      <div className="p-4 md:p-8 flex items-center gap-4 w-full max-w-[800px]">
        <Input 
          isClearable
          onClear={handleClearSearch}
          value={searchValue} 
          onChange={(e) => setSearchValue(e.currentTarget.value)}  
          placeholder="Search for cards..." 
          variant="bordered" 
        />
        <Button type='submit'>Search</Button>
      </div> 
    </form>
  )
}