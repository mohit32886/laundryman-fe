import { useState } from 'react'
import { bgColor, hoverBgColor, focusRingColor } from '../utils/classNames'
import { submitCallbackForm } from '../services/googleSheetsService'

const PHONE_REGEX = /^[6-9]\d{9}$/ // Indian mobile: 10 digits, first digit 6–9

export default function CallbackModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [phoneError, setPhoneError] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') setPhoneError('')
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPhoneError('')

    if (!formData.name.trim()) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim()) {
      setPhoneError('Please enter your phone number')
      return
    }
    if (!PHONE_REGEX.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit mobile number (e.g. 9876543210)')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitCallbackForm(formData)
      
      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        phone: '',
        preferredTime: '',
        message: ''
      })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Error submitting callback request:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        phone: '',
        preferredTime: '',
        message: ''
      })
      setPhoneError('')
      setSubmitStatus(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Callback</h2>
            <p className="text-gray-600 text-sm">
              Fill in your details and we'll call you back at your preferred time.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${focusRingColor('primary')} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                inputMode="tel"
                autoComplete="tel"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${phoneError ? 'border-red-500' : 'border-gray-300'} ${focusRingColor('primary')} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                placeholder="10-digit mobile number"
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Time (Optional)
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${focusRingColor('primary')} disabled:bg-gray-100 disabled:cursor-not-allowed`}
              >
                <option value="">Select preferred time</option>
                <option value="9am-12pm">9 AM - 12 PM</option>
                <option value="12pm-3pm">12 PM - 3 PM</option>
                <option value="3pm-6pm">3 PM - 6 PM</option>
                <option value="6pm-8pm">6 PM - 8 PM</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${focusRingColor('primary')} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                placeholder="Any specific query or requirement..."
              ></textarea>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                ✓ Thank you! We'll call you back soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                ✗ Something went wrong. Please try again or contact us directly.
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 ${bgColor('primary')} text-white rounded-lg ${hoverBgColor('primary')} disabled:opacity-50 disabled:cursor-not-allowed font-semibold`}
              >
                {isSubmitting ? 'Submitting...' : 'Request Callback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

