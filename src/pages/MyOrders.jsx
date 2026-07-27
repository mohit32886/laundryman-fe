import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { orderService } from '../services/checkoutService'
import { useAuth } from '../context/AuthContext'
import { bgColor, borderColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const TERMINAL = new Set(['Delivered', 'Cancelled', 'Refund', 'Return'])

function statusColor(status) {
  if (status === 'Delivered') return 'bg-green-100 text-green-800'
  if (status === 'Cancelled' || status === 'Refund' || status === 'Return') return 'bg-red-100 text-red-800'
  if (status === 'Out for Delivery') return 'bg-yellow-100 text-yellow-800'
  return 'bg-blue-100 text-blue-800'
}

export default function MyOrders() {
  const navigate = useNavigate()
  const { isAuthed, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthed) { navigate('/login', { state: { from: '/my-orders' } }); return }
    let alive = true
    orderService.myOrders({ limit: 20 })
      .then((res) => { if (alive) setOrders(res.data || []) })
      .catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [isAuthed, authLoading, navigate])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>My orders</h1>
      <p className="text-gray-600 mt-1">Every booking you’ve placed with us.</p>

      {loading && <p className="mt-8 text-gray-500">Loading…</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      {!loading && orders.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed p-10 text-center">
          <p className="text-gray-700">No orders yet.</p>
          <Link
            to="/pricing"
            className={`inline-block mt-4 px-5 py-2.5 rounded-lg text-white font-semibold ${bgColor('primary')} ${hoverBgColor('primary')}`}
          >
            Browse services
          </Link>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {orders.map((order) => (
          <motion.li
            key={order._id}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl bg-white border ${borderColor('primaryLight')} p-4 sm:p-5 hover:shadow-md transition-shadow`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-sm text-gray-500">#{order.ticketNumber}</p>
                <p className="mt-1 font-semibold text-gray-900 truncate">
                  {order.items?.length || 0} item{order.items?.length === 1 ? '' : 's'}
                  {' · '}
                  <span className="text-gray-700">{formatRupees(order.totalAmount)}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Placed {formatDate(order.orderDate)}
                  {order.expectedDelivery && !TERMINAL.has(order.status) && (
                    <> · expected {formatDate(order.expectedDelivery)}</>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  {order.paymentStatus}
                </span>
                <Link
                  to={`/track/${encodeURIComponent(order.ticketNumber)}`}
                  className={`text-sm ${textColor('primary')} underline`}
                >
                  Track
                </Link>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
