import CardRarityDistribution, { CardRarityDistributionData } from "@/components/ContextCards/cardRarityDistrubution"
import CardTypeDistribution, { CardTypeDistributionData } from "@/components/ContextCards/cardTypeDistribution"
import MostExpensiveCards, { MostExpensiveCard } from "@/components/ContextCards/mostExpensiveCards"
import PersonalCollection from "@/components/ContextCards/personalCollection"
import ContextCarousel from "@/components/ContextCarousel"
import TCGCard from "@/components/TCGCards"
import findUserCollection from "@/endpoints/user/username/findCollection"
import findUserNetWorth from "@/endpoints/user/username/findNetWorth"
import formatDollarAmount from "@/util/formatDollarAmount"
import getTokens from "@/util/getTokens"
import combineRarities from "@/util/combineRarities"

type CollectionPageProps = {
  params: {
    username: string
  }
  searchParams: {
    q: string
  }
}

const CollectionPage = async ({ params, searchParams }: CollectionPageProps) => {
  const token = await getTokens()
  const { q } = searchParams

  const [collectionResponse, netWorthResponse] = await Promise.all([
    findUserCollection(params.username),
    findUserNetWorth(params.username)
  ])

  const getUserCollection = () => {
    if(!collectionResponse || 'error' in collectionResponse) return []

    if(q) {
      const query = q.toLowerCase()

      const filteredData = collectionResponse.filter(card => card.cardName.toLowerCase().includes(query))

      return filteredData
    }

    return collectionResponse
  }

  const getUserNetWorth = () => {
    if(!netWorthResponse || 'error' in netWorthResponse) return {
      cards: [],
      totalAveragedNetWorth: 0
    };

    return netWorthResponse
  }

  const getTotalCardOwned = (): number => {
    const data = getUserCollection();

    if(data.length === 0) return 0

    return data.reduce((acc, card) => acc + card.count, 0)
  }

  const getMarketValue = (): number => {
    const data = getUserNetWorth();

    if(!data) return 0

    return data.totalAveragedNetWorth
  }

  const getMostExpensiveCards = (): MostExpensiveCard[] => {
    const data = getUserNetWorth();

    if(data?.cards.length === 0) return []

    const sortedData = data?.cards.sort((a, b) => b.marketPrice.averageSellPrice - a.marketPrice.averageSellPrice)

    return sortedData.slice(0, 3).map(card => ({
      id: card.cardId,
      name: card.cardName,
      images: card.images,
      price: card.marketPrice.averageSellPrice
    }))
  }

  const cardTypeDistribution = (): CardTypeDistributionData[] => {
    const data = getUserCollection();

    if(data.length === 0) return []

    const types: string[] = [];
    data.forEach(card => {
      for (let i = 0; i < card.count; i++) {
      types.push(card.cardSupertype);
      }
    });

    const typeDistribution = types.reduce((acc, type, currIndex) => {
      if(acc[type]) {
        acc[type] += 1
      } else {
        acc[type] = 1
      }

      return acc
    }, {} as {[key: string]: number})

    return Object.keys(typeDistribution).map(key => ({
      kind: key,
      count: typeDistribution[key
      ] as number
    }))
  }

  const cardRarityDistribution = (): CardRarityDistributionData[] => {
    const data = getUserCollection();

    if(data.length === 0) return []

    const rarities: string[] = [];
    data.forEach(card => {
      for (let i = 0; i < card.count; i++) {
        if(!card.cardRarity) return;

        rarities.push(card.cardRarity);
      }
    });

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
    <div  className="flex flex-col gap-4 lg:gap-8 mt-4 lg:items-center lg:justify-center w-full">
      <h1 className="text-lg lg:text-3xl font-bold">{`${params.username}'s Collection`}</h1>
      <div>
        <ContextCarousel className='max-w-[900px]'>
          <PersonalCollection
            username={params.username}
            cardsOwned={getTotalCardOwned()}
            pokemonCaught={getUserCollection().length}
            marketValue={formatDollarAmount(getMarketValue())}
          />
          <MostExpensiveCards cards={getMostExpensiveCards()} />
          <CardTypeDistribution data={cardTypeDistribution()}/>
          <CardRarityDistribution data={cardRarityDistribution()}/>
        </ContextCarousel>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {getUserCollection().map((card) => (
          <div className="relative" key={card.cardId} >
            <TCGCard 
              href={`/card/${card.cardId}`} 
              src={card.images.large} 
              cardName={card.cardName} 
            />
          </div>
        ))}
      </div>
      {/* <div className="flex flex-wrap gap-4 justify-center">
        {getCollection().map((card) => (
          <Card key={card._id} fullWidth className="max-w-[175px] md:max-w-[200px] lg:max-w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4>{card.cardDetails.name}</h4>
              {Array.isArray(card.cardDetails.set) && card.cardDetails.set.map((set) => (
                <small key={set.id} className="text-default-500">{set.series}: {set.name}</small>  
              ))}              
            </CardHeader>
            <CardBody className="overflow-visible relative py-2 justify-center items-center">
              <TCGCard href={`/card/${card.cardDetails.id}`} cardName={card.cardDetails.name} src={card.cardDetails.images.large} />
            </CardBody>  
            <CardFooter className="justify-evenly">
              <GroupButtonOwned 
                size="sm" 
                cardId={card.cardDetails.id} 
                count={card.count} 
                isOwned={true} 
                notes={card.notes} 
              />
            </CardFooter>
          </Card>
        ))}
      </div> */}
    </div>
  )
}

export default CollectionPage