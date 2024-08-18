
const formatDollarAmount = (amount: number): string => {
  if(!amount) return '$0.00'

  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default formatDollarAmount