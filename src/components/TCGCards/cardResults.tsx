import tcgCardSearch from "@/endpoints/tcg/search"
import TCGCard from "."
import CardPagination from "./pagination"
import { SearchParams } from "@/app/search/page"

type CardResultsProps = {
  searchParams: SearchParams
}

const CardResults: React.FC<CardResultsProps> = async ({ searchParams }: CardResultsProps) => {

  const { q, page} = searchParams

  const queryPayload = {
    q,
    page: Number(page) || 1
  }

  const cardSearchResults = await tcgCardSearch(queryPayload)


  if(!cardSearchResults || 'error' in cardSearchResults) return null

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {cardSearchResults?.data.map((card) => (
          <TCGCard
            href={`/card/${card.id}`}
            key={card.id}
            cardName={card.name}
            src={card.images.small}
          />
        ))}
      </div>
      {cardSearchResults && (
        <div className="w-full flex justify-center">
         <CardPagination totalResults={Math.ceil(cardSearchResults?.totalCount / 100)} />
        </div>
      )}
    </div>
  )
}

export default CardResults