import { useState } from 'react'
import { motion } from 'framer-motion'
import { bgColor, hoverBgColor } from '../utils/classNames'

const RZP_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(window.Razorpay)
    const existing = document.querySelector(`script[src="${RZP_SCRIPT}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay))
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = RZP_SCRIPT
    s.onload = () => resolve(window.Razorpay)
    s.onerror = reject
    document.body.appendChild(s)
  })
}

/**
 * initiateResponse must contain: razorpayOrderId, razorpayKeyId, amount, currency,
 * customerName, customerPhone.
 * onSuccess receives the raw Razorpay payment response { razorpay_order_id, razorpay_payment_id,
 * razorpay_signature } — the parent is responsible for calling its confirm endpoint (checkout vs
 * wallet topup).
 */
export default function RazorpayButton({
  initiateResponse,
  onSuccess,
  onFailure,
  label = 'Pay now',
  disabled = false,
  description = 'Laundry service booking',
}) {
  const [busy, setBusy] = useState(false)

  const handleClick = async () => {
    if (!initiateResponse) return
    setBusy(true)
    try {
      const Razorpay = await loadRazorpay()
      const rzp = new Razorpay({
        key: initiateResponse.razorpayKeyId,
        amount: initiateResponse.amount,
        currency: initiateResponse.currency || 'INR',
        order_id: initiateResponse.razorpayOrderId,
        name: 'Laundryman',
        description,
        prefill: {
          name: initiateResponse.customerName || '',
          contact: initiateResponse.customerPhone || '',
        },
        theme: { color: '#1879a2' },
        handler: async (response) => {
          try {
            await onSuccess?.(response)
          } catch (err) {
            onFailure?.(err)
          }
        },
        modal: {
          ondismiss: () => onFailure?.(new Error('Payment cancelled')),
        },
      })
      rzp.on('payment.failed', (resp) => {
        onFailure?.(new Error(resp?.error?.description || 'Payment failed'))
      })
      rzp.open()
    } catch (err) {
      onFailure?.(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled || busy}
      onClick={handleClick}
      className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
    >
      {busy ? 'Opening payment…' : label}
    </motion.button>
  )
}
