import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subscriptionService } from '../services/subscriptionService'
import { useAuth } from '../context/AuthContext'
import { bgColor, borderColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}
function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function SubscriptionDetail() {
  const { isAuthed, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [sub, setSub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthed) { navigate('/login', { state: { from: '/subscriptions/manage' } }); return }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed, authLoading])

  const load = async () => {
    setLoading(true)
    try {
      const res = await subscriptionService.mine()
      const list = res.data || []
      setSub(list.find((s) => ['pending', 'active', 'paused'].includes(s.status)) || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const wrap = async (fn) => {
    setBusy(true)
    setError(null)
    try { await fn(); await load() }
    catch (err) { setError(err.message || 'Something went wrong') }
    finally { setBusy(false) }
  }

  if (loading) return <p className="max-w-3xl mx-auto px-4 py-10 text-gray-500">Loading…</p>

  if (!sub) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className={`text-2xl font-semibold ${textColor('primary')}`}>No active subscription</h1>
        <p className="mt-2 text-gray-600">Explore our monthly plans to save on regular pickups.</p>
        <Link
          to="/subscriptions"
          className={`inline-block mt-6 px-5 py-2.5 rounded-lg text-white font-semibold ${bgColor('primary')} ${hoverBgColor('primary')}`}
        >
          Browse plans
        </Link>
      </div>
    )
  }

  const plan = sub.planSnapshot || {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>{plan.name}</h1>
      <p className="text-gray-600 mt-1">{formatRupees(plan.price)}/month · {plan.pickupsPerMonth} pickups</p>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className={`mt-6 rounded-2xl bg-white border ${borderColor('primaryLight')} p-6`}
      >
        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
          <StatusRow label="Status" value={<StatusBadge status={sub.status} />} />
          <StatusRow label="Started" value={formatDate(sub.startedAt)} />
          <StatusRow label="Current period" value={`${formatDate(sub.currentPeriodStart)} – ${formatDate(sub.currentPeriodEnd)}`} />
          <StatusRow label="Next billing" value={formatDate(sub.nextBillingDate)} />
          {sub.status === 'paused' && sub.pausedUntil && (
            <StatusRow label="Auto-resumes" value={formatDate(sub.pausedUntil)} />
          )}
        </dl>
      </motion.div>

      {sub.remainingQuota?.length > 0 && (
        <section className="mt-8">
          <h2 className={`font-semibold ${textColor('primary')}`}>Remaining quota this cycle</h2>
          <ul className="mt-3 divide-y">
            {sub.remainingQuota.map((q, i) => (
              <li key={i} className="py-3 flex justify-between">
                <span className="text-gray-700">{q.description}</span>
                <span className="font-semibold text-gray-900">{q.quantity}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <div className="mt-8 flex flex-wrap gap-3">
        {sub.status === 'active' && (
          <button
            disabled={busy}
            onClick={() => wrap(() => subscriptionService.pause(sub._id))}
            className="px-5 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700"
          >
            Pause
          </button>
        )}
        {sub.status === 'paused' && (
          <button
            disabled={busy}
            onClick={() => wrap(() => subscriptionService.resume(sub._id))}
            className={`px-5 py-2.5 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')}`}
          >
            Resume
          </button>
        )}
        <button
          disabled={busy}
          onClick={() => {
            if (window.confirm('Cancel this subscription? You’ll keep access until the current period ends.')) {
              wrap(() => subscriptionService.cancel(sub._id))
            }
          }}
          className="px-5 py-2.5 rounded-lg font-semibold border border-red-300 text-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function StatusRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-gray-900 font-medium">{value}</dd>
    </div>
  )
}

function StatusBadge({ status }) {
  const cls =
    status === 'active' ? 'bg-green-100 text-green-800'
    : status === 'paused' ? 'bg-yellow-100 text-yellow-800'
    : status === 'pending' ? 'bg-gray-100 text-gray-700'
    : 'bg-red-100 text-red-800'
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${cls}`}>{status}</span>
}
