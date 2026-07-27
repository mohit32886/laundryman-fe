import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { walletService } from '../services/walletService'
import { useAuth } from '../context/AuthContext'
import RazorpayButton from '../components/RazorpayButton'
import { bgColor, borderColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const TOPUP_AMOUNTS = [100, 200, 500, 1000, 2000]

export default function Wallet() {
  const { isAuthed, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [balance, setBalance] = useState(null)
  const [txns, setTxns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [topupOpen, setTopupOpen] = useState(false)
  const [amount, setAmount] = useState(500)
  const [topupInitiate, setTopupInitiate] = useState(null)
  const [initiating, setInitiating] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthed) { navigate('/login', { state: { from: '/wallet' } }); return }
    let alive = true
    walletService.summary()
      .then((res) => { if (!alive) return; setBalance(res.balance); setTxns(res.transactions || []) })
      .catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [isAuthed, authLoading, navigate])

  const refresh = async () => {
    const res = await walletService.summary()
    setBalance(res.balance)
    setTxns(res.transactions || [])
  }

  const handleInitiate = async () => {
    setInitiating(true)
    setError(null)
    try {
      const res = await walletService.topupInitiate(amount)
      setTopupInitiate(res)
    } catch (err) {
      setError(err.message || 'Failed to start topup')
    } finally {
      setInitiating(false)
    }
  }

  const handleTopupSuccess = async (response) => {
    try {
      await walletService.topupConfirm({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      })
      setTopupInitiate(null)
      setTopupOpen(false)
      await refresh()
    } catch (err) {
      setError(err.message || 'Topup confirmation failed')
      setTopupInitiate(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>Wallet</h1>
      <p className="text-gray-600 mt-1">Top up once, spend on any booking. Refunds also credit here.</p>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-3xl glass-panel-dark text-white p-8 border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Current Balance</p>
        <p className="text-4xl font-extrabold mt-2 text-white">
          {loading ? '…' : formatRupees(balance || 0)}
        </p>
        <button
          onClick={() => setTopupOpen((v) => !v)}
          className="mt-5 theme-cta-btn px-6 py-2.5 rounded-xl font-bold text-sm shadow-md"
        >
          {topupOpen ? 'Cancel' : '＋ Top Up Balance'}
        </button>
      </motion.div>

      <AnimatePresence>
        {topupOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`mt-4 rounded-2xl bg-white border ${borderColor('primaryLight')} p-5`}
          >
            {!topupInitiate ? (
              <>
                <p className="text-sm font-semibold text-gray-900">Choose an amount</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPUP_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-semibold ${amount === a ? borderColor('primary') + ' ' + textColor('primary') : 'border-gray-200 text-gray-700'}`}
                    >
                      {formatRupees(a)}
                    </button>
                  ))}
                </div>
                <label className="mt-3 block">
                  <span className="text-xs text-gray-500">Or custom (₹100–₹50,000)</span>
                  <input
                    type="number" min="100" max="50000" step="50"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(100, Math.min(50000, Number(e.target.value) || 0)))}
                    className={`mt-1 w-full py-2.5 px-3 rounded-lg border ${borderColor('primaryLight')}`}
                  />
                </label>

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={initiating || amount < 100}
                  onClick={handleInitiate}
                  className={`mt-4 w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
                >
                  {initiating ? 'Please wait…' : `Continue with ${formatRupees(amount)}`}
                </motion.button>
              </>
            ) : (
              <RazorpayButton
                initiateResponse={topupInitiate}
                onSuccess={handleTopupSuccess}
                onFailure={(err) => { setError(err?.message); setTopupInitiate(null) }}
                label={`Pay ${formatRupees(amount)}`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-10">
        <h2 className={`text-lg font-semibold ${textColor('primary')}`}>Recent activity</h2>
        {loading && <p className="mt-3 text-gray-500">Loading…</p>}
        {!loading && txns.length === 0 && (
          <p className="mt-3 text-gray-500 text-sm">No transactions yet.</p>
        )}
        <ul className="mt-4 divide-y">
          {txns.map((t) => (
            <li key={t._id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {labelForSource(t.source, t.type)}
                </p>
                <p className="text-xs text-gray-500">{formatDate(t.createdAt)}</p>
              </div>
              <p className={`font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                {t.type === 'credit' ? '+' : '−'}{formatRupees(t.amount)}
              </p>
            </li>
          ))}
        </ul>

        {txns.length > 0 && (
          <Link to="/wallet/history" className={`mt-3 inline-block text-sm ${textColor('primary')} underline`}>
            View full history
          </Link>
        )}
      </section>
    </div>
  )
}

function labelForSource(source, type) {
  switch (source) {
    case 'topup': return 'Wallet top-up'
    case 'refund': return 'Refund credited'
    case 'order_payment': return 'Paid for order'
    case 'referral_bonus': return 'Referral bonus'
    case 'signup_bonus': return 'Signup bonus'
    case 'admin_adjustment': return type === 'credit' ? 'Admin credit' : 'Admin adjustment'
    default: return type === 'credit' ? 'Credit' : 'Debit'
  }
}
