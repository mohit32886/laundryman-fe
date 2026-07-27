const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL || ''
const PUBLIC_API_KEY = import.meta.env.VITE_PUBLIC_API_KEY || ''

/**
 * Create an order in the laundry dashboard.
 * @param {Object} pickupData - { name, phone, address, pickupDate, items[] }
 * @returns {Promise<{ ticketNumber, orderId, expectedDelivery, totalAmount }>}
 */
export async function createOrderInDashboard(pickupData) {
  if (!ORDER_API_URL) {
    throw new Error('ORDER_API_URL not configured')
  }

  const response = await fetch(`${ORDER_API_URL}/api/public/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Public-API-Key': PUBLIC_API_KEY
    },
    body: JSON.stringify({
      name: pickupData.name,
      phone: pickupData.phone,
      address: pickupData.address,
      pickupDate: pickupData.pickupDate,
      items: pickupData.items
    })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

/**
 * Get order status by ticket number (public endpoint).
 */
export async function getOrderStatus(ticketNumber) {
  if (!ORDER_API_URL) {
    throw new Error('ORDER_API_URL not configured')
  }

  const response = await fetch(
    `${ORDER_API_URL}/api/public/orders/${encodeURIComponent(ticketNumber)}`,
    { headers: { 'X-Public-API-Key': PUBLIC_API_KEY } }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${response.status}`)
  }

  const json = await response.json()
  return json.data
}
