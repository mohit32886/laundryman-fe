import { apiClient } from './apiClient'

export const subscriptionService = {
  listPlans: () => apiClient.get('/api/subscriptions/plans'),
  mine: () => apiClient.get('/api/subscriptions/mine'),
  subscribe: (planSlug) => apiClient.post('/api/subscriptions/subscribe', { planSlug }),
  confirm: (payload) => apiClient.post('/api/subscriptions/confirm', payload),
  pause: (id, resumeAt) => apiClient.post(`/api/subscriptions/${id}/pause`, { resumeAt }),
  resume: (id) => apiClient.post(`/api/subscriptions/${id}/resume`),
  cancel: (id) => apiClient.post(`/api/subscriptions/${id}/cancel`),
}
