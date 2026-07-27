import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { bgColor, borderColor, hoverBgColor, textColor } from '../utils/classNames'

/**
 * Small add/qty-stepper widget for a product tile.
 * Merges by productId + description on the backend, so the same tile clicked
 * multiple times increments qty instead of stacking new lines.
 */
export default function AddToCartButton({ productId, description, price, className = '' }) {
  const { cart, addItem, updateItem, removeItem } = useCart()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const existing = cart.items.find(
    (it) => it.productId === productId && it.description === description
  )

  const wrap = async (fn) => {
    setBusy(true)
    setError(null)
    try { await fn() } catch (err) { setError(err.message || 'Something went wrong') }
    finally { setBusy(false) }
  }

  const handleAdd = () => wrap(() => addItem({ productId, description, price, quantity: 1 }))
  const handleInc = () => existing && wrap(() => updateItem(existing._id, { quantity: existing.quantity + 1 }))
  const handleDec = () => {
    if (!existing) return
    if (existing.quantity <= 1) return wrap(() => removeItem(existing._id))
    return wrap(() => updateItem(existing._id, { quantity: existing.quantity - 1 }))
  }

  return (
    <div className={`inline-flex flex-col items-end ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {existing ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`inline-flex items-center gap-2 rounded-full border ${borderColor('primary')} ${bgColor('bgLighter')} px-1 py-1`}
          >
            <button
              aria-label="Decrease"
              onClick={handleDec}
              disabled={busy}
              className={`w-7 h-7 rounded-full ${bgColor('primary')} ${hoverBgColor('primary')} text-white text-lg leading-none disabled:opacity-50`}
            >−</button>
            <span className={`min-w-[1.5rem] text-center font-semibold ${textColor('primary')}`}>
              {existing.quantity}
            </span>
            <button
              aria-label="Increase"
              onClick={handleInc}
              disabled={busy}
              className={`w-7 h-7 rounded-full ${bgColor('primary')} ${hoverBgColor('primary')} text-white text-lg leading-none disabled:opacity-50`}
            >+</button>
          </motion.div>
        ) : (
          <motion.button
            key="add"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={handleAdd}
            disabled={busy}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
          >
            {busy ? 'Adding…' : 'Add'}
          </motion.button>
        )}
      </AnimatePresence>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
