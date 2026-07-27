import { apiClient } from './apiClient'

export const authService = {
  requestOtp: (phoneNumber) =>
    apiClient.post('/api/customer/auth/request-otp', { phoneNumber }),

  verifyOtp: ({ phoneNumber, code, referralCode }) =>
    apiClient.post('/api/customer/auth/verify-otp', { phoneNumber, code, referralCode }),

  getMe: () => apiClient.get('/api/customer/auth/me'),

  updateMe: (patch) => apiClient.patch('/api/customer/auth/me', patch),
}
