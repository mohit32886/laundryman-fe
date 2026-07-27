import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { bgColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { refresh } = useCart()
  const order = location.state?.order

  useEffect(() => {
    // Cart is deleted server-side on confirm; sync local state.
    refresh().catch(() => {})
  }, [refresh])

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Nothing to show here</h1>
        <button className={`mt-6 px-5 py-2.5 rounded-lg text-white ${bgColor('primary')} ${hoverBgColor('primary')}`} onClick={() => navigate('/')}>Go home</button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white shadow-lg p-8 text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className={`mt-4 text-2xl font-semibold ${textColor('primary')}`}>Booking confirmed</h1>
        <p className="mt-2 text-gray-600">
          {order.paymentMethod === 'Subscription'
            ? 'Covered by your plan. We’ll pick up your laundry at the scheduled time.'
            : order.paymentStatus === 'Paid'
            ? 'Payment received. We’ll pick up your laundry at the scheduled time.'
            : 'Booked with cash-on-delivery. Pay when we deliver.'}
        </p>

        <dl className="mt-6 text-left text-sm space-y-2">
          <div className="flex justify-between">
            <dt className="text-gray-600">Ticket number</dt>
            <dd className="font-mono font-semibold">{order.ticketNumber}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Total</dt>
            <dd className="font-semibold">{formatRupees(order.totalAmount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Payment status</dt>
            <dd>{order.paymentStatus}</dd>
          </div>
          {order.expectedDelivery && (
            <div className="flex justify-between">
              <dt className="text-gray-600">Expected delivery</dt>
              <dd>{new Date(order.expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</dd>
            </div>
          )}
        </dl>

        <div className="mt-8 grid gap-3">
          <Link
            to={`/track/${order.ticketNumber}`}
            className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')}`}
          >
            Track order
          </Link>
          <Link to="/" className="w-full py-3 rounded-lg font-semibold border border-gray-200 text-gray-700">
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
