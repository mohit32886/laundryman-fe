import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { textColor, hoverTextColor, bgColor, hoverBgColor } from '../utils/classNames'
import { colors } from '../config/colors'
import { contactInfo } from '../config/contact'
import CallbackModal from './CallbackModal'
import { CustomerNavMenuDesktop, CustomerNavMenuMobile } from './CustomerNavMenu'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

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

  // Menu items with icons
  const menuItems = [
    { path: '/services', label: 'Services', icon: 'M4 6h16M4 12h16M4 18h16' },
    { path: '/b2b-services', label: 'B2B Services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { path: '/pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/subscriptions', label: 'Monthly Plans', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/get-franchise', label: 'Get Franchise', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { path: '/about-us', label: 'About Us', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { path: '/contact-us', label: 'Contact Us', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  // Animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  }

  const hamburgerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 90,
    },
  }

  return (
    <nav className="glass-panel-dark sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 select-none">
            <Link to="/" className="flex items-center outline-none focus:outline-none focus:ring-0 select-none">
              <img 
                src="/logo.png" 
                alt="Laundryman Logo" 
                className="h-12 w-auto object-contain select-none pointer-events-none"
                draggable={false}
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
                className="text-slate-100 hover:text-cyan-300 font-medium flex items-center transition-colors"
              >
                Services
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-1 w-56 glass-panel-dark rounded-xl shadow-2xl py-2 z-50 border border-slate-800 text-slate-100"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/services#dry-cleaning" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">Dry Cleaning Service</Link>
                    <Link to="/services#shoe-cleaning" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">Shoe Cleaning Service</Link>
                    <Link to="/services#carpet" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">Carpet Dry Cleaning</Link>
                    <Link to="/services#curtain" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">Curtain Dry Cleaning</Link>
                    <Link to="/services#leather" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">Leather Cleaning</Link>
                    <Link to="/b2b-services" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2 text-cyan-300 hover:bg-cyan-500/20 font-semibold border-t border-slate-800 mt-1 pt-2">B2B Services</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/pricing" className="text-slate-100 hover:text-cyan-300 font-medium transition-colors select-none outline-none focus:outline-none focus:ring-0">
              Pricing
            </Link>
            <Link to="/subscriptions" className="text-slate-100 hover:text-cyan-300 font-medium transition-colors select-none outline-none focus:outline-none focus:ring-0">
              Plans
            </Link>
            <Link to="/get-franchise" className="text-slate-100 hover:text-cyan-300 font-medium transition-colors select-none outline-none focus:outline-none focus:ring-0">
              Franchise
            </Link>
            <Link to="/about-us" className="text-slate-100 hover:text-cyan-300 font-medium transition-colors select-none outline-none focus:outline-none focus:ring-0">
              About Us
            </Link>
            <Link to="/contact-us" className="text-slate-100 hover:text-cyan-300 font-medium transition-colors select-none outline-none focus:outline-none focus:ring-0">
              Contact Us
            </Link>

            {/* CTA + account */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCallbackModalOpen(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Get Callback
              </button>
              <CustomerNavMenuDesktop />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-100 hover:text-cyan-300 min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                variants={hamburgerVariants}
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Slide-in Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden safe-area-inset"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="min-h-[48px] min-w-[48px] flex items-center justify-center text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-2">
                    {menuItems.map((item) => (
                      <motion.div
                        key={item.path}
                        variants={itemVariants}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 min-h-[48px] text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <svg
                            className="h-5 w-5 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={item.icon}
                            />
                          </svg>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="px-2">
                    <CustomerNavMenuMobile onNavigate={() => setIsMenuOpen(false)} />
                  </div>
                </nav>

                {/* CTA Buttons */}
                <div className="p-4 border-t space-y-2 safe-area-inset">
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        window.open(contactInfo.getWhatsAppUrl(), '_blank')
                      }}
                      className="w-full min-h-[48px] bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 flex items-center justify-center font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsCallbackModalOpen(true)
                      }}
                      className={`w-full min-h-[48px] ${bgColor('primary')} text-white px-4 py-3 rounded-md ${hoverBgColor('primary')} font-medium transition-colors`}
                    >
                      Get Callback
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
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

