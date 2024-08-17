import Link from 'next/link'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { getAllSets } from 'pokemon-tcg-sdk-typescript/dist/sdk'
import classNames from 'classnames'

const SetPage = async () => {
  const data = await getAllSets()

  data.sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1))

  // group sets by series and return Record<string, Set[]>
  const groupedSets = data.reduce((acc, set) => {
    if (!acc[set.series]) {
      acc[set.series] = []
    }

    if(set.name.includes("McDonald's")) {
      if (!acc['McDonald\'s']) {
        acc['McDonald\'s'] = []
      } else {
        acc['McDonald\'s'].push(set)
      }

      return acc
    }

    acc[set.series].push(set)
    return acc
  }, {} as Record<string, PokemonTCG.Set[]>)

  // sort sets within each series by releaseDate
  Object.values(groupedSets).forEach((sets) => {
    sets.sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1))
  })

    
  return (
    <div>
      {Object.entries(groupedSets).map(([series, sets]) => (
        <div className='p-1 flex flex-col gap-4 text-center' key={series}>
          <h2 className='font-bold text-lg'>{series}</h2>
          <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-3 lg:gap-4 xl:grid-cols-5'>
            {sets.map(set => (
              <Link
                href={`/sets/${set.id}`}
                key={set.id}
              >
                <li 
                  className={classNames(
                    'flex flex-col items-center justify-between p-2 bg-default-50 rounded relative', 
                    'sm:w-[146px] w-42 h-44',
                    'md:w-52 lg:w-60 lg:h-60'
      
                  )} 
                  key={set.id}
                >
                  <div className='flex w-full justify-start mb-2'>
                    <img className={classNames('h-4', 'md:h-6')} src={set.images.symbol} alt={set.name} />
                  </div>
                  <div className='flex flex-grow'>
                    <img className='object-contain h-[50%] lg:h-[70%] w-full' src={set.images.logo} alt={set.name} style={{ maxWidth: '100%' }} />
                  </div>
                  <span className='flex-shrink-0 absolute bottom-2 left-2 right-2'>
                    {set.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SetPage;