import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { walletService } from '../services/walletService'
import { bgColor, borderColor, textColor } from '../utils/classNames'

function formatRupees(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export default function WalletToggle() {
  const { isAuthed } = useAuth()
  const { cart, applyWallet, removeWallet } = useCart()
  const [balance, setBalance] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthed) { setBalance(null); return }
    let alive = true
    walletService.summary()
      .then((res) => { if (alive) setBalance(res.balance) })
      .catch(() => { if (alive) setBalance(0) })
    return () => { alive = false }
  }, [isAuthed])

  if (!isAuthed) {
    return (
      <div className={`rounded-lg border ${borderColor('primaryLight')} px-3 py-3 text-sm text-gray-600`}>
        <Link to="/login" className={`${textColor('primary')} underline font-semibold`}>Log in</Link>
        {' '}to pay with wallet or earn credit.
      </div>
    )
  }

  const applied = cart.walletApplied > 0
  const noBalance = balance === 0

  const handleToggle = async () => {
    setBusy(true)
    setError(null)
    try {
      if (applied) await removeWallet()
      else await applyWallet()
      const s = await walletService.summary()
      setBalance(s.balance)
    } catch (err) {
      setError(err.message || 'Failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`rounded-lg border ${borderColor('primaryLight')} ${applied ? bgColor('bgLighter') : ''} px-3 py-3`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={applied}
          onChange={handleToggle}
          disabled={busy || noBalance}
          className="mt-1 h-4 w-4"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-900">Use wallet</span>
            {balance !== null && (
              <span className="text-xs text-gray-500">
                Balance: <span className={textColor('primary')}>{formatRupees(balance)}</span>
              </span>
            )}
          </div>
          {applied && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-1 text-xs text-green-700"
            >
              −{formatRupees(cart.walletApplied)} applied
            </motion.p>
          )}
          {noBalance && (
            <p className="mt-1 text-xs text-gray-500">
              No balance. <Link to="/wallet" className={`${textColor('primary')} underline`}>Top up</Link>
            </p>
          )}
        </div>
      </label>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
