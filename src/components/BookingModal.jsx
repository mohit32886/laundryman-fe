import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { headingClasses, bodyTextClasses, fontWeightClass } from '../utils/fonts'
import { bgColor, textColor, borderColor, accentColor } from '../utils/classNames'
import { colors } from '../config/colors'
import Button from './ui/Button'
import { submitPickupForm } from '../services/googleSheetsService'
import { formStateManager } from '../utils/formStateManager'
import ResumeBookingPrompt from './ResumeBookingPrompt'

// Constants
const SUCCESS_MESSAGE_DURATION = 2000 // 2 seconds
const ERROR_MESSAGE_DURATION = 3000 // 3 seconds
const MAX_NAME_LENGTH = 100
const MAX_ADDRESS_LENGTH = 500
const PHONE_REGEX = /^[6-9]\d{9}$/ // Indian mobile number format

/**
 * BookingModal Component
 * 3-step progressive booking form
 */
const BookingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    phone: '',
    address: '',
    pickupTime: '',
    estimatedCost: ''
  })
  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const [savedFormData, setSavedFormData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')
  const [touched, setTouched] = useState({ name: false, phone: false, address: false })

  const services = [
    { id: 'laundry', icon: '🧺', name: 'Laundry' },
    { id: 'dry-clean', icon: '👔', name: 'Dry Clean' },
    { id: 'shoes', icon: '👟', name: 'Shoes' },
    { id: 'other', icon: '✨', name: 'Other' }
  ]

  const timeSlots = [
    { id: 'today-evening', label: 'Today Evening', sublabel: '6-8 PM' },
    { id: 'tomorrow-morning', label: 'Tomorrow Morning', sublabel: '9-11 AM' },
    { id: 'tomorrow-afternoon', label: 'Tomorrow Afternoon', sublabel: '2-4 PM' },
    { id: 'custom', label: 'Choose Custom', sublabel: '→' }
  ]

  // Check for saved data on mount
  useEffect(() => {
    if (isOpen) {
      const saved = formStateManager.load()
      if (saved && saved.service) {
        setSavedFormData(saved)
        setShowResumePrompt(true)
      }
    }
  }, [isOpen])

  // Save form data on every change
  useEffect(() => {
    if (formData.service && isOpen) {
      formStateManager.save(formData)
    }
  }, [formData, isOpen])

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleResumeBooking = () => {
    setFormData(savedFormData)
    setShowResumePrompt(false)
  }

  const handleStartFresh = () => {
    formStateManager.clear()
    setShowResumePrompt(false)
    setTouched({ name: false, phone: false, address: false })
    setFormData({
      service: '',
      name: '',
      phone: '',
      address: '',
      pickupTime: '',
      estimatedCost: ''
    })
  }

  const handleSubmit = async () => {
    // Comprehensive validation
    setErrorMessage('')
    
    // Validate name
    if (!formData.name.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please enter your name')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    if (formData.name.trim().length > MAX_NAME_LENGTH) {
      setSubmitStatus('error')
      setErrorMessage(`Name must be less than ${MAX_NAME_LENGTH} characters`)
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    
    // Validate phone number
    if (!formData.phone.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please enter your phone number')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    const cleanPhone = formData.phone.replace(/\D/g, '') // Remove non-digits
    if (!PHONE_REGEX.test(cleanPhone)) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid 10-digit mobile number starting with 6-9')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    
    // Validate address
    if (!formData.address.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please enter your pickup address')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    if (formData.address.trim().length > MAX_ADDRESS_LENGTH) {
      setSubmitStatus('error')
      setErrorMessage(`Address must be less than ${MAX_ADDRESS_LENGTH} characters`)
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }
    
    // Validate pickup time
    if (!formData.pickupTime) {
      setSubmitStatus('error')
      setErrorMessage('Please select a pickup time')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Map form data to pickup form format
      const pickupData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        pickupDate: getPickupDate(formData.pickupTime),
        pickupTime: getPickupTimeSlot(formData.pickupTime),
        serviceType: mapServiceType(formData.service),
        message: `Service: ${services.find(s => s.id === formData.service)?.name || formData.service}`
      }

      await submitPickupForm(pickupData)
      
      setSubmitStatus('success')
      formStateManager.clear() // Clear saved data after successful submission
      setTouched({ name: false, phone: false, address: false })

      // Reset form
      setFormData({
        service: '',
        name: '',
        phone: '',
        address: '',
        pickupTime: '',
        estimatedCost: ''
      })
      
      // Close modal after success duration
      setTimeout(() => {
        onClose()
        setSubmitStatus(null)
        setCurrentStep(1)
      }, SUCCESS_MESSAGE_DURATION)
    } catch (error) {
      console.error('Booking failed:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to submit booking. Please try again or contact us directly.')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setCurrentStep(1)
      setSubmitStatus(null)
      setShowResumePrompt(false)
      onClose()
    }
  }

  // Helper functions
  const getPickupDate = (pickupTimeId) => {
    const today = new Date()
    if (pickupTimeId === 'today-evening') {
      return today.toISOString().split('T')[0]
    }
    // For tomorrow options
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  const getPickupTimeSlot = (pickupTimeId) => {
    const timeMap = {
      'today-evening': '6pm-8pm',
      'tomorrow-morning': '9am-12pm',
      'tomorrow-afternoon': '2pm-4pm',
      'custom': ''
    }
    return timeMap[pickupTimeId] || ''
  }

  const mapServiceType = (serviceId) => {
    const serviceMap = {
      'laundry': 'laundry-wash-iron',
      'dry-clean': 'dry-cleaning',
      'shoes': 'shoe-cleaning',
      'other': 'mixed'
    }
    return serviceMap[serviceId] || 'mixed'
  }

  // Inline validation helpers
  const getFieldError = (field) => {
    if (!touched[field]) return ''
    switch (field) {
      case 'name':
        if (!formData.name.trim()) return 'Name is required'
        if (formData.name.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'phone': {
        if (!formData.phone.trim()) return 'Phone number is required'
        const clean = formData.phone.replace(/\D/g, '')
        if (!PHONE_REGEX.test(clean)) return 'Enter a valid 10-digit number starting with 6-9'
        return ''
      }
      case 'address':
        if (!formData.address.trim()) return 'Address is required'
        if (formData.address.trim().length < 5) return 'Address must be at least 5 characters'
        return ''
      default:
        return ''
    }
  }

  const isStep2Valid = () => {
    const nameOk = formData.name.trim().length >= 2
    const phoneOk = PHONE_REGEX.test(formData.phone.replace(/\D/g, ''))
    const addressOk = formData.address.trim().length >= 5
    const timeOk = !!formData.pickupTime
    return nameOk && phoneOk && addressOk && timeOk
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  if (!isOpen) return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Progress Bar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between mb-2">
                <span className={`${bodyTextClasses()} ${textColor('secondary')}`}>
                  Step {currentStep} of 3
                </span>
                <button 
                  onClick={handleClose} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`${bgColor('primary')}`}
                  initial={{ width: '33%' }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '100%' }}
                />
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* STEP 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className={`${headingClasses('h2')} mb-6`}>
                      What do you need?
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {services.map((service) => (
                        <motion.button
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, service: service.id })}
                          className={`
                            p-6 rounded-xl border-2 transition-all
                            ${formData.service === service.id
                              ? `${borderColor('primary')}`
                              : `border-gray-200 hover:border-gray-400`
                            }
                          `}
                          style={formData.service === service.id ? { backgroundColor: `${colors.primary.DEFAULT}10` } : {}}
                        >
                          <div className="text-5xl mb-3">{service.icon}</div>
                          <div className={`${bodyTextClasses()} ${fontWeightClass('bold')}`}>
                            {service.name}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      fullWidth
                      size="large"
                      onClick={nextStep}
                      disabled={!formData.service}
                    >
                      Continue →
                    </Button>
                  </motion.div>
                )}

                {/* STEP 2: Pickup Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className={`${headingClasses('h2')} mb-6`}>
                      Pickup Details
                    </h2>

                    <div className="space-y-4 mb-8">
                      <div>
                        <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onBlur={() => handleBlur('name')}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-base ${getFieldError('name') ? 'border-red-400' : 'border-gray-300'}`}
                          style={{ '--tw-ring-color': colors.primary.DEFAULT }}
                          placeholder="Enter your name"
                          required
                          maxLength={MAX_NAME_LENGTH}
                        />
                        {getFieldError('name') && (
                          <p className="text-red-500 text-sm mt-1">{getFieldError('name')}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onBlur={() => handleBlur('phone')}
                          pattern="[0-9]{10}"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-base ${getFieldError('phone') ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="+91 Phone Number"
                          required
                          maxLength={10}
                        />
                        {getFieldError('phone') && (
                          <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-2`}>
                          Pickup Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          onBlur={() => handleBlur('address')}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-base ${getFieldError('address') ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="Start typing your address..."
                          required
                          maxLength={MAX_ADDRESS_LENGTH}
                        />
                        {getFieldError('address') && (
                          <p className="text-red-500 text-sm mt-1">{getFieldError('address')}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block ${bodyTextClasses()} ${fontWeightClass('bold')} mb-3`}>
                          Preferred Pickup Time
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setFormData({ ...formData, pickupTime: slot.id })}
                              className={`
                                p-4 rounded-lg border-2 text-left transition-all
                                ${formData.pickupTime === slot.id
                                  ? `${borderColor('primary')}`
                                  : `border-gray-200 hover:border-gray-400`
                                }
                              `}
                              style={formData.pickupTime === slot.id ? { backgroundColor: `${colors.primary.DEFAULT}10` } : {}}
                            >
                              <div className={`${bodyTextClasses()} ${fontWeightClass('bold')}`}>{slot.label}</div>
                              <div className={`${bodyTextClasses('sm')} ${textColor('secondary')}`}>
                                {slot.sublabel}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prevStep} className="flex-1">
                        ← Back
                      </Button>
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        className="flex-1"
                        disabled={!isStep2Valid()}
                      >
                        Continue →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className={`${headingClasses('h2')} mb-6`}>
                      Confirm Booking
                    </h2>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
                      <div className="flex justify-between">
                        <span className={textColor('secondary')}>Service:</span>
                        <span className={`${bodyTextClasses()} ${fontWeightClass('bold')}`}>
                          {services.find(s => s.id === formData.service)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textColor('secondary')}>Pickup:</span>
                        <span className={`${bodyTextClasses()} ${fontWeightClass('bold')}`}>
                          {timeSlots.find(t => t.id === formData.pickupTime)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textColor('secondary')}>Address:</span>
                        <span className={`${bodyTextClasses()} ${fontWeightClass('bold')} text-right`}>
                          {formData.address}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-4 mt-4">
                        <p className={`${bodyTextClasses()} ${fontWeightClass('bold')} text-orange-600`}>
                          🎉 You'll get 20% off your first order!
                        </p>
                      </div>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm mb-4">
                        ✓ Booking confirmed! We'll contact you to confirm the details.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm mb-4">
                        ✗ {errorMessage || 'Please fill in all required fields.'}
                      </div>
                    )}

                    <label className="flex items-start gap-3 mb-6 cursor-pointer">
                      <input type="checkbox" required className={`mt-1 w-4 h-4 ${accentColor('primary')}`} />
                      <span className={`${bodyTextClasses('sm')}`}>
                        I agree to the{' '}
                        <a href="/terms-and-conditions" className={textColor('primary')}>
                          terms & conditions
                        </a>
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prevStep} className="flex-1">
                        ← Back
                      </Button>
                      <Button 
                        variant="success" 
                        onClick={handleSubmit} 
                        className="flex-1" 
                        size="large"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm Booking ✓'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Resume Booking Prompt */}
      {showResumePrompt && (
        <ResumeBookingPrompt
          savedData={savedFormData}
          onResume={handleResumeBooking}
          onStartFresh={handleStartFresh}
          onDismiss={() => setShowResumePrompt(false)}
        />
      )}
    </>
  )
}

export default BookingModal
