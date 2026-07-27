import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { bgColor, hoverBgColor, hoverTextColor, textColor } from '../utils/classNames'

const AUTHED_LINKS = [
  { path: '/my-orders', label: 'My orders' },
  { path: '/wallet', label: 'Wallet' },
  { path: '/subscriptions/manage', label: 'My subscription' },
  { path: '/subscriptions', label: 'Browse plans' },
  { path: '/account', label: 'Account' },
]

function CartIcon({ variant = 'desktop' }) {
  const { itemCount } = useCart()
  const size = variant === 'desktop' ? 'w-6 h-6' : 'w-6 h-6'
  return (
    <Link
      to="/cart"
      aria-label={`Cart, ${itemCount} items`}
      className={`relative inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-full text-gray-700 ${hoverTextColor('primary')}`}
    >
      <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full ${bgColor('primary')} text-white text-[10px] font-bold flex items-center justify-center`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.span>
      )}
    </Link>
  )
}

/**
 * Desktop-only account menu (dropdown). Cart icon renders inline.
 */
export function CustomerNavMenuDesktop() {
  const { isAuthed, customer } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  if (!isAuthed) {
    return (
      <div className="flex items-center gap-2">
        <CartIcon />
        <Link
          to="/login"
          className={`px-3 py-1.5 rounded-md text-sm font-semibold ${textColor('primary')} border border-current`}
        >
          Sign in
        </Link>
      </div>
    )
  }

  const initials = (customer?.name || customer?.phoneNumber || 'U')
    .replace(/\+/g, '')
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="flex items-center gap-2" ref={ref}>
      <CartIcon />
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className={`inline-flex items-center gap-2 min-h-[40px] rounded-full pl-1 pr-3 py-1 ${hoverBgColor('bgLight')}`}
        >
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${bgColor('primary')} text-white text-xs font-bold`}>
            {initials || 'U'}
          </span>
          <span className="hidden lg:block text-sm text-gray-700 font-medium max-w-[7rem] truncate">
            {customer?.name || 'Account'}
          </span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50"
            >
              {AUTHED_LINKS.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              ))}
              <div className="my-1 border-t" />
              <SignOutItem onClick={() => setOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Mobile menu items — rendered inline inside the existing slide-in.
 */
export function CustomerNavMenuMobile({ onNavigate }) {
  const { isAuthed, customer } = useAuth()
  const { itemCount } = useCart()

  return (
    <div className="mt-2 border-t pt-3">
      <Link
        to="/cart"
        onClick={onNavigate}
        className="flex items-center justify-between px-4 py-3 min-h-[48px] text-gray-700 hover:bg-gray-100 rounded-md"
      >
        <span className="font-medium">Cart</span>
        {itemCount > 0 && (
          <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full ${bgColor('primary')} text-white text-xs font-bold inline-flex items-center justify-center`}>
            {itemCount}
          </span>
        )}
      </Link>

      {!isAuthed ? (
        <Link
          to="/login"
          onClick={onNavigate}
          className={`block mt-2 mx-4 py-3 text-center rounded-md text-white font-semibold ${bgColor('primary')}`}
        >
          Sign in
        </Link>
      ) : (
        <>
          <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-400">
            Hi, {customer?.name || 'there'}
          </div>
          {AUTHED_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={onNavigate}
              className="block px-4 py-3 min-h-[48px] text-gray-700 hover:bg-gray-100 rounded-md font-medium"
            >
              {l.label}
            </Link>
          ))}
          <SignOutItem onClick={onNavigate} mobile />
        </>
      )}
    </div>
  )
}

function SignOutItem({ onClick, mobile = false }) {
  const { logout } = useAuth()
  const handle = () => {
    logout()
    onClick?.()
  }
  const cls = mobile
    ? 'block px-4 py-3 min-h-[48px] text-red-600 hover:bg-red-50 rounded-md font-medium'
    : 'block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
  return (
    <button onClick={handle} className={cls}>Sign out</button>
  )
}
