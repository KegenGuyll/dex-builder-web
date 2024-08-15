type AncientTrait = {
  name: string;
  text: string;
};

interface Abilities {
  name: string;
  text: string;
  type: string;
}

type Attacks = {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
};

type Weaknesses = {
  type: string;
  value: string;
};

type Resistances = {
  type: string;
  value: string;
};

type Legalities = {
  unlimited: string;
  standard: string;
  expanded: string;
};

type CardSet = {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
};

type Images = {
  small: string;
  large: string;
};

type TCGPrices = {
  normal: {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  };
  reverseHolofoil: {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  };
};

type TCGPlayer = {
  url: string;
  updatedAt: string;
  prices: TCGPrices;
};

type CardMarketPrices = {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
};

type CardMarket = {
  url: string;
  updatedAt: string;
  prices: CardMarketPrices;
};

type TCGCard = {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  abilities: Abilities[];
  ancientTrait: AncientTrait;
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  resistances: Resistances[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: CardSet | CardSet[];
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer: TCGPlayer;
  cardmarket: CardMarket;
  updatedAt: string;
};

export type { 
  TCGCard, 
  CardSet, 
  TCGPrices, 
  TCGPlayer, 
  CardMarket, 
  CardMarketPrices, 
  AncientTrait, 
  Abilities, 
  Attacks, 
  Weaknesses, 
  Resistances, 
  Legalities, 
  Images 
};