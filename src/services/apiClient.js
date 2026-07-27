import { API_BASE_URL, PUBLIC_API_KEY, STORAGE_KEYS } from '../config/api'

function readStorage(key) {
  try {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  try {
    if (value == null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

export const storage = {
  getToken: () => readStorage(STORAGE_KEYS.authToken),
  setToken: (t) => writeStorage(STORAGE_KEYS.authToken, t),
  clearToken: () => writeStorage(STORAGE_KEYS.authToken, null),
  getSession: () => readStorage(STORAGE_KEYS.cartSession),
  setSession: (s) => writeStorage(STORAGE_KEYS.cartSession, s),
  clearSession: () => writeStorage(STORAGE_KEYS.cartSession, null),
  getCustomer: () => {
    const raw = readStorage(STORAGE_KEYS.customer)
    try { return raw ? JSON.parse(raw) : null } catch { return null }
  },
  setCustomer: (c) => writeStorage(STORAGE_KEYS.customer, c ? JSON.stringify(c) : null),
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message)
    this.status = status
    this.data = data
  }
}

async function request(path, { method = 'GET', body, headers = {}, isPublic = false } = {}) {
  const url = `${API_BASE_URL}${path}`
  const finalHeaders = {
    Accept: 'application/json',
    ...headers,
  }
  if (body !== undefined && !(body instanceof FormData)) {
    finalHeaders['Content-Type'] = 'application/json'
  }
  const token = storage.getToken()
  if (token && !finalHeaders.Authorization) {
    finalHeaders.Authorization = `Bearer ${token}`
  }
  if (isPublic && PUBLIC_API_KEY) {
    finalHeaders['X-Public-API-Key'] = PUBLIC_API_KEY
  }
  const session = storage.getSession()
  if (session) {
    finalHeaders['X-Cart-Session'] = session
  }

  let response
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
    })
  } catch (networkErr) {
    throw new ApiError('Network error', { status: 0, data: { message: networkErr.message } })
  }

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json().catch(() => ({})) : await response.text()

  if (!response.ok) {
    const msg = (payload && payload.error) || (payload && payload.message) || response.statusText
    throw new ApiError(msg, { status: response.status, data: payload })
  }
  return payload
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}
