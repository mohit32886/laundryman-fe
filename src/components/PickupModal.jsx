import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bgColor, hoverBgColor } from '../utils/classNames'
import { submitPickupForm } from '../services/googleSheetsService'

export default function PickupModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    serviceType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pickupDate || !formData.serviceType) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitPickupForm(formData)
      
      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        pickupDate: '',
        pickupTime: '',
        serviceType: '',
        message: ''
      })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Error submitting pickup request:', error)
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
        address: '',
        pickupDate: '',
        pickupTime: '',
        serviceType: '',
        message: ''
      })
      setSubmitStatus(null)
      onClose()
    }
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div 
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Free Pickup</h2>
            <p className="text-gray-600 text-sm">
              Fill in your details and we'll pick up your laundry at your preferred time.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your complete address"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pickup Date */}
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Pickup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  required
                  min={minDate}
                  value={formData.pickupDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Time (Optional)
                </label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select time slot</option>
                  <option value="9am-12pm">9 AM - 12 PM</option>
                  <option value="12pm-3pm">12 PM - 3 PM</option>
                  <option value="3pm-6pm">3 PM - 6 PM</option>
                  <option value="6pm-8pm">6 PM - 8 PM</option>
                </select>
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select service type</option>
                <option value="laundry-wash-fold">Laundry - Wash & Fold</option>
                <option value="laundry-wash-iron">Laundry - Wash & Steam Iron</option>
                <option value="dry-cleaning">Dry Cleaning</option>
                <option value="shoe-cleaning">Shoe Cleaning</option>
                <option value="carpet-cleaning">Carpet Dry Cleaning</option>
                <option value="curtain-cleaning">Curtain Dry Cleaning</option>
                <option value="leather-cleaning">Leather Cleaning</option>
                <option value="steam-ironing">Steam Ironing</option>
                <option value="mixed">Mixed Services</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Instructions (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Any special instructions or requirements..."
              ></textarea>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                ✓ Pickup scheduled successfully! We'll contact you to confirm the details.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                ✗ Please fill in all required fields.
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
                {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
              </button>
            </div>
          </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

