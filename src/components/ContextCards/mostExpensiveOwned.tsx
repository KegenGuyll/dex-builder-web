import { OwnedNetWorth } from "@/types/endpoints/owned";
import MostExpensiveCards, { MostExpensiveCard } from "./mostExpensiveCards"
import { useMemo } from "react";
import { TCGCard } from "@/types/endpoints/tcg/card";


type MostExpensiveOwnedProps = { 
  cards: OwnedNetWorth[];
}

const MostExpensiveOwned: React.FC<MostExpensiveOwnedProps> = ({cards}) => {

  const formattedCards: MostExpensiveCard[] = useMemo(() => {
    return cards.map(card => ({
      id: card.cardId,
      name: card.cardName,
      images: card.images,
      price: card.marketPrice.averageSellPrice
    }))
  }, [cards])

  return <MostExpensiveCards title="Most Expensive Owned" cards={formattedCards} />
}

export default MostExpensiveOwned