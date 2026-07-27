import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { storage } from '../services/apiClient'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => storage.getCustomer())
  const [token, setToken] = useState(() => storage.getToken())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token || customer) return
    setLoading(true)
    authService.getMe()
      .then((res) => {
        setCustomer(res.customer)
        storage.setCustomer(res.customer)
      })
      .catch(() => {
        storage.clearToken()
        storage.setCustomer(null)
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token, customer])

  const login = useCallback(({ token: newToken, customer: newCustomer }) => {
    storage.setToken(newToken)
    storage.setCustomer(newCustomer)
    setToken(newToken)
    setCustomer(newCustomer)
  }, [])

  const logout = useCallback(() => {
    storage.clearToken()
    storage.setCustomer(null)
    setToken(null)
    setCustomer(null)
  }, [])

  const refresh = useCallback(async () => {
    const res = await authService.getMe()
    setCustomer(res.customer)
    storage.setCustomer(res.customer)
    return res.customer
  }, [])

  return (
    <AuthContext.Provider value={{ customer, token, isAuthed: Boolean(token), loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
