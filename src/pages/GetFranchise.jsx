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
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden theme-hero-bg text-white py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💼 High ROI Business Opportunity
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Partner With <span className="theme-title-gradient">LAUNDRYMAN</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">Build a profitable, recession-proof Eco-Laundry & Dry Cleaning franchise in your city</p>
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
          
          {/* Franchise Opportunities Banner */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full glass-card rounded-3xl p-10 md:p-14 text-center border border-slate-200/80 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 border border-cyan-200/80 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-sm">
                ✨ Franchise Opportunities Opening Soon
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Empowering Entrepreneurs in Ranchi & Beyond
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
                We are launching exclusive Laundryman FOFO & FOCO franchise models with complete setup, equipment sourcing, and operational training.
              </p>
              <button 
                onClick={() => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="theme-cta-btn px-8 py-3.5 rounded-xl font-bold text-sm shadow-md"
              >
                📩 Pre-Register for Franchise Access
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <p className={detail.bold ? `text-2xl font-bold ${textColor('primary')}` : 'text-xl font-semibold'}>{detail.value}</p>
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
                  <span className={`${textColor('primary')} mr-3 text-xl font-bold`}>{idx + 1}.</span>
                  <span>{req}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-900 border-t border-b border-slate-800/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Request Franchise Information
          </motion.h2>
          
          <motion.div 
            className="glass-card rounded-2xl shadow-xl p-8 text-slate-900 border border-slate-200/80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
                  placeholder="Enter your city"
                />
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Investment Capacity</label>
                <select 
                  name="investmentCapacity"
                  value={formData.investmentCapacity}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
                >
                  <option value="">Select investment capacity</option>
                  <option>₹10 - 15 Lakhs</option>
                  <option>₹15 - 20 Lakhs</option>
                  <option>₹20+ Lakhs</option>
                </select>
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 disabled:bg-slate-100"
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
                <label className="text-slate-700 text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium">
                  ✓ Franchise request submitted! We will contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm font-medium">
                  ✗ Please accept the terms and conditions to proceed.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full theme-cta-btn px-8 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="group relative glass-card border border-slate-200/80 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div
                  className="bg-cyan-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-100"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-cyan-600 transition-colors">
                  Call Us
                </h3>
                <motion.p
                  className="text-cyan-600 font-bold text-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {contactInfo.display.phone}
                </motion.p>
                
                <motion.div
                  className="mt-4 text-xs text-slate-500 font-light"
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
              className="group relative glass-card border border-slate-200/80 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div
                  className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Email Us
                </h3>
                <motion.p
                  className="text-emerald-600 font-bold text-lg break-all"
                  whileHover={{ scale: 1.05 }}
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

