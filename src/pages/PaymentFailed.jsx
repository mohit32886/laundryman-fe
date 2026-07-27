import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { bgColor, hoverBgColor } from '../utils/classNames'

export default function PaymentFailed() {
  const location = useLocation()
  const reason = location.state?.reason || 'The payment was not completed.'

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white shadow-lg p-8 text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round"/></svg>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Payment failed</h1>
        <p className="mt-2 text-gray-600">{reason}</p>
        <p className="mt-1 text-sm text-gray-500">Your cart is safe — try again with a different method.</p>

        <div className="mt-8 grid gap-3">
          <Link to="/checkout" className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')}`}>
            Try again
          </Link>
          <Link to="/cart" className="w-full py-3 rounded-lg font-semibold border border-gray-200 text-gray-700">
            Back to cart
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
