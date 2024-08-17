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

  const createQueryStringFromMany = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value)
    })
    return searchParams.toString()
  }, [])

  return {
    createQueryString,
    createQueryStringFromMany
  }
};

export default useCreateQueryString;