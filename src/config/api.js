export const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_ORDER_API_URL || 'http://localhost:5001'
export const PUBLIC_API_KEY = import.meta.env.VITE_PUBLIC_API_KEY || '088ae014796dc55e0ca859b08cdbafd8'
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''

export const STORAGE_KEYS = {
  authToken: 'lm.authToken',
  cartSession: 'lm.cartSession',
  customer: 'lm.customer',
}
