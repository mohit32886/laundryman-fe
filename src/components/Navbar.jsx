import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { textColor, hoverTextColor, bgColor, hoverBgColor } from '../utils/classNames'
import { contactInfo } from '../config/contact'
import CallbackModal from './CallbackModal'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false)
  const lastScrollY = useRef(0)

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Close menu if scrolling down by more than 10px
      if (isMenuOpen && currentScrollY > lastScrollY.current + 10) {
        setIsMenuOpen(false)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Laundryman Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`text-gray-700 ${hoverTextColor('primary')} font-medium flex items-center`}
              >
                Services
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/services#laundry" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Laundry Service</Link>
                    <Link to="/services#dry-cleaning" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dry Cleaning Service</Link>
                    <Link to="/services#shoe-cleaning" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Shoe Cleaning Service</Link>
                    <Link to="/services#carpet" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Carpet Dry Cleaning</Link>
                    <Link to="/services#curtain" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Curtain Dry Cleaning</Link>
                    <Link to="/services#leather" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Leather Cleaning</Link>
                    <Link to="/services#steam-ironing" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Steam Ironing Service</Link>
                    <Link to="/b2b-services" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold border-t mt-1 pt-2">B2B Services</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/pricing" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              Pricing
            </Link>
            {/* Store Locator - Hidden but code kept for future use */}
            {/* <Link to="/store-locator" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              Store Locator
            </Link> */}
            <Link to="/get-franchise" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              Get Franchise
            </Link>
            <Link to="/about-us" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              About Us
            </Link>
            <Link to="/blogs" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              Blogs
            </Link>
            <Link to="/contact-us" className={`text-gray-700 ${hoverTextColor('primary')} font-medium`}>
              Contact Us
            </Link>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => window.open(contactInfo.getWhatsAppUrl(), '_blank')}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>
              <button 
                onClick={() => setIsCallbackModalOpen(true)}
                className={`${bgColor('primary')} text-white px-4 py-2 rounded-md ${hoverBgColor('primary')}`}
              >
                Get Callback
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-gray-700 ${hoverTextColor('primary')}`}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

          {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Services</Link>
            <Link to="/b2b-services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">B2B Services</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Pricing</Link>
            {/* Store Locator - Hidden but code kept for future use */}
            {/* <Link to="/store-locator" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Store Locator</Link> */}
            <Link to="/get-franchise" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Get Franchise</Link>
            <Link to="/about-us" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">About Us</Link>
            <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Blogs</Link>
            <Link to="/contact-us" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Contact Us</Link>
            <div className="pt-2 space-y-2">
              <button 
                onClick={() => {
                  setIsMenuOpen(false)
                  window.open(contactInfo.getWhatsAppUrl(), '_blank')
                }}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsCallbackModalOpen(true)
                }}
                className="w-full bg-[#1879a2] text-white px-4 py-2 rounded-md hover:bg-[#145e7d]"
              >
                Get Callback
              </button>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Callback Modal */}
      <CallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={() => setIsCallbackModalOpen(false)} 
      />
    </nav>
  )
}

