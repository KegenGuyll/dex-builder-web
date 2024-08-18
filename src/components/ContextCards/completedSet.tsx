import formatDollarAmount from "@/util/formatDollarAmount";
import { Card, CardBody } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/progress";
import dayjs from "dayjs";

type CompletedSetProps = {
  countOfCards: number;
  totalNumberOfCardsInSet: number;
  releaseDate: string;
  totalSetPrice: number;
}

const CompletedSet: React.FC<CompletedSetProps> = ({ countOfCards, totalNumberOfCardsInSet, releaseDate, totalSetPrice }: CompletedSetProps) => {
  return (
    <Card className='h-56' fullWidth>
      <CardBody className="flex flex-row items-center">
        <div className="flex flex-col flex-grow gap-4">
          <div>
            <h4>Complete Set</h4>
            <small className="text-small text-default-500" >{countOfCards} of {totalNumberOfCardsInSet}</small>
          </div>
          <div>
            <h4>Release Date</h4>
            <small  className="text-small text-default-500">{dayjs(releaseDate).format('MMMM DD, YYYY')}</small>
          </div>
          <div>
            <h4>Set Market Value</h4>
            <small className="text-small text-default-500">{formatDollarAmount(totalSetPrice)}</small>
          </div>
        </div>
        {countOfCards / totalNumberOfCardsInSet * 100 === 100 ? (
          <CircularProgress
            classNames={{
              svg: "w-24 h-24 md:w-36 md:h-36 drop-shadow-md",
              value: "md:text-3xl text-xl font-semibold text-success-900",
            }}
            aria-label="Loading..."
            size="lg"
            value={100}
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
            value={countOfCards / totalNumberOfCardsInSet * 100}
            color={"primary"}
            showValueLabel={true}
          />
        )}
      </CardBody>
    </Card>
  )
};

export default CompletedSet;