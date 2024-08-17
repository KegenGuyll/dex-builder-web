import TCGCard from "@/components/TCGCards";
import findBySetId from "@/endpoints/owned/findBySetId";
import getTokens from "@/util/getTokens";
import { Card, CardBody } from "@nextui-org/card"
import {CircularProgress} from "@nextui-org/progress";
import dayjs from "dayjs"
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getTCGCardBySetId } from "@/endpoints/tcg/getCard";
import { TCGCard as TCGCardType } from "@/types/endpoints/tcg/card";

type SetPageProps = {
  params: {
    setId: string
  }
  searchParams: {
    q?: string
  }
}


export async function generateMetadata({params}: SetPageProps) { 
  const setData = await PokemonTCG.findSetByID(params.setId)

  return {
    title: `${setData.name} Card Set | Pokemon TCG`,
    description: `View all cards in the ${setData.name} set`,
  }
}

const SetPage = async ({params, searchParams}: SetPageProps) => {

  const token = await getTokens()

  const [setData, getCardData, ownedCards] = await Promise.all([
    PokemonTCG.findSetByID(params.setId),
    getTCGCardBySetId(params.setId),
    findBySetId(params.setId, token)
  ])

  const findCardCount = (cardId: string): number => {
    if(!ownedCards || 'error' in ownedCards) return 0

    const card = ownedCards.find(card => card.id === cardId)

    return card?.count || 0
  }

  const totalCount = (): number => {
    if(!ownedCards || 'error' in ownedCards) return 0

    return ownedCards.length;
  }

  const cardData = (): TCGCardType[] | null => {
    if(!getCardData || 'error' in getCardData) return null

    if(searchParams.q) {
      const query = searchParams.q.toLowerCase()

      const filteredData = getCardData.data.filter(card => card.name.toLowerCase().includes(query))

      return filteredData
    }

    return getCardData.data
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-8 mt-4 lg:items-center lg:justify-center w-full">
      <h1 className="text-lg lg:text-3xl font-bold">{setData.name}</h1>
      <Card fullWidth className="max-w-[800px]">
        <CardBody className="flex flex-row items-center">
          <div className="flex-grow">
            <div>
              <h4>Complete Set</h4>
              <small className="text-small text-default-500" >{totalCount()} of {setData.total}</small>
            </div>
            <div>
              <h4>Release Date</h4>
              <small  className="text-small text-default-500">{dayjs(setData.releaseDate).format('MMMM DD, YYYY')}</small>
            </div>
          </div>
          {totalCount() / setData.total * 100 === 100 ? (
            <CircularProgress
              classNames={{
                svg: "w-24 h-24 md:w-36 md:h-36 drop-shadow-md",
                value: "md:text-3xl text-xl font-semibold text-success-900",
              }}
              aria-label="Loading..."
              size="lg"
              value={totalCount() / setData.total * 100}
              color={"success"}
              showValueLabel={true}
            />
          ) : (
            <CircularProgress
              classNames={{
                svg: "w-24 h-24 md:w-36 md:h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "md:text-3xl text-xl font-semibold text-white",
              }}
              aria-label="Loading..."
              size="lg"
              value={totalCount() / setData.total * 100}
              color={"primary"}
              showValueLabel={true}
            />
          )}

        </CardBody>
      </Card>
      {cardData() !== null && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {(cardData() as TCGCardType[]).map((card) => (
            <div className="relative" key={card.id} >
              <TCGCard 
                href={`/card/${card.id}`} 
                src={card.images.large} 
                cardName={card.name} 
              />
              {findCardCount(card.id) > 0 && (
                <div className="h-8 w-8 bg-default p-3 rounded-full flex justify-center items-center absolute z-30 left-0 right-0 top-1/2 bottom-1/2 mx-auto">
                  <FontAwesomeIcon size="lg" icon={faCheck} />
                </div>
              )}
              {findCardCount(card.id) > 1 && (
                <div className="h-6 w-6 bg-default p-3 rounded-full flex justify-center items-center absolute z-30 right-4 top-1">
                  <span className="text-white text-xs">{findCardCount(card.id)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SetPage