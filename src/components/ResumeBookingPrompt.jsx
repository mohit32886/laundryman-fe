import { motion, AnimatePresence } from 'framer-motion'
import { bodyTextClasses, fontWeightClass } from '../utils/fonts'
import { textColor } from '../utils/classNames'
import Button from './ui/Button'

/**
 * ResumeBookingPrompt Component
 * Shows a prompt to resume incomplete booking when user returns
 */
const ResumeBookingPrompt = ({ savedData, onResume, onStartFresh, onDismiss }) => {
  if (!savedData) return null

  const serviceNames = {
    laundry: 'Laundry',
    'dry-clean': 'Dry Clean',
    shoes: 'Shoe Cleaning',
    other: 'Service'
  }

  const serviceName = serviceNames[savedData.service] || 'Service'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-2xl p-6 max-w-md border-2 border-[#1879a2]"
      >
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className={`${bodyTextClasses()} ${fontWeightClass('bold')} text-lg mb-2`}>
          Resume Your Booking?
        </h3>
        <p className={`${bodyTextClasses()} text-gray-600 mb-4`}>
          You have an incomplete booking for <strong>{serviceName}</strong>. Would you like to continue where you left off?
        </p>
        
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            onClick={onResume} 
            className="flex-1"
            size="base"
          >
            Resume
          </Button>
          <Button 
            variant="outline" 
            onClick={onStartFresh} 
            className="flex-1"
            size="base"
          >
            Start Fresh
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ResumeBookingPrompt
