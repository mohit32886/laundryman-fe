import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import CouponInput from '../components/CouponInput'
import WalletToggle from '../components/WalletToggle'
import { bgColor, borderColor, hoverBgColor, textColor } from '../utils/classNames'

function coverageByItemId(coverage) {
  const map = new Map()
  for (const b of coverage?.breakdown || []) {
    if (b.productId) {
      map.set(b.productId, {
        quantity: b.appliedQuantity,
        value: b.totalValue,
      })
    }
  }
  return map
}

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export default function Cart() {
  const navigate = useNavigate()
  const { cart, loading, itemCount, updateItem, removeItem } = useCart()
  const coverage = coverageByItemId(cart.subscriptionCoverage)

  const handleQty = async (item, delta) => {
    const next = Math.max(1, item.quantity + delta)
    if (next === item.quantity) return
    try { await updateItem(item._id, { quantity: next }) } catch (err) { console.error(err) }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>Your cart</h1>
      <p className="text-gray-600 mt-1">
        {itemCount === 0 ? 'No items yet' : `${itemCount} item${itemCount === 1 ? '' : 's'}`}
      </p>

      {loading && cart.items.length === 0 && (
        <p className="mt-10 text-gray-500">Loading…</p>
      )}

      {!loading && cart.items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-10 rounded-2xl border border-dashed p-10 text-center"
        >
          <p className="text-gray-700">Your cart is empty.</p>
          <Link to="/pricing" className={`inline-block mt-4 px-5 py-2.5 rounded-lg text-white font-semibold ${bgColor('primary')} ${hoverBgColor('primary')}`}>
            Browse services
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
        {cart.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]"
          >
            <ul className="space-y-3">
              {cart.items.map((item) => {
                const itemPrice = Number(item.price ?? item.unitPrice ?? item.unitRate ?? 0)
                const cov = item.productId ? coverage.get(item.productId) : null
                const covered = cov?.quantity || 0
                const lineTotal = itemPrice * item.quantity
                const chargedTotal = Math.max(0, lineTotal - (cov?.value || 0))
                return (
                  <li
                    key={item._id}
                    className={`flex items-center justify-between gap-4 rounded-xl border ${borderColor('primaryLight')} bg-white p-4`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.description}</p>
                      <p className="text-sm text-gray-500">{formatRupees(itemPrice)} each</p>
                      {covered > 0 && (
                        <motion.span
                          initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }}
                          className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${bgColor('bgLighter')} ${textColor('primary')}`}
                        >
                          {covered} free with your plan
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="decrease"
                        onClick={() => handleQty(item, -1)}
                        className="w-8 h-8 rounded-full border text-lg leading-none"
                      >-</button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        aria-label="increase"
                        onClick={() => handleQty(item, +1)}
                        className="w-8 h-8 rounded-full border text-lg leading-none"
                      >+</button>
                    </div>
                    <div className="text-right w-24">
                      {covered > 0 && chargedTotal < lineTotal ? (
                        <>
                          <p className="text-xs text-gray-400 line-through">{formatRupees(lineTotal)}</p>
                          <p className="font-semibold">{formatRupees(chargedTotal)}</p>
                        </>
                      ) : (
                        <p className="font-semibold">{formatRupees(lineTotal)}</p>
                      )}
                      <button
                        className="text-xs text-red-600 mt-1 underline"
                        onClick={() => removeItem(item._id)}
                      >Remove</button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <aside className={`rounded-2xl bg-white border ${borderColor('primaryLight')} p-6 h-fit space-y-5`}>
              <div>
                <h2 className="font-semibold text-gray-900">Order summary</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="text-gray-900">{formatRupees(cart.subtotal)}</dd>
                  </div>
                  {cart.subscriptionCovered > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Subscription cover</dt>
                      <dd className={textColor('primary')}>- {formatRupees(cart.subscriptionCovered)}</dd>
                    </div>
                  )}
                  {cart.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Coupon</dt>
                      <dd className="text-green-700">- {formatRupees(cart.discountAmount)}</dd>
                    </div>
                  )}
                  {cart.walletApplied > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Wallet</dt>
                      <dd className="text-green-700">- {formatRupees(cart.walletApplied)}</dd>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <dt>Total</dt>
                    <dd>{formatRupees(cart.total)}</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Coupon
                </p>
                <CouponInput />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Wallet
                </p>
                <WalletToggle />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')}`}
              >
                Proceed to checkout
              </motion.button>
              <Link
                to="/pricing"
                className={`block text-center text-sm ${textColor('primary')} underline`}
              >
                Continue shopping
              </Link>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
