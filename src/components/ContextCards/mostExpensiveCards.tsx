import { Images, TCGCard as TCGCardType } from "@/types/endpoints/tcg/card"
import { Card, CardBody } from "@nextui-org/card"
import TCGCard from "../TCGCards"
import formatDollarAmount from "@/util/formatDollarAmount"

type MostExpensiveCard = {
  id: string
  name: string
  images: Images
  price: number
}

type MostExpensiveCardsProps = {
  title?: string
  cards: MostExpensiveCard[]
}

const MostExpensiveCards: React.FC<MostExpensiveCardsProps> = ({ cards, title = "Most Expensive" }: MostExpensiveCardsProps) => {
  return (
    <Card className='h-56'>
      <CardBody>
        <div className="flex flex-col items-start gap-2">
          <h4>{title || 'Most Expensive'}</h4>
          <div className="flex flex-col gap-1">
            {cards.map((card) => (
              <div className="flex gap-4" key={card.id}>
                <TCGCard
                  href={`/card/${card.id}`}
                  imageSize={{
                    height: 40,
                    width: 28
                  }}
                  cardName={card.name}
                  src={card.images.small}
                />
                <div>
                  <h5 className="text-sm" >{card.name}</h5>
                  <small className="text-xs">{formatDollarAmount((card as any).price)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export type { MostExpensiveCard }

export default MostExpensiveCards