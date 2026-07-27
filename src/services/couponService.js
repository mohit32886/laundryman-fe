import { apiClient } from './apiClient'

export const couponService = {
  validate: (code) => apiClient.post('/api/coupons/validate', { code }, { isPublic: true }),
  apply: (code) => apiClient.post('/api/cart/apply-coupon', { code }, { isPublic: true }),
  remove: () => apiClient.del('/api/cart/coupon', { isPublic: true }),
}
