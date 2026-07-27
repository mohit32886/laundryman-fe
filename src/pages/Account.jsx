import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'
import { bgColor, borderColor, focusRingColor, hoverBgColor, textColor } from '../utils/classNames'

const inputCls = (extra = '') =>
  `w-full py-2.5 px-3 rounded-lg border ${extra} outline-none focus:ring-2 ${focusRingColor('primary')}`

export default function Account() {
  const navigate = useNavigate()
  const { customer, isAuthed, loading: authLoading, logout, refresh } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', state: '', pincode: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthed) { navigate('/login', { state: { from: '/account' } }); return }
    if (customer) {
      setForm({
        name: customer.name || '',
        email: customer.email || '',
        address: customer.address || '',
        city: customer.city || '',
        state: customer.state || '',
        pincode: customer.pincode || '',
      })
    }
  }, [customer, isAuthed, authLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      await authService.updateMe(form)
      await refresh()
      setMessage('Profile updated')
    } catch (err) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const referralUrl = customer?.referralCode
    ? `${window.location.origin}/login?ref=${customer.referralCode}`
    : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>Account</h1>
      <p className="text-gray-600 mt-1">{customer?.phoneNumber && `+${customer.phoneNumber}`}</p>

      {customer?.referralCode && (
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl glass-panel-dark text-white p-6 border border-slate-800 shadow-xl relative overflow-hidden"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Your Referral Code</p>
          <p className="text-3xl font-extrabold font-mono mt-1 text-white">{customer.referralCode}</p>
          <p className="text-xs text-slate-300 mt-2">
            Share with friends — both get wallet credit when they place their first order.
          </p>
          {referralUrl && (
            <button
              onClick={() => navigator.clipboard?.writeText(referralUrl)}
              className="mt-4 theme-cta-btn px-5 py-2 rounded-xl font-bold text-xs shadow-md"
            >
              📋 Copy Signup Link
            </button>
          )}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className={`mt-8 rounded-2xl bg-white border ${borderColor('primaryLight')} p-6 space-y-4`}>
        <h2 className="font-semibold text-gray-900">Profile</h2>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input className={inputCls(borderColor('primaryLight'))} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input type="email" className={inputCls(borderColor('primaryLight'))} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Address</span>
          <textarea rows={2} className={inputCls(borderColor('primaryLight'))} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">City</span>
            <input className={inputCls(borderColor('primaryLight'))} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">State</span>
            <input className={inputCls(borderColor('primaryLight'))} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Pincode</span>
            <input className={inputCls(borderColor('primaryLight'))} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} />
          </label>
        </div>

        {message && <p className="text-sm text-green-700">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={saving}
          className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </motion.button>
      </form>

      <div className="mt-6 flex justify-end">
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Sign out
        </button>
      </div>
    </div>
  )
}
