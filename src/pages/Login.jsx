import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import { cartService } from '../services/cartService'
import { useAuth } from '../context/AuthContext'
import { bgColor, hoverBgColor, textColor, borderColor, focusRingColor } from '../utils/classNames'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthed } = useAuth()

  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = location.state?.from || '/cart'

  useEffect(() => {
    if (isAuthed) navigate(redirectTo, { replace: true })
  }, [isAuthed, navigate, redirectTo])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const validatePhone = (raw) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.length < 10) return null
    return digits.slice(-10)
  }

  const handleRequestOtp = async (e) => {
    e?.preventDefault()
    setError('')
    const cleaned = validatePhone(phone)
    if (!cleaned) {
      setError('Enter a valid 10-digit phone number')
      return
    }
    setSubmitting(true)
    try {
      await authService.requestOtp(cleaned)
      setStep('code')
      setCountdown(30)
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setSubmitting(false)
    }
  }

  const handleVerify = async (e) => {
    e?.preventDefault()
    setError('')
    if (code.length < 4) {
      setError('Enter the code you received')
      return
    }
    setSubmitting(true)
    try {
      const cleaned = validatePhone(phone)
      const res = await authService.verifyOtp({
        phoneNumber: cleaned,
        code,
        referralCode: referralCode.trim() || undefined,
      })
      login({ token: res.token, customer: res.customer })
      try { await cartService.mergeGuestCart() } catch { /* non-fatal */ }
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid code')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className={`text-2xl font-semibold ${textColor('primary')}`}>
          {step === 'phone' ? 'Sign in with OTP' : 'Enter verification code'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {step === 'phone'
            ? 'We’ll send a one-time password to your mobile.'
            : `Code sent to +91 ${phone.replace(/\D/g, '').slice(-10)}. Valid for 10 minutes.`}
        </p>

        {step === 'phone' && (
          <form onSubmit={handleRequestOtp} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone number</span>
              <div className={`mt-1 flex items-center rounded-lg border ${borderColor('primaryLight')} focus-within:ring-2 focus-within:ring-offset-1 ${focusRingColor('primary')}`}>
                <span className="pl-3 pr-2 text-gray-500 text-sm">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9006468666"
                  className="w-full py-2.5 pr-3 bg-transparent outline-none text-gray-900"
                />
              </div>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
              className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
            >
              {submitting ? 'Sending…' : 'Send OTP'}
            </motion.button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">6-digit code</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className={`mt-1 w-full py-2.5 px-3 rounded-lg border ${borderColor('primaryLight')} tracking-widest text-lg outline-none focus:ring-2 ${focusRingColor('primary')}`}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Referral code (optional)</span>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className={`mt-1 w-full py-2.5 px-3 rounded-lg border ${borderColor('primaryLight')} uppercase outline-none focus:ring-2 ${focusRingColor('primary')}`}
                placeholder="e.g. LM20"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
              className={`w-full py-3 rounded-lg font-semibold text-white ${bgColor('primary')} ${hoverBgColor('primary')} disabled:opacity-60`}
            >
              {submitting ? 'Verifying…' : 'Verify & continue'}
            </motion.button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                className={`${textColor('primary')} underline`}
                onClick={() => { setStep('phone'); setCode(''); setError('') }}
              >
                Change number
              </button>
              <button
                type="button"
                disabled={countdown > 0 || submitting}
                onClick={handleRequestOtp}
                className={`${countdown > 0 ? 'text-gray-400' : textColor('primary') + ' underline'}`}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
