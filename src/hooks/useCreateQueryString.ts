import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useCreateQueryString = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const createTCGQueryString = useCallback(() => {
    let tcgQuery = ''

    searchParams.forEach((value, key) => {
      tcgQuery += `${key}:${value} `
    })

    return tcgQuery
  }, [searchParams])

  const createQueryStringFromMany = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value)
    })
    return searchParams.toString()
  }, [])

  const deleteQueryString = useCallback((name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)

    return params.toString()
  }, [searchParams]) 

  return {
    createQueryString,
    createQueryStringFromMany,
    createTCGQueryString,
    deleteQueryString
  }
};

export default useCreateQueryString;