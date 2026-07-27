import { apiClient, storage } from './apiClient'

function saveSessionFromResponse(res) {
  if (res?.sessionId) storage.setSession(res.sessionId)
  return res
}

export const cartService = {
  getCart: () => apiClient.get('/api/cart', { isPublic: true }).then(saveSessionFromResponse),

  addItem: (item) => apiClient.post('/api/cart/items', item, { isPublic: true }).then(saveSessionFromResponse),

  updateItem: (itemId, patch) =>
    apiClient.patch(`/api/cart/items/${itemId}`, patch, { isPublic: true }).then(saveSessionFromResponse),

  removeItem: (itemId) =>
    apiClient.del(`/api/cart/items/${itemId}`, { isPublic: true }).then(saveSessionFromResponse),

  setPickupSlot: (slot) =>
    apiClient.put('/api/cart/pickup-slot', slot, { isPublic: true }).then(saveSessionFromResponse),

  clearCart: () => apiClient.del('/api/cart', { isPublic: true }).then(saveSessionFromResponse),

  mergeGuestCart: () => {
    const sessionId = storage.getSession()
    if (!sessionId) return Promise.resolve({ success: true })
    return apiClient.post('/api/cart/merge', { sessionId }, { isPublic: true }).then((res) => {
      storage.clearSession()
      return res
    })
  },
}
