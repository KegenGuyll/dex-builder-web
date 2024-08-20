'use client'

import useCreateQueryString from "@/hooks/useCreateQueryString"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"
import { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/select"
import { Button } from "@nextui-org/button"
import SearchableSelect from "../SearchableSelect"

type CardType = 'pokemon' | 'trainer' | 'energy' | ''

type DropdownItem = {
  label: string
  value: string
}

const SearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const activeParams = useSearchParams()
  const { 
    createQueryString,
    deleteQueryString
  } = useCreateQueryString()
  const [activeCardType, setActiveCardType] = useState<CardType>((activeParams.get('supertype') as CardType) || '')
  const [activeRarity, setActiveRarity] = useState<string>((activeParams.get('rarity') || ''))
  const [activeEnergyType, setActiveEnergyType] = useState<string>((activeParams.get('types') || ''))
  const [activeSubtype, setActiveSubtype] = useState<string>((activeParams.get('subtype') || ''))

  const [types, setTypes] = useState<DropdownItem[]>([])
  const [rarities, setRarities] = useState<DropdownItem[]>([])
  const [subtypes, setSubtypes] = useState<DropdownItem[]>([])
  const [supertypes, setSupertypes] = useState<DropdownItem[]>([])

  const handleFetchTypes = async () => {
    const [types, rarities, subtypes, supertypes] = await Promise.all([
      PokemonTCG.getTypes(),
      PokemonTCG.getRarities(),
      PokemonTCG.getSubtypes(),
      PokemonTCG.getSupertypes()
    ])

    setTypes(types.map((type) => ({label: type, value: type})))
    setRarities(rarities.map((rarity) => ({label: rarity, value: rarity})))
    setSubtypes(subtypes.map((subtype) => ({label: subtype, value: subtype})))
    setSupertypes(supertypes.map((supertype) => ({label: supertype, value: supertype})))
  }

  const handleClearParams = () => {
    setActiveCardType('')
    setActiveRarity('')
    setActiveEnergyType('')
    setActiveSubtype('')
    router.push(pathname)
  }

  useEffect(() => {
    handleFetchTypes()
  }, [])

  const handleSearch = ({key, value}: {key: string, value: string}) => {

    if(key === 'supertype') {
      setActiveCardType(value as CardType)
    }

    if(key === 'rarity') {
      setActiveRarity(value)
    }

    if(key === 'subtype') {
      setActiveSubtype(value)
    }

    if(key === 'types') {
      setActiveEnergyType(value)
    }

    const params = createQueryString(key, value)

    if(value === '') {
      const newParams = deleteQueryString(key)

      return router.push(`${pathname}?${newParams}`)
    }

    router.push(`${pathname}?${params}`)
  }

  return (
    <div className='flex w-full items-center overflow-x-auto justify-start max-w-[800px] gap-4'>
      <SearchableSelect 
        defaultValue={activeEnergyType ? [{label: activeEnergyType, value: activeEnergyType}] : undefined}
        label='Energy Type'
        options={types}
        placeholder='Energy Type' 
        onChange={(value) => handleSearch({key: 'types', value: value as string})}
      />
      <SearchableSelect 
        defaultValue={activeSubtype ? [{label: activeSubtype, value: activeSubtype}] : undefined}
        label='Card Type'
        options={supertypes}
        placeholder='Card Type' 
        onChange={(value) => handleSearch({key: 'supertype', value: value as string})}
      />
      <SearchableSelect 
        defaultValue={activeRarity ? [{label: activeRarity, value: activeRarity}] : undefined}
        label='Card Rarity'
        options={rarities}
        placeholder='Card Rarity' 
        onChange={(value) => handleSearch({key: 'rarity', value: value as string})}
      />
      {/* <Select
        defaultSelectedKeys={activeEnergyType ? activeEnergyType.split(',') : undefined}
        selectionMode="multiple"
        label="Energy Type"
        placeholder="Select an Energy Type"
        className="max-w-xs min-w-[160px] w-full"
        value={activeEnergyType}
        onChange={(e) => handleSearch({key: 'types', value: e.target.value})}
      >
        {types.map((type) => (
          <SelectItem key={type.label} value={type.value}>
            {type.value}
          </SelectItem>
        ))}
      </Select> */}
     {/* <Select
        defaultSelectedKeys={activeCardType ? activeCardType.split(',') : undefined}
        selectionMode="multiple"
        label="Card Type"
        placeholder="Select an Card Type"
        className="max-w-xs min-w-[160px] w-full"
        value={activeCardType}
        onChange={(e) => handleSearch({key: 'supertype', value: e.target.value})}
      >
        {supertypes.map((type) => (
          <SelectItem key={type.key} value={type.value}>
            {type.value}
          </SelectItem>
        ))}
      </Select>
      <Select
          defaultSelectedKeys={activeRarity ? activeRarity.split(',') : undefined}
          selectionMode="multiple"
          label="Card Rarity"
          placeholder="Select an Card Rarity"
          className="max-w-xs min-w-[160px] w-full"
          value={activeRarity}
          onChange={(e) => handleSearch({key: 'rarity', value: e.target.value})}
        >
          {rarities.map((type) => (
            <SelectItem key={type.key} value={type.value}>
              {type.value}
            </SelectItem>
          ))}
      </Select> */}
      <Button variant='ghost' isDisabled={activeParams.size === 0} onClick={handleClearParams}>
        Clear
      </Button>
    </div>
  )

}

export default SearchParams