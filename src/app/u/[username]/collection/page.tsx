import GroupButtonOwned from "@/components/OwnedCard/GroupButtonOwned"
import TCGCard from "@/components/TCGCards"
import CardPagination from "@/components/TCGCards/pagination"
import TCGCardSkeleton from "@/components/TCGCards/skeleton"
import findAllOwned from "@/endpoints/owned/findAllOwned"
import getTokens from "@/util/getTokens"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"

type CollectionPageProps = {
  searchParams: {
    page: string,
    pageSize: string
  }
}

const CollectionPage = async ({ searchParams }: CollectionPageProps) => {
  const token = await getTokens()
  const { page, pageSize } = searchParams

  const myCollection = await findAllOwned({ pageNumber: Number(page) - 1 || 0, pageSize: Number(pageSize) || 10 }, token)

  if(!myCollection || 'error' in myCollection) return <div>Failed to load collection</div>


  return (
    <div className="py-4 md:py-8">
      {/* <div className="flex flex-col gap-4 md:gap-8 mb-4 lg:mb-8">
        <div className="flex gap-4 lg:gap-8 overflow-auto">
          {Array(10).fill(0).map((_, index) => (
            <TCGCardSkeleton key={index} />
          ))}
        </div>
      </div> */}
      <div className="flex flex-wrap gap-4 justify-center">
        {myCollection.owned.map((card) => (
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
      </div>
      <div className="flex w-full justify-center mt-4 lg:mt-8">
        {myCollection.totalNumberOfPages > 1 && <CardPagination totalResults={myCollection.totalNumberOfPages} />}
      </div>
    </div>
  )
}

export default CollectionPage