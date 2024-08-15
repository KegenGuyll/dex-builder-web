import CardResults from "@/components/TCGCards/cardResults"
import { Suspense } from "react"
import SearchPageLoading from "./loading"

export type SearchPageProps = {
  params: {
    slug: string
  }
  searchParams: SearchParams
}

export type SearchParams = {
  q: string | undefined
  page: string | undefined
}

export async function generateMetadata({searchParams}: SearchPageProps) { 

  if(!searchParams.q) {
    return {
      title: 'Search Results',
      description: 'Search for your favorite TCG cards'
    }
  }

  return {
    title: `Search Results for ${searchParams.q}`,
    description: `Search Results for ${searchParams.q}`,
  }
}

const SearchPage = async ({searchParams}: SearchPageProps) => {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<SearchPageLoading/>}>
        <CardResults searchParams={searchParams}  />
      </Suspense>
    </div>
  )
}

export default SearchPage