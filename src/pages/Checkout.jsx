import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { checkoutService } from '../services/checkoutService'
import RazorpayButton from '../components/RazorpayButton'
import { bgColor, borderColor, focusRingColor, hoverBgColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

const TIME_WINDOWS = [
  '09:00 - 11:00',
  '11:00 - 13:00',
  '15:00 - 17:00',
  '17:00 - 19:00',
]

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, setPickupSlot, clearCart, loading: cartLoading } = useCart()
  const { customer, isAuthed } = useAuth()

  const [name, setName] = useState(customer?.name || '')
  const [phone, setPhone] = useState(customer?.phoneNumber?.slice(-10) || '')
  const [slotDate, setSlotDate] = useState(cart.pickupSlot?.date ? cart.pickupSlot.date.slice(0, 10) : todayIso())
  const [timeWindow, setTimeWindow] = useState(cart.pickupSlot?.timeWindow || TIME_WINDOWS[0])
  const [address, setAddress] = useState(cart.pickupSlot?.address || '')
  const [city, setCity] = useState(cart.pickupSlot?.city || 'Ranchi')
  const [pincode, setPincode] = useState(cart.pickupSlot?.pincode || '')
  const [landmark, setLandmark] = useState(cart.pickupSlot?.landmark || '')

  const [method, setMethod] = useState('razorpay')
  const [initiateResponse, setInitiateResponse] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    if (!cart.items.length) return false
    if (!isAuthed && (!name.trim() || phone.replace(/\D/g, '').length < 10)) return false
    if (!address.trim() || !slotDate || !timeWindow) return false
    return true
  }, [cart.items.length, isAuthed, name, phone, address, slotDate, timeWindow])

  useEffect(() => {
    if (!cartLoading && !cart.items.length && !submitting) {
      navigate('/cart', { replace: true })
    }
  }, [cart.items.length, cartLoading, navigate, submitting])

  const persistSlot = async () => {
    return setPickupSlot({
      date: new Date(`${slotDate}T00:00:00`).toISOString(),
      timeWindow,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      landmark: landmark.trim(),
    })
  }

  const handleInitiate = async () => {
    setError('')
    setSubmitting(true)
    try {
      await persistSlot()
      const payload = { method }
      if (!isAuthed) {
        payload.name = name.trim()
        payload.phoneNumber = phone.replace(/\D/g, '')
      }

      const res = await checkoutService.initiate(payload)

      if (res.method === 'cod') {
        const confirmed = await checkoutService.confirm({ attemptId: res.attemptId })
        await clearCart()
        navigate('/payment/success', { state: { order: confirmed.order } })
        return
      }
      setInitiateResponse(res)
    } catch (err) {
      setError(err.message || 'Failed to start checkout')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSuccess = async (response) => {
    try {
      const confirmed = await checkoutService.confirm({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      })
      await clearCart()
      navigate('/payment/success', { state: { order: confirmed.order } })
    } catch (err) {
      handleFailure(err)
    }
  }

  const handleFailure = (err) => {
    setInitiateResponse(null)
    navigate('/payment/failed', { state: { reason: err?.message || 'Payment failed' } })
  }

  const inputCls = `w-full px-3 py-2 border rounded-lg outline-none transition-all ${borderColor('primaryLight')} ${focusRingColor('primary')}`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-semibold ${textColor('primary')}`}>Checkout</h1>
      <p className="text-gray-600 mt-1">Confirm pickup details and choose how you’d like to pay.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {!isAuthed && (
            <Section title="Contact">
              <Field label="Name">
                <input
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone">
                <div className="flex items-center rounded-lg border">
                  <span className="px-3 text-gray-500 text-sm">+91</span>
                  <input
                    className="flex-1 py-2.5 pr-3 outline-none bg-transparent"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="9006468666"
                  />
                </div>
              </Field>
            </Section>
          )}

          <Section title="Pickup slot">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date">
                <input
                  type="date"
                  min={todayIso()}
                  className={inputCls}
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                />
              </Field>
              <Field label="Time window">
                <select
                  className={inputCls}
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                >
                  {TIME_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </Field>
            </div>
          </Section>

          <Section title="Pickup address">
            <Field label="Address">
              <textarea
                rows={2}
                className={inputCls}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat / house number, street"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <Field label="City">
                <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} />
              </Field>
              <Field label="Pincode">
                <input
                  className={inputCls}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  inputMode="numeric"
                />
              </Field>
              <Field label="Landmark (optional)">
                <input className={inputCls} value={landmark} onChange={(e) => setLandmark(e.target.value)} />
              </Field>
            </div>
          </Section>

          <Section title="Payment method">
            <div className="grid gap-3 sm:grid-cols-2">
              <MethodOption
                selected={method === 'razorpay'}
                onSelect={() => setMethod('razorpay')}
                title="Pay online"
                subtitle="UPI, cards, netbanking via Razorpay"
              />
              <MethodOption
                selected={method === 'cod'}
                onSelect={() => setMethod('cod')}
                title="Cash on delivery"
                subtitle="Pay when we deliver"
              />
            </div>
          </Section>
        </div>

        <aside className={`rounded-2xl bg-white border ${borderColor('primaryLight')} p-6 h-fit`}>
          <h2 className="font-semibold text-gray-900">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd>{formatRupees(cart.subtotal)}</dd>
            </div>
            {cart.subscriptionCovered > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Subscription cover</dt>
                <dd className="text-green-700">- {formatRupees(cart.subscriptionCovered)}</dd>
              </div>
            )}
            {cart.discountAmount > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Discount</dt>
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

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {!initiateResponse && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={!canSubmit || submitting}
              onClick={handleInitiate}
              className={`mt-5 w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
            >
              {submitting ? 'Please wait…' : (method === 'cod' ? 'Confirm booking' : 'Continue to payment')}
            </motion.button>
          )}

          {initiateResponse && method === 'razorpay' && (
            <div className="mt-5">
              <RazorpayButton
                initiateResponse={initiateResponse}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                label={`Pay ${formatRupees(cart.total)}`}
              />
              <button
                className="mt-3 w-full text-sm text-gray-500 underline"
                onClick={() => setInitiateResponse(null)}
              >
                Change details
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className={`rounded-2xl bg-white border ${borderColor('primaryLight')} p-6`}>
      <h2 className="font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  )
}

function MethodOption({ selected, onSelect, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left p-4 rounded-xl border transition-all ${
        selected
          ? `${borderColor('primary')} ${bgColor('bgLighter')}`
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900 text-sm">{title}</span>
        <input type="radio" checked={selected} onChange={() => {}} className="accent-cyan-600" />
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </button>
  )
}
