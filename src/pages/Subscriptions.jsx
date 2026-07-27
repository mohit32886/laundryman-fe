import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subscriptionService } from '../services/subscriptionService'
import { useAuth } from '../context/AuthContext'
import RazorpayButton from '../components/RazorpayButton'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export default function Subscriptions() {
  const navigate = useNavigate()
  const { isAuthed, loading: authLoading } = useAuth()
  const [plans, setPlans] = useState([])
  const [mine, setMine] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [initiate, setInitiate] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all([
      subscriptionService.listPlans(),
      isAuthed ? subscriptionService.mine().catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
    ]).then(([p, m]) => {
      if (!alive) return
      setPlans(p.data || [])
      setMine((m.data || []).filter((s) => s.status !== 'cancelled'))
    }).catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [isAuthed])

  const active = mine.find((s) => ['pending', 'active', 'paused'].includes(s.status))

  const handleSubscribe = async (slug) => {
    if (!isAuthed) {
      navigate('/login', { state: { from: '/subscriptions' } })
      return
    }
    setError(null)
    setSelectedPlan(slug)
    setSubmitting(true)
    try {
      const res = await subscriptionService.subscribe(slug)
      setInitiate(res)
    } catch (err) {
      setError(err.message || 'Failed to start subscription')
      setSelectedPlan(null)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSuccess = async (response) => {
    try {
      await subscriptionService.confirm({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      })
      navigate('/subscriptions/manage')
    } catch (err) {
      setError(err.message || 'Failed to confirm subscription')
      setInitiate(null)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden theme-hero-bg text-white py-20 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💳 Monthly Subscriptions & Packages
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Subscribe & <span className="theme-title-gradient">SAVE BIG</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Pay once a month, laundry sorted. Free doorstep collection, priority processing, pause or cancel anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading && <p className="text-center text-slate-500 font-medium py-10">Loading subscription plans…</p>}
        {error && <p className="text-center text-red-600 font-semibold mb-6 bg-red-50 p-4 rounded-xl border border-red-200">{error}</p>}

        {active && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl border-2 border-cyan-500/50 bg-white/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-xl"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">Active Subscription</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {active.planSnapshot?.name} — {formatRupees(active.planSnapshot?.price)}/mo
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Status: <span className="font-bold text-emerald-600 capitalize">{active.status}</span>
              </p>
            </div>
            <Link
              to="/subscriptions/manage"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Manage Plan →
            </Link>
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isActiveForCustomer = active?.planSnapshot?.slug === plan.slug
            return (
              <motion.div
                key={plan.slug}
                whileHover={{ y: -6 }}
                className={`glass-card rounded-3xl border-2 bg-white/80 p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all ${
                  isActiveForCustomer ? 'border-cyan-500 shadow-cyan-500/10' : 'border-white/60'
                }`}
              >
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{plan.description}</p>
                  
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">{formatRupees(plan.price)}</span>
                    <span className="text-slate-500 font-medium text-sm"> / month</span>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What's Included</p>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {plan.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  {isActiveForCustomer ? (
                    <button
                      disabled
                      className="w-full py-3.5 rounded-xl font-bold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed text-center"
                    >
                      Currently Active
                    </button>
                  ) : initiate && selectedPlan === plan.slug ? (
                    <RazorpayButton
                      initiateResponse={initiate}
                      onSuccess={handleSuccess}
                      onFailure={(err) => { setError(err?.message); setInitiate(null); setSelectedPlan(null) }}
                      label={`Pay ${formatRupees(plan.price)}`}
                      description={`${plan.name} plan (first month)`}
                    />
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      disabled={submitting || Boolean(active)}
                      onClick={() => handleSubscribe(plan.slug)}
                      className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting && selectedPlan === plan.slug ? 'Please wait…' : (active ? 'Only one active plan' : 'Choose Plan')}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {!plans.length && !loading && (
          <p className="mt-12 text-slate-500 text-center font-medium">No active subscription plans available right now.</p>
        )}
      </div>
    </div>
  )
}
