import { apiClient } from './apiClient'

export const checkoutService = {
  initiate: (payload) => apiClient.post('/api/checkout/initiate', payload, { isPublic: true }),
  confirm: (payload) => apiClient.post('/api/checkout/confirm', payload, { isPublic: true }),
}

export const orderService = {
  publicStatus: (ticketNumber) =>
    apiClient.get(`/api/public/orders/${encodeURIComponent(ticketNumber)}`, { isPublic: true }),
  myOrders: (params = {}) => {
    const qs = new URLSearchParams()
    if (params.limit) qs.set('limit', params.limit)
    if (params.page) qs.set('page', params.page)
    const suffix = qs.toString() ? `?${qs}` : ''
    return apiClient.get(`/api/customer/orders${suffix}`)
  },
  myOrderDetail: (ticketNumber) =>
    apiClient.get(`/api/customer/orders/${encodeURIComponent(ticketNumber)}`),
}
