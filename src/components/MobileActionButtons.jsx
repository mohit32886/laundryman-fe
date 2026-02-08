import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mobileFeatures } from '../utils/mobileFeatures'
import { contactInfo } from '../config/contact'

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
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
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
    <div className={`fixed bottom-4 left-4 right-4 z-40 md:hidden ${className}`}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-4 gap-2 safe-area-inset"
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
              min-h-[56px]
              rounded-lg 
              shadow-lg 
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
            <span className="text-xs font-medium">{button.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default MobileActionButtons
