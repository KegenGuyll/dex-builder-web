import dayjs from "dayjs"

import GroupButtonOwned from "@/components/OwnedCard/GroupButtonOwned"
import TCGCard from "@/components/TCGCards"
import findOneOwned from "@/endpoints/owned/findOneOwned"
import getTCGCard from "@/endpoints/tcg/getCard"
import getTokens from "@/util/getTokens"

import {Divider} from "@nextui-org/divider";
import AddNotes from "@/components/OwnedCard/AddNotes"
import { Textarea } from "@nextui-org/input"

type CardPageProps = {
  params: {
    cardId: string
  }
}

type InformationCardProps = {
  label: string
  body: string
}

const InformationCard: React.FC<InformationCardProps> = ({label, body}: InformationCardProps) => (
  <div className="bg-default bg-opacity-20 rounded py-2 px-4 flex flex-col">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="font-semibold text-sm" >{body}</span>
  </div>
)

export async function generateMetadata({params}: CardPageProps) { 

  const cardData = await getTCGCard(params.cardId)

  if(!cardData || 'error' in cardData) {
    return {
      title: `${params.cardId} | Card Not Found`,
      description: 'Search for your favorite TCG cards'
    }
  }

  if(Array.isArray(cardData.data.set)) {
    return {
      title: `${cardData.data.name} | ${cardData.data.set[0].series}: ${cardData.data.set[0].name}`,
      description: `${cardData.data.name} | ${cardData.data.set[0].series}: ${cardData.data.set[0].name}`,
    }
  }

  return {
    title: `${cardData.data.name} | ${cardData.data.set.series}: ${cardData.data.set.name}`,
    description: `${cardData.data.name} | ${cardData.data.set.series}: ${cardData.data.set.name}`,
  }
}

const CardPage = async ({ params }: CardPageProps) => {
  let isCardOwned = false;

  const cardData = await getTCGCard(params.cardId)

  const token = await getTokens()

  const ownedData = await findOneOwned(params.cardId, token)

  if(ownedData && 'error' in ownedData) {
    if(ownedData.statusCode === 404) {
      isCardOwned = false
    }
  } else if (ownedData && ownedData?.count > 0) {
    isCardOwned = true
  }

  if(!cardData || 'error' in cardData) return null

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-4 md:gap-8 items-center">
          <div className="h-[500px] w-full max-w-[360px]">
            <TCGCard 
              imageSize={{height: '100%', width:'100%'}} 
              cardName={cardData.data.name} 
              src={cardData.data.images.large} 
            />
          </div>
          <div className="w-full text-center">
            <h1>{cardData.data.name}</h1>
            {Array.isArray(cardData.data.set) 
              ? (cardData.data.set).map((set) => (
                  <span key={set.id} className="text-sm text-gray-400" >{set.series}: {set.name}</span>
                ))
              : (<span className="text-sm text-gray-400" >{cardData.data.set.series}: {cardData.data.set.name}</span>)
            }
          </div>
        </div>
        <GroupButtonOwned
          notes={ownedData && 'notes' in ownedData ? ownedData.notes : null}
          cardId={params.cardId}
          count={ownedData && 'count' in ownedData ? ownedData.count : 0}
          isOwned={isCardOwned}
        />
        {ownedData && 'notes' in ownedData && ownedData.notes && (
          <Textarea
            isReadOnly
            fullWidth
            label="Existing Notes"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue={ownedData.notes}
          />
        )}
        <Divider/>
        <div className="flex flex-col gap-2">
          <InformationCard label="Artist" body={cardData.data.artist} />
          {Array.isArray(cardData.data.set) 
            ? (cardData.data.set).map((set) => (
                <InformationCard key={set.id} label="Set" body={`${set.series}: ${set.name}`} />
              ))
            : (<InformationCard label="Release Date" body={dayjs(cardData.data.set.releaseDate).format('MMMM DD, YYYY')} />)
          }
          {cardData.data.rarity && (
            <InformationCard label="Rarity" body={cardData.data.rarity} />
          )}
          <InformationCard label="National Number" body={cardData.data.nationalPokedexNumbers.map((v) => v).join(',')} />
          <InformationCard label="Identifier" body={cardData.data.id} />
        </div>
        <Divider/>
        <AddNotes 
          cardName={cardData.data.name} 
          prePopulatedNotes={ownedData && 'notes' in ownedData ? ownedData.notes : undefined} 
          cardId={params.cardId} 
        />
      </div>
    </div>
  )
}

export default CardPage;