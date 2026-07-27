import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { orderService } from '../services/checkoutService'
import OrderStatusStepper from '../components/OrderStatusStepper'
import { bgColor, borderColor, focusRingColor, hoverBgColor, textColor } from '../utils/classNames'

export default function OrderTracking() {
  const { ticketNumber: paramTicket } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(paramTicket || '')
  const [status, setStatus] = useState(null)
  const [expected, setExpected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (t) => {
    if (!t) return
    setLoading(true)
    setError('')
    setStatus(null)
    try {
      const res = await orderService.publicStatus(t.trim())
      setStatus(res.data?.status || 'Booking Confirmed')
      setExpected(res.data?.expectedDelivery || null)
    } catch (err) {
      setError(err.status === 404 ? 'No order found for that ticket number' : err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (paramTicket) load(paramTicket)
  }, [paramTicket])

  const submit = (e) => {
    e.preventDefault()
    if (!ticket.trim()) return
    navigate(`/track/${encodeURIComponent(ticket.trim())}`)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>Track your order</h1>
      <p className="text-gray-600 mt-1">Enter the ticket number from your confirmation.</p>

      <form onSubmit={submit} className="mt-6 flex gap-2">
        <input
          className={`flex-1 py-2.5 px-3 rounded-lg border ${borderColor('primaryLight')} outline-none focus:ring-2 ${focusRingColor('primary')}`}
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          placeholder="e.g. 260201-001-00001"
        />
        <motion.button
          whileTap={{ scale: 0.98 }}
          className={`px-4 py-2.5 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')}`}
        >
          Track
        </motion.button>
      </form>

      {loading && <p className="mt-8 text-gray-500">Loading…</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      {status && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`mt-8 rounded-2xl bg-white border ${borderColor('primaryLight')} p-6`}
        >
          <p className="text-sm text-gray-500">Ticket</p>
          <p className="font-mono font-semibold text-gray-900">{paramTicket}</p>
          {expected && (
            <p className="text-sm text-gray-500 mt-3">
              Expected delivery: <span className="text-gray-900 font-medium">
                {new Date(expected).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </p>
          )}
          <div className="mt-6">
            <OrderStatusStepper status={status} />
          </div>
        </motion.div>
      )}
    </div>
  )
}
