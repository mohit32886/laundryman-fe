import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { bgColor, borderColor, focusRingColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export default function CouponInput() {
  const { cart, applyCoupon, removeCoupon } = useCart()
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const applied = Boolean(cart.couponCode)

  const handleApply = async (e) => {
    e?.preventDefault()
    setError(null)
    if (!code.trim()) return
    setBusy(true)
    try {
      await applyCoupon(code.trim().toUpperCase())
      setCode('')
    } catch (err) {
      setError(err.message || 'Failed to apply coupon')
    } finally {
      setBusy(false)
    }
  }

  const handleRemove = async () => {
    setBusy(true)
    setError(null)
    try { await removeCoupon() }
    catch (err) { setError(err.message || 'Failed to remove') }
    finally { setBusy(false) }
  }

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {applied ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className={`flex items-center justify-between gap-3 rounded-lg border ${borderColor('primaryLight')} bg-green-50 px-3 py-2.5`}
          >
            <div>
              <p className={`font-semibold ${textColor('primary')} text-sm`}>{cart.couponCode}</p>
              <p className="text-xs text-green-700">−{formatRupees(cart.discountAmount)} off</p>
            </div>
            <button
              disabled={busy}
              onClick={handleRemove}
              className="text-xs text-red-600 underline disabled:opacity-50"
            >
              Remove
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="input"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            onSubmit={handleApply}
            className="flex gap-2"
          >
            <input
              className={`flex-1 py-2.5 px-3 rounded-lg border ${borderColor('primaryLight')} uppercase text-sm outline-none focus:ring-2 ${focusRingColor('primary')}`}
              placeholder="Coupon code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              disabled={busy}
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={busy || !code.trim()}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
            >
              {busy ? '…' : 'Apply'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
