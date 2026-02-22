import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { headingClasses, bodyTextClasses, fontWeightClass } from '../utils/fonts'
import { borderColor } from '../utils/classNames'
import Button from './ui/Button'
import { contactInfo } from '../config/contact'

const PHONE_REGEX = /^[6-9]\d{9}$/ // Indian mobile: 10 digits, first digit 6–9

/**
 * WhatsAppBooking Component
 * Quick booking flow that redirects to WhatsApp with pre-filled message
 */
const WhatsAppBooking = ({ isOpen, onClose, preSelectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    service: preSelectedService
  })
  const [phoneError, setPhoneError] = useState('')

  const areas = [
    'Harmu',
    'Hinoo',
    'Doranda',
    'Lalpur',
    'Kantatoli',
    'Dhurwa',
    'Ranchi University',
    'Other'
  ]

  const serviceNames = {
    laundry: 'Laundry',
    'dry-clean': 'Dry Clean',
    shoes: 'Shoe Cleaning',
    other: 'Other Service'
  }

  const isPhoneValid = () => {
    const cleanPhone = formData.phone.replace(/\D/g, '')
    return PHONE_REGEX.test(cleanPhone)
  }

  const handleWhatsAppBooking = () => {
    setPhoneError('')

    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim()) {
      setPhoneError('Please enter your phone number')
      return
    }
    if (!PHONE_REGEX.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit mobile number (e.g. 9876543210)')
      return
    }

    const serviceName = serviceNames[formData.service] || formData.service || 'service'
    
    const message = `Hi Laundryman! 

I want to book ${serviceName}.

Name: ${formData.name}
Phone: ${formData.phone}
Area: ${formData.area}

Please confirm availability!`

    const whatsappUrl = `${contactInfo.getWhatsAppUrl()}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    onClose()
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      area: '',
      service: preSelectedService
    })
  }

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      area: '',
      service: preSelectedService
    })
    setPhoneError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={headingClasses('h2')}>Quick Quote on WhatsApp</h2>
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:${borderColor('primary')} focus:outline-none text-base`}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  setPhoneError('')
                }}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:${borderColor('primary')} focus:outline-none text-base ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="10-digit mobile number"
                required
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>

            <div>
              <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                Your Area *
              </label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:${borderColor('primary')} focus:outline-none text-base`}
                required
              >
                <option value="">Select your area</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="whatsapp"
            fullWidth
            size="large"
            onClick={handleWhatsAppBooking}
            disabled={!formData.name || !formData.phone || !formData.area || !isPhoneValid()}
          >
            Continue on WhatsApp →
          </Button>

          <p className={`${bodyTextClasses('sm')} text-center text-gray-500 mt-4`}>
            You'll be redirected to WhatsApp with a pre-filled message
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WhatsAppBooking
