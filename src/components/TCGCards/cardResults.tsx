import tcgCardSearch from "@/endpoints/tcg/search"
import TCGCard from "."
import CardPagination from "./pagination"
import { SearchParams } from "@/app/search/page"

type CardResultsProps = {
  searchParams: SearchParams
}

const CardResults: React.FC<CardResultsProps> = async ({ searchParams }: CardResultsProps) => {

  const queryPayload = {
    q: searchParams.q,
    page: Number(searchParams.page) || 1
  }

  const searchResults = await tcgCardSearch(queryPayload)

  if(!searchResults || 'error' in searchResults) return null

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {searchResults?.data.map((card) => (
          <TCGCard
            href={`/card/${card.id}`}
            key={card.id}
            cardName={card.name}
            src={card.images.small}
          />
        ))}
      </div>
      {searchResults && (
        <div className="w-full flex justify-center">
         <CardPagination totalResults={Math.ceil(searchResults?.totalCount / 12)} />
        </div>
      )}
    </div>
  )
}

export default CardResults