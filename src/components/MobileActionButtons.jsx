import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mobileFeatures } from '../utils/mobileFeatures'
import { contactInfo } from '../config/contact'
import WhatsAppIcon from './ui/WhatsAppIcon'

/**
 * MobileActionButtons Component
 * Grid of 4 mobile-specific action buttons: Call, WhatsApp, Directions, Share
 * Visible only on mobile devices
 * 
 * @param {object} props
 * @param {string} props.address - Business address for directions (optional)
 * @param {string} props.shareUrl - URL to share (defaults to current page)
 * @param {string} props.shareText - Text to share (optional)
 * @param {string} props.className - Additional CSS classes
 */
const MobileActionButtons = ({ 
  address = '01, Opp. Bharat Petroleum, Lalgutwa, Daladili Chowk, Ranchi, Jharkhand 835302',
  shareUrl = typeof window !== 'undefined' ? window.location.href : '',
  shareText = 'Check out Laundryman.pro - Professional laundry and dry cleaning services!',
  className = ''
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(mobileFeatures.isMobile())
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Don't render on desktop
  if (!isMobile) {
    return null
  }

  const buttons = [
    {
      id: 'call',
      label: 'Call',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      onClick: () => {
        mobileFeatures.vibrate([50])
        mobileFeatures.makeCall(contactInfo.phone.support)
      },
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <WhatsAppIcon size="w-6 h-6" />,
      onClick: () => {
        mobileFeatures.vibrate([50])
        mobileFeatures.openWhatsApp('Hello! I would like to know more about your services.', contactInfo.whatsapp.order)
      },
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => {
        mobileFeatures.vibrate([50])
        mobileFeatures.getDirections(address)
      },
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      id: 'share',
      label: 'Share',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      onClick: async () => {
        mobileFeatures.vibrate([50])
        await mobileFeatures.share({
          title: 'Laundryman.pro',
          text: shareText,
          url: shareUrl,
        })
      },
      bgColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
  ]

  return (
    <div className={`fixed bottom-3 left-3 right-3 z-50 md:hidden ${className}`}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="glass-panel-dark p-2 rounded-2xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-4 gap-2 safe-area-inset"
      >
        {buttons.map((button, index) => (
          <motion.button
            key={button.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.2, 
              delay: 0.3 + index * 0.05,
              type: 'spring',
              stiffness: 200
            }}
            onClick={button.onClick}
            className={`
              ${button.bgColor} 
              ${button.hoverColor}
              text-white 
              min-h-[52px]
              rounded-xl 
              shadow-md 
              flex 
              flex-col 
              items-center 
              justify-center 
              gap-1 
              p-2
              active:scale-95
              transition-all
              duration-200
            `}
            aria-label={button.label}
          >
            {button.icon}
            <span className="text-[11px] font-semibold tracking-wide">{button.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default MobileActionButtons
