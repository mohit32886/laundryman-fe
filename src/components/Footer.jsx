import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { heroGradient } from '../utils/classNames'
import { colors } from '../config/colors'
import { contactInfo } from '../config/contact'

export default function Footer() {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)
  const [certificateForm, setCertificateForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    purpose: ''
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCertificateFormChange = (e) => {
    setCertificateForm({
      ...certificateForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCertificateFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (you can replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsFormSubmitted(true)
  }

  const handleDownloadCertificate = () => {
    const link = document.createElement('a')
    link.href = '/MSME REGISTRATION.pdf'
    link.download = 'MSME_REGISTRATION_Laundryman.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCloseCertificateModal = () => {
    setIsCertificateModalOpen(false)
    // Reset form after closing
    setTimeout(() => {
      setIsFormSubmitted(false)
      setCertificateForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        purpose: ''
      })
    }, 300)
  }

  const handleLinkClick = (e, to) => {
    // Don't scroll to top if link has a hash (like #faq)
    if (!to || !to.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Laundryman</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional dry cleaning and laundry services with convenient pickup and delivery options
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/b2b-services" onClick={(e) => handleLinkClick(e, '/b2b-services')} className="text-gray-400 hover:text-white transition-colors text-sm">B2B Services</Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleLinkClick(e, '/pricing')} className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link>
              </li>
              {/* Store Locator - Hidden but code kept for future use */}
              {/* <li>
                <Link to="/store-locator" onClick={(e) => handleLinkClick(e, '/store-locator')} className="text-gray-400 hover:text-white transition-colors text-sm">Store Locator</Link>
              </li> */}
              <li>
                <Link to="/get-franchise" onClick={(e) => handleLinkClick(e, '/get-franchise')} className="text-gray-400 hover:text-white transition-colors text-sm">Get Franchise</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about-us" onClick={(e) => handleLinkClick(e, '/about-us')} className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/#faq" onClick={(e) => handleLinkClick(e, '/#faq')} className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link>
              </li>
              <li>
                <Link to="/blogs" onClick={(e) => handleLinkClick(e, '/blogs')} className="text-gray-400 hover:text-white transition-colors text-sm">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={contactInfo.getTelUrl()} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {contactInfo.display.phone}
                  </a>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:whitebasketpvtltd@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                    whitebasketpvtltd@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/laundryman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={contactInfo.getWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitter.com/laundryman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/laundryman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Details & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-gray-400 text-sm space-y-2 mb-4">
            <p><strong className="text-white">Operated by:</strong> My Online Services</p>
            <p><strong className="text-white">Registered address:</strong> 01, Opp. Bharat Petroleum, Lalgutwa, Daladili Chowk, Ranchi, Jharkhand 835302</p>
            <p>
              <strong className="text-white">Udyam registration:</strong> UDYAM-JH-20-0030562. 
              <button 
                onClick={() => setIsCertificateModalOpen(true)} 
                className="text-[#24bcee] hover:underline ml-1"
              >
                [Download certificate]
              </button>
            </p>
            <p>
              <strong className="text-white">Contact:</strong> 
              <a href={contactInfo.getTelUrl()} className="text-[#24bcee] hover:underline ml-1">{contactInfo.display.phone}</a> | 
              <a href="mailto:whitebasketpvtltd@gmail.com" className="text-[#24bcee] hover:underline ml-1">whitebasketpvtltd@gmail.com</a>
            </p>
            <p><strong className="text-white">Website:</strong> | © 2025 Laundryman</p>
            <p className="flex flex-wrap gap-2">
              <Link 
                to="/terms-and-conditions" 
                onClick={(e) => handleLinkClick(e, '/terms-and-conditions')}
                className="text-[#24bcee] hover:underline text-sm"
              >
                Terms and Conditions
              </Link>
              <span className="text-gray-500">|</span>
              <Link 
                to="/privacy-policy" 
                onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                className="text-[#24bcee] hover:underline text-sm"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="text-center text-gray-400 text-sm mt-6">
            <p>© 2025 Laundryman. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Certificate Download Modal */}
      <AnimatePresence>
        {isCertificateModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCertificateModal}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r from-[${colors.primary.DEFAULT}] to-[${colors.primary.light}] p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isFormSubmitted ? 'Download Ready!' : 'Download MSME Certificate'}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {isFormSubmitted 
                        ? 'Thank you for your interest' 
                        : 'Please fill in your details to download'}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseCertificateModal}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isFormSubmitted ? (
                  <form onSubmit={handleCertificateFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={certificateForm.name}
                        onChange={handleCertificateFormChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#24bcee] focus:border-transparent transition-all text-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={certificateForm.email}
                        onChange={handleCertificateFormChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#24bcee] focus:border-transparent transition-all text-gray-900"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={certificateForm.phone}
                        onChange={handleCertificateFormChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#24bcee] focus:border-transparent transition-all text-gray-900"
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={certificateForm.company}
                        onChange={handleCertificateFormChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#24bcee] focus:border-transparent transition-all text-gray-900"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose of Download <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="purpose"
                        value={certificateForm.purpose}
                        onChange={handleCertificateFormChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#24bcee] focus:border-transparent transition-all text-gray-900"
                      >
                        <option value="">Select purpose</option>
                        <option value="verification">Business Verification</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="vendor">Vendor Registration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-[${colors.primary.DEFAULT}] to-[${colors.primary.light}] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit & Download'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Form Submitted Successfully!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest. Click below to download the MSME Registration Certificate.
                    </p>
                    <button
                      onClick={handleDownloadCertificate}
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-[${colors.primary.DEFAULT}] to-[${colors.primary.light}] text-white rounded-lg font-semibold hover:shadow-lg transition-all`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Certificate
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

