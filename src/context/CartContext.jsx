import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { cartService } from '../services/cartService'
import { couponService } from '../services/couponService'
import { walletService } from '../services/walletService'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

const EMPTY_CART = {
  items: [], subtotal: 0, discountAmount: 0, walletApplied: 0,
  subscriptionCovered: 0, subscriptionCoverage: null, total: 0,
}

export function CartProvider({ children }) {
  const { isAuthed } = useAuth()
  const [cart, setCart] = useState(EMPTY_CART)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await cartService.getCart()
      setCart(res?.cart || EMPTY_CART)
    } catch (err) {
      setError(err.message || 'Failed to load cart from server')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh, isAuthed])

  const addItem = useCallback(async (item) => {
    const res = await cartService.addItem(item)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const updateItem = useCallback(async (itemId, patch) => {
    const res = await cartService.updateItem(itemId, patch)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const removeItem = useCallback(async (itemId) => {
    const res = await cartService.removeItem(itemId)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const setPickupSlot = useCallback(async (slot) => {
    const res = await cartService.setPickupSlot(slot)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const clearCart = useCallback(async () => {
    await cartService.clearCart()
    setCart(EMPTY_CART)
  }, [])

  const applyCoupon = useCallback(async (code) => {
    const res = await couponService.apply(code)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const removeCoupon = useCallback(async () => {
    const res = await couponService.remove()
    setCart(res?.cart || EMPTY_CART)
    return res
  }, [])

  const applyWallet = useCallback(async (amount) => {
    const res = await walletService.apply(amount)
    if (res?.cart) {
      setCart(res.cart)
    }
    return res
  }, [])

  const removeWallet = useCallback(async () => {
    const res = await walletService.remove()
    setCart(res?.cart || EMPTY_CART)
    return res
  }, [])

  const itemCount = (cart?.items || []).reduce((n, i) => n + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart, loading, error, itemCount,
      refresh, addItem, updateItem, removeItem, setPickupSlot, clearCart,
      applyCoupon, removeCoupon, applyWallet, removeWallet,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
