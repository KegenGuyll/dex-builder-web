
type CombinedRarities = 'Common' | 'Uncommon' | 'Rare' | 'U Rare' | 'S Rare' | 'Promo'

type AllRarities = 
'Amazing Rare' |
'Common' |
'LEGEND' |
'Promo' |
'Rare' |
'Rare ACE' |
'Rare BREAK' |
'Rare Holo' |
'Rare Holo EX' |
'Rare Holo GX' |
'Rare Holo LV.X' |
'Rare Holo Star' |
'Rare Holo V' |
'Rare Holo VMAX' |
'Rare Prime' |
'Rare Prism Star' |
'Rare Rainbow' |
'Rare Secret' |
'Rare Shining' |
'Rare Shiny' |
'Rare Shiny GX' |
'Rare Ultra' |
'Uncommon'


const combineRarities = (rarities: string[]): CombinedRarities[] => {
  return rarities.map(rarity => {

    if(!rarity) {
      return 'Common'
    }

    if(rarity.includes('Common')) return 'Common'

    if(rarity.includes('Uncommon')) return 'Uncommon'

    if(rarity === 'Rare') return 'Rare'

    if(rarity === 'Rare Holo') return 'Rare'

    if(rarity === 'Trainer Gallery Rare Holo') return 'Rare'

    if(rarity === 'Art Rare') return 'Rare'

    if(rarity === 'Ultra Rare Shiny') return 'S Rare'

    if(rarity === 'Rare Rainbow') return 'S Rare'

    if(rarity === 'Rare Secret') return 'S Rare'

    if(rarity === 'Special Illustration Rare') return 'S Rare'

    if(rarity === 'Trainer Gallery Rare Secret') return 'S Rare'

    if(rarity === 'Ultra Rare Shiny') return 'S Rare'

    if(rarities.includes('Promo')) return 'Promo'

    return 'U Rare'
  })
}

export default combineRarities