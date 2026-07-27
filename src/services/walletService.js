import { apiClient } from './apiClient'

export const walletService = {
  summary: () => apiClient.get('/api/wallet'),
  history: (params = {}) => {
    const qs = new URLSearchParams()
    if (params.limit) qs.set('limit', params.limit)
    if (params.before) qs.set('before', params.before)
    const suffix = qs.toString() ? `?${qs}` : ''
    return apiClient.get(`/api/wallet/history${suffix}`)
  },
  topupInitiate: (amount) => apiClient.post('/api/wallet/topup/initiate', { amount }),
  topupConfirm: (payload) => apiClient.post('/api/wallet/topup/confirm', payload),
  apply: (amount) => apiClient.post('/api/cart/apply-wallet', amount != null ? { amount } : {}),
  remove: () => apiClient.del('/api/cart/wallet'),
}
