
const TCG = {
  baseURL: 'https://api.pokemontcg.io/v2',
  apiKey: process.env.NEXT_PUBLIC_TCG_API_KEY
}

const DEX_BUILDER_API = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}

export {
  TCG,
  DEX_BUILDER_API
}