import { apiClient, ApiError } from './apiClient'

const TYPE_ALIASES = {
  callback: 'callback',
  b2b_quote: 'b2b_quote',
  pickup: 'pickup',
  booking: 'booking',
  franchise: 'franchise',
  contact: 'contact',
}

/**
 * Submit a lead to the backend. Normalises a payload from any form type into the shape
 * expected by /api/leads. If VITE_LEAD_BACKEND_ENABLED=false, falls through so the legacy
 * Google Sheets path stays in charge.
 */
export async function submitLead(type, data = {}) {
  const backendEnabled = import.meta.env.VITE_LEAD_BACKEND_ENABLED !== 'false'
  if (!backendEnabled) throw new Error('Backend leads disabled')

  const normalisedType = TYPE_ALIASES[type] || 'other'
  const body = {
    type: normalisedType,
    name: data.name || data.fullName || data.customerName || '',
    phoneNumber: data.phoneNumber || data.phone || data.mobile || data.contact || '',
    email: data.email || '',
    address: data.address || data.location || '',
    city: data.city || '',
    pincode: data.pincode || data.zip || '',
    message: data.message || data.notes || data.remarks || '',
    source: data.source || 'website',
    payload: data,
  }
  return apiClient.post('/api/leads', body, { isPublic: true })
}

export { ApiError }
