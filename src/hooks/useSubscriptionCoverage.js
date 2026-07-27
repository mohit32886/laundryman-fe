import { useEffect, useMemo, useState } from 'react'
import { subscriptionService } from '../services/subscriptionService'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const ACTIVE_STATES = new Set(['active'])

/**
 * Returns the customer's live subscription-quota availability, adjusted for items
 * already in the cart. Guarded — returns empty state for guests or customers with
 * no active plan.
 */
export function useSubscriptionCoverage() {
  const { isAuthed, loading: authLoading } = useAuth()
  const { cart } = useCart()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthed) { setSubscription(null); setLoading(false); return }
    let alive = true
    setLoading(true)
    subscriptionService.mine()
      .then((res) => {
        if (!alive) return
        const active = (res.data || []).find((s) => ACTIVE_STATES.has(s.status))
        setSubscription(active || null)
      })
      .catch(() => { if (alive) setSubscription(null) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [isAuthed, authLoading])

  const availableByProduct = useMemo(() => {
    const map = new Map()
    if (!subscription) return map
    for (const q of subscription.remainingQuota || []) {
      if (!q.productId) continue
      map.set(q.productId, (map.get(q.productId) || 0) + (q.quantity || 0))
    }
    // Subtract cart items so chips reflect what's still available at that moment.
    for (const item of cart.items || []) {
      if (!item.productId || !map.has(item.productId)) continue
      const remaining = map.get(item.productId) - item.quantity
      map.set(item.productId, Math.max(0, remaining))
    }
    return map
  }, [subscription, cart.items])

  const totalRemaining = useMemo(() => {
    let n = 0
    for (const v of availableByProduct.values()) n += v
    return n
  }, [availableByProduct])

  return {
    loading,
    hasActive: Boolean(subscription),
    planName: subscription?.planSnapshot?.name || null,
    planSlug: subscription?.planSnapshot?.slug || null,
    subscriptionId: subscription?._id || null,
    availableByProduct,
    totalRemaining,
  }
}
