import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactInfo } from '../config/contact'
import { submitFranchiseForm } from '../services/googleSheetsService'

export default function GetFranchise() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    investmentCapacity: '',
    message: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.agreeToTerms) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitFranchiseForm(formData)
      
      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        investmentCapacity: '',
        message: '',
        agreeToTerms: false
      })
    } catch (error) {
      console.error('Error submitting franchise request:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1879a2] to-[#145e7d] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Franchise</h1>
          <p className="text-xl">Join India's Largest Laundry & Dry Clean Chain</p>
        </div>
      </section>

      {/* Why Franchise Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Laundryman Franchise?
          </motion.h2>
          
          {/* Coming Soon Banner */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-96 bg-gradient-to-br from-[#1879a2] via-[#1a8ab8] to-[#24bcee] rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                    <span className="text-white text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Franchise Opportunities
                  </h3>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    We're preparing exciting franchise opportunities. Stay tuned for updates!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-[#1879a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                bg: 'bg-[#e6f4f8]',
                title: 'Proven Business Model',
                desc: 'Join a growing network of franchise partners with comprehensive support'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                bg: 'bg-green-100',
                title: 'Low Investment',
                desc: 'Affordable franchise model with high return potential'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.656-4.344a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243z" />
                  </svg>
                ),
                bg: 'bg-purple-100',
                title: 'Complete Support',
                desc: 'Training, marketing support, and ongoing assistance'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`${item.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Franchise Benefits
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">What You Get</h3>
              <ul className="space-y-3">
                {[
                  'Strong brand support and marketing assistance',
                  'Comprehensive training program',
                  'Marketing and promotional support',
                  'Access to premium machinery and technology',
                  'Ongoing operational support',
                  'Proven business processes and systems'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Investment Details</h3>
              <div className="space-y-4">
                {[
                  { label: 'Initial Investment', value: '₹10 - 20 Lakhs', bold: true },
                  { label: 'Area Required', value: '800 - 1200 sq. ft.' },
                  { label: 'Franchise Fee', value: '₹2 - 5 Lakhs' },
                  { label: 'Royalty', value: '8% of Revenue', last: true }
                ].map((detail, idx) => (
                  <motion.div
                    key={idx}
                    className={detail.last ? '' : 'border-b pb-4'}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <p className="text-gray-600 mb-1">{detail.label}</p>
                    <p className={detail.bold ? 'text-2xl font-bold text-[#1879a2]' : 'text-xl font-semibold'}>{detail.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Franchise Requirements
          </motion.h2>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ul className="space-y-4">
              {[
                'Good location with high footfall (residential/commercial area)',
                'Minimum 800 sq. ft. space for store setup',
                'Financial capability to invest in franchise and operations',
                'Commitment to maintain brand standards and quality',
                'Business acumen and willingness to learn',
                'Passion for customer service excellence'
              ].map((req, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <span className={`${idx === 0 ? 'text-[#1879a2]' : 'text-blue-600'} mr-3 text-xl font-bold`}>{idx + 1}.</span>
                  <span>{req}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#1879a2] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Request Franchise Information
          </motion.h2>
          
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                  placeholder="Enter your city"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Investment Capacity</label>
                <select 
                  name="investmentCapacity"
                  value={formData.investmentCapacity}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                >
                  <option value="">Select investment capacity</option>
                  <option>₹10 - 15 Lakhs</option>
                  <option>₹15 - 20 Lakhs</option>
                  <option>₹20+ Lakhs</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2] text-gray-900 disabled:bg-gray-100"
                  placeholder="Tell us about yourself and why you're interested in a franchise..."
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  disabled={isSubmitting}
                  className="mt-1 mr-3" 
                />
                <label className="text-gray-700 text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  ✓ Franchise request submitted! We will contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  ✗ Please accept the terms and conditions to proceed.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1879a2] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#145e7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Have Questions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Call Us Card */}
            <motion.a
              href={contactInfo.getTelUrl()}
              className="group relative bg-white border-2 border-[#1879a2] rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1879a2] to-[#145e7d] opacity-0 group-hover:opacity-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="bg-[#e6f4f8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-[#1879a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#1879a2] transition-colors">
                  Call Us
                </h3>
                <motion.p
                  className="text-[#1879a2] font-semibold text-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {contactInfo.display.phone}
                </motion.p>
                
                <motion.div
                  className="mt-4 text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Click to call now
                </motion.div>
              </div>
            </motion.a>

            {/* Email Us Card */}
            <motion.a
              href="mailto:franchise@laundryman.in"
              className="group relative bg-white border-2 border-[#1879a2] rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1879a2] to-[#145e7d] opacity-0 group-hover:opacity-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#1879a2] transition-colors">
                  Email Us
                </h3>
                <motion.p
                  className="text-[#1879a2] font-semibold text-lg break-all"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  franchise@laundryman.in
                </motion.p>
                
                <motion.div
                  className="mt-4 text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Click to send email
                </motion.div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}

