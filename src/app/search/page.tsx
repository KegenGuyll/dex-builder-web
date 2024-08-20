import CardResults from "@/components/TCGCards/cardResults"
import { Suspense } from "react"
import SearchPageLoading from "./loading"

export type SearchPageProps = {
  searchParams: SearchPageSearchParams
}

export type SearchPageSearchParams = {
  name: string
  superType: string
  page: string
}

export async function generateMetadata({searchParams}: SearchPageProps) { 

  if(!searchParams.name) {
    return {
      title: 'Search Results',
      description: 'Search for your favorite TCG cards'
    }
  }

  return {
    title: `Search Results for ${searchParams.name}`,
    description: `Search Results for ${searchParams.name}`,
  }
}

const SearchPage = async ({searchParams}: SearchPageProps) => {

  const key = JSON.stringify(searchParams)

  return (
    <div className="flex flex-col">
      <Suspense key={key} fallback={<SearchPageLoading/>} >
        <CardResults searchParams={searchParams}  />
      </Suspense>
    </div>
  )
}

export default SearchPage