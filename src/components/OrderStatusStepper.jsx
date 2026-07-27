import { motion } from 'framer-motion'
import { bgColor, textColor } from '../utils/classNames'

// Sequence mirrors server/models/Order.js status enum, condensed for the customer view.
const STEPS = [
  { key: 'Booking Confirmed', label: 'Booked' },
  { key: 'Pickup In Progress', label: 'Pickup on the way' },
  { key: 'Received in Workshop', label: 'Received' },
  { key: 'Washing', label: 'Cleaning' },
  { key: 'Quality Check', label: 'Quality check' },
  { key: 'Ready for Delivery', label: 'Ready' },
  { key: 'Out for Delivery', label: 'Out for delivery' },
  { key: 'Delivered', label: 'Delivered' },
]

const IN_CLEANING = new Set([
  'Sorting', 'Spotting', 'Washing', 'Dry Cleaning', 'Drying', 'Ironing',
])

const TERMINAL_ISSUES = new Set(['Cancelled', 'Refund', 'Return'])

function currentIndex(status) {
  if (!status) return 0
  if (IN_CLEANING.has(status)) return STEPS.findIndex((s) => s.key === 'Washing')
  const idx = STEPS.findIndex((s) => s.key === status)
  return idx === -1 ? 0 : idx
}

export default function OrderStatusStepper({ status }) {
  if (TERMINAL_ISSUES.has(status)) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-800">
        Order status: <span className="font-semibold">{status}</span>
      </div>
    )
  }
  const active = currentIndex(status)

  return (
    <ol className="space-y-4">
      {STEPS.map((step, idx) => {
        const state = idx < active ? 'done' : idx === active ? 'active' : 'todo'
        return (
          <li key={step.key} className="flex items-start gap-3">
            <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 ${state === 'todo' ? 'bg-gray-200' : bgColor('primary')}`}>
              {state === 'active' && (
                <motion.div
                  className="w-full h-full rounded-full"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${state === 'todo' ? 'text-gray-500' : textColor('primary')}`}>
                {step.label}
              </p>
              {state === 'active' && (
                <p className="text-xs text-gray-500 mt-0.5">Current stage</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
