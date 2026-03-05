const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL || ''
let _cache = null, _cacheTime = 0
const TTL = 5 * 60 * 1000

export async function getProductPrices() {
  if (_cache && Date.now() - _cacheTime < TTL) return _cache
  if (!ORDER_API_URL) throw new Error('VITE_ORDER_API_URL is not configured')
  const json = await fetch(`${ORDER_API_URL}/api/products`).then(r => r.json())
  if (!json.success) throw new Error('Failed to load product prices')
  _cache = Object.fromEntries(json.data.map(p => [p.productId, p.basePrice]))
  _cacheTime = Date.now()
  return _cache
}
