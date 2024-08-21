import TCGCard from "@/components/TCGCards";
import findBySetId from "@/endpoints/owned/findBySetId";
import getTokens from "@/util/getTokens";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getTCGCardBySetId } from "@/endpoints/tcg/getCard";
import { TCGCard as TCGCardType } from "@/types/endpoints/tcg/card";
import ContextCarousel from "@/components/ContextCarousel";
import CompletedSet from "@/components/ContextCards/completedSet";
import MostExpensiveCards from "@/components/ContextCards/mostExpensiveCards";
import CardSupertypeDistribution, { CardSupertypeDistributionData } from "@/components/ContextCards/cardSupertypeDistribution";
import findNetWorthBySetId from "@/endpoints/owned/findNetWorthBySetId";
import MostExpensiveOwned from "@/components/ContextCards/mostExpensiveOwned";
import CardRarityDistribution, { CardRarityDistributionData } from "@/components/ContextCards/cardRarityDistrubution";
import combineRarities from "@/util/combineRarities";

type SetPageProps = {
  params: {
    setId: string
  }
  searchParams: {
    q?: string
  }
}

type DynamicFilterSearchParams = {
  name: string | undefined
  types: string | undefined
  supertype: string | undefined
  rarity: string | undefined
}

const dynamicSetFilter = (data: TCGCardType[], searchParams: DynamicFilterSearchParams): TCGCardType[] => {
  const filterName = (data: TCGCardType[]) => {
    const name = searchParams.name

    if(!name) return data;

    return data.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase())
    })
  }

  const filterTypes = (data: TCGCardType[]) => {
    const types = searchParams.types

    if(!types) return data;

    const typesArray = types.split(',');

    return data.filter((item) => {
      if(!item.types) return false

      return typesArray.every(type => item.types.includes(type))
    });
  }

  const filterSupertype = (data: TCGCardType[]) => {
    const supertype = searchParams.supertype

    if(!supertype) return data;

    const supertypeArray = supertype.split(',').map(type => type.toLowerCase());

    return data.filter((item) => {
      return supertypeArray.some(type => item.supertype.toLowerCase() === type.toLowerCase())
    });
  }

  const filterRarity = (data: TCGCardType[]) => {
    const rarity = searchParams.rarity

    if(!rarity) return data;

    const rarityArray = rarity.split(',').map(type => type.toLowerCase());


    return data.filter((item) => {
      return rarityArray.some(type => item.rarity.toLowerCase() === type.toLowerCase())
    });
  }

  return filterRarity(filterSupertype(filterTypes(filterName(data))));
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

  const [setData, cardDataResponse, ownedCards, netWorth] = await Promise.all([
    PokemonTCG.findSetByID(params.setId),
    getTCGCardBySetId(params.setId),
    findBySetId(params.setId, token),
    findNetWorthBySetId(params.setId, token)
  ])

  const findCardCount = (cardId: string): number => {
    if(!ownedCards || 'error' in ownedCards) return 0

    const card = ownedCards.find(card => card.id === cardId)

    return card?.count || 0
  }

  const getCardData = (): TCGCardType[] => {
    if(!cardDataResponse || 'error' in cardDataResponse) return []

    if(Object.keys(searchParams).length > 0) {
      return dynamicSetFilter(cardDataResponse.data, searchParams as any)
    }


    return cardDataResponse.data
  }


  const totalCount = (): number => {
    const data = getCardData();

    if(!ownedCards || 'error' in ownedCards || !data) return 0

    // find all cards that are owned in data
    const matchedCards = data.filter(card => ownedCards.some(ownedCard => ownedCard.id === card.id))


    return matchedCards.length
  }


  // find the 3 most expensive cards in the set
  const mostExpensiveCards = () => {
    const data = getCardData();

    if(!data) return {
      totalSetPrice: 0,
      cards: []
    }

    const sortedPrices = data.sort((a, b) => (b.cardmarket?.prices?.averageSellPrice || 0) - (a.cardmarket?.prices?.averageSellPrice || 0))
    const totalSetPrice = data.reduce((acc, card) => acc + (card.cardmarket?.prices?.averageSellPrice || 0), 0)

    const formattedPrices = sortedPrices.map(card => ({
      id: card.id,
      name: card.name,
      images: card.images,
      price: card.cardmarket?.prices?.averageSellPrice
    }))

    return {
      totalSetPrice,
      cards: formattedPrices.slice(0, 3)
    }
  }

  const mostExpensiveOwned = () => {
    if(!netWorth || 'error' in netWorth) return {
      totalSetPrice: 0,
      cards: []
    }

    const slicedCards = netWorth.cards.slice(0, 3)

    return {
      totalSetPrice: netWorth.totalAveragedNetWorth,
      cards: slicedCards
    }
  }

  const cardTypeDistribution = (): CardSupertypeDistributionData[] => {
    const data = getCardData();

    if(!data) return []

    const types = data.map(card => card.supertype)

    const typeDistribution = types.reduce((acc, type) => {
      if(type in acc) {
        acc[type]++
      } else {
        acc[type] = 1
      }

      return acc
    }, {} as {[key: string]: number})

    return Object.keys(typeDistribution).map(key => ({kind: key, count: typeDistribution[key]}))
  }

  const cardRarityDistribution = (): CardRarityDistributionData[] => {
    const data = getCardData();
    if(!data) return []

    const rarities = data.map(card => card.rarity)

    rarities.filter(rarity => rarity !== undefined)

    const combinedRarities = combineRarities(rarities);

    const rarityDistribution = combinedRarities.reduce((acc, rarity, currIndex) => {
      if(acc[rarity]) {
        acc[rarity] += 1
      } else {
        acc[rarity] = 1
      }

      return acc
    }, {} as {[key: string]: number})

    return Object.keys(rarityDistribution)
      .sort((a, b) => {
      const rarityOrder = ['Common', 'Uncommon', 'Rare', 'U Rare', 'S Rare'];
      return rarityOrder.indexOf(a) - rarityOrder.indexOf(b);
      })
      .map(key => ({
      rarity: key,
      count: rarityDistribution[key] as number
      }));
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-8 mt-4 lg:items-center lg:justify-center w-full">
      <h1 className="text-lg lg:text-3xl font-bold">{setData.name}</h1>
      <div>
        <ContextCarousel className='max-w-[900px]'>
          <CompletedSet
            countOfCards={totalCount()}
            totalNumberOfCardsInSet={getCardData()?.length || 0}
            releaseDate={setData.releaseDate}
            totalSetPrice={mostExpensiveCards().totalSetPrice}
          />
          <MostExpensiveCards cards={mostExpensiveCards().cards}/>
          {mostExpensiveOwned().cards.length > 0 ? (
            <MostExpensiveOwned cards={mostExpensiveOwned().cards}/>
          ) : null}
          <CardSupertypeDistribution data={cardTypeDistribution()}  />
          <CardRarityDistribution data={cardRarityDistribution()}/>
        </ContextCarousel>
      </div>
      {getCardData() !== null && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {(getCardData() as TCGCardType[]).map((card) => (
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