const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

export function parseAmount(value) {
  const amount = Number(String(value).replace(/[,$\s]/g, ''))
  return Number.isFinite(amount) && amount > 0 ? amount : null
}
