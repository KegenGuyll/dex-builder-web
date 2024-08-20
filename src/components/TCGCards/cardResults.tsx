import TCGCard from "."
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"

type CardResultsProps = {
  searchParams: {
    [key: string]: string
  }
}

const createTCGQuery = (searchParams: {[key: string]: string}) => {
  let tcgQuery = ''

  Object.keys(searchParams).forEach((key) => {
    if (!searchParams[key]) return

    // trim whitespace before and after
    searchParams[key] = searchParams[key].trim()

    // if there is a comma, add parentheses and replace comma with OR with key value in between
    if(searchParams[key].includes(',')) {
      const values = searchParams[key].split(',')

      values.forEach((value, index) => {
        if(index === 0) tcgQuery += '('
        
        if(value.includes(' ')) {
          tcgQuery += `${key}:"${value}" OR `
        } else {
          tcgQuery += `${key}:${value} OR `
        }

        // if last value, remove OR and add ending parentheses
        if(index === values.length - 1) {
          tcgQuery = tcgQuery.slice(0, -4)
          tcgQuery += ') '
        }
      })

      return
    }

    // if space between words, add quotes
    if(searchParams[key].includes(' ')) {
      tcgQuery += `${key}:"${searchParams[key]}" `
      return
    }

    tcgQuery += `${key}:${searchParams[key]} `
  })

  return tcgQuery
}

const CardResults: React.FC<CardResultsProps> = async ({ searchParams }: CardResultsProps) => {

  const query = createTCGQuery(searchParams)

  const cardSearchResults = await PokemonTCG.findCardsByQueries({ q: query, orderBy: '-set.releaseDate' })

  if(!cardSearchResults.length) {
    return (
      <div>
        <h1>No results found</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {cardSearchResults.map((card) => (
          <TCGCard
            href={`/card/${card.id}`}
            key={card.id}
            cardName={card.name}
            src={card.images.small}
          />
        ))}
      </div>
    </div>
  )
}

export default CardResults