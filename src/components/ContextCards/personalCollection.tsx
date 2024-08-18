import { Card, CardBody } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/progress";

type PersonalCollectionProps = {
  username: string;
  cardsOwned: number;
  pokemonCaught: number;
  marketValue: string;
}

const totalPokemon = 1025;

const PersonalCollection: React.FC<PersonalCollectionProps> = ({username, cardsOwned, pokemonCaught, marketValue}) => {
  return (
    <Card className='h-56'>
      <CardBody className="flex flex-row items-center">
        <div className="flex flex-col flex-grow gap-4">
          <div className="flex flex-col gap-1">
            <div>
              <h5>Pokemon Caught</h5>
              <small className="text-sm text-default-500">{pokemonCaught} of {totalPokemon}</small>
            </div>
            <div>
              <h5 >Cards Owned</h5>
              <small className="text-sm text-default-500" >{cardsOwned}</small>
            </div>
            <div>
              <h5>Total Market Value</h5>
              <small className="text-sm text-default-500">{marketValue}</small>
            </div>
          </div>
        </div>
          {pokemonCaught / totalPokemon * 100 === 100 ? (
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
              value={pokemonCaught / totalPokemon * 100}
              color={"primary"}
              showValueLabel={true}
            />
          )}
      </CardBody>
    </Card>
  )
};

export default PersonalCollection;