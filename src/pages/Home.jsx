import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TestimonialCarousel from '../components/TestimonialCarousel'
import PickupModal from '../components/PickupModal'
import { heroGradient, bgColor, hoverBgColor, textColor, hoverTextColor } from '../utils/classNames'
import { contactInfo } from '../config/contact'

export default function Home() {
  const location = useLocation()
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  useEffect(() => {
    if (location.hash === '#faq') {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className={`${heroGradient()} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              World Class <span className="text-yellow-300">DRY CLEAN & LAUNDRY</span> Service, <span className="text-yellow-300">NOW IN INDIA</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              World Renowned Machines
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              German Eco Friendly Cleaning Solutions
            </motion.p>
            <motion.div 
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg inline-block mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-2xl font-bold">Flat 20% Off On 1st Order</span>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button 
                onClick={() => window.open(contactInfo.getWhatsAppUrl(), '_blank')}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat On WhatsApp
              </motion.button>
              <motion.button 
                onClick={() => setIsPickupModalOpen(true)}
                className={`bg-white ${textColor('primary')} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Free Pickup
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Trust Banner */}
      <section className={`${bgColor('primary')} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border-2 border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              >
                7
              </motion.div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold">Years of Excellence</div>
                <div className="text-sm md:text-base opacity-90">Trusted by thousands of customers in Ranchi</div>
              </div>
              <motion.svg
                className="w-12 h-12 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ rotate: -10 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Infographic */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">PREMIUM FEATURES FOR EXCEPTIONAL CARE</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience world-class laundry and dry cleaning services with our advanced technology and expert care
            </p>
            {/* Infographic */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <div className={`${bgColor('primary')} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Collection</h3>
                    <p className="text-gray-600 text-sm">Free pickup from your doorstep</p>
                  </div>
                  <div className="text-center">
                    <div className={`${bgColor('primary')} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* T-shirt */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3l-3 3v2h4v-2h10v2h4V6l-3-3h-3l-2 2h-2l-2-2H6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v5M17 8v5" />
                        {/* Washing basin/tub */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h16l-2 7H6l-2-7z" />
                        {/* Bubbles */}
                        <circle cx="8" cy="17" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="19" r="1" fill="currentColor" />
                        <circle cx="14" cy="19" r="1" fill="currentColor" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Processing</h3>
                    <p className="text-gray-600 text-sm">Expert care with premium solutions</p>
                  </div>
                  <div className="text-center">
                    <div className={`${bgColor('primary')} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Delivery</h3>
                    <p className="text-gray-600 text-sm">On-time delivery to your home</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className={`w-10 h-10 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="14" cy="14" r="1" fill="currentColor" />
                  </svg>
                ),
                bg: bgColor('bgLight'),
                title: 'Dirt Spotting Before Wash',
                desc: 'Expert stain identification and pre-treatment for best results'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                bg: 'bg-green-100',
                title: 'Hygiene in Focus',
                desc: 'Separate wash cycle for each customer with Sanitization'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                  </svg>
                ),
                bg: 'bg-purple-100',
                title: 'On Time Delivery',
                desc: 'Reliable and punctual service every time'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4M12 18v4M4 12h4M16 12h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.343 6.343l2.828 2.828M14.828 14.828l2.828 2.828M17.657 6.343l-2.828 2.828M9.172 14.828l-2.828 2.828" />
                  </svg>
                ),
                bg: 'bg-yellow-100',
                title: 'German Eco Friendly Cleaning Solutions',
                desc: 'Tough on stains, gentle on fabric'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c0 0-6 8-6 12a6 6 0 0012 0c0-4-6-12-6-12z" />
                    <circle cx="10" cy="14" r="1.5" fill="white" opacity="0.6" />
                  </svg>
                ),
                bg: 'bg-red-100',
                title: 'Blood Spot Removal',
                desc: 'Professional treatment to completely remove blood stains from fabrics'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <rect x="8" y="12" width="8" height="10" rx="1" fill="#374151" />
                    <rect x="9" y="14" width="6" height="1" fill="#4B5563" />
                    <rect x="9" y="16" width="6" height="1" fill="#4B5563" />
                    <path d="M8 12h8V8L12 3L8 8v4z" fill="#EC4899" />
                    <path d="M8 8l4-5l1 5H8z" fill="#F472B6" />
                  </svg>
                ),
                bg: 'bg-pink-100',
                title: 'Makeup Stain Removal',
                desc: 'Specialized techniques to remove lipstick, foundation, and cosmetic stains'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24">
                    <path d="M4 11h16a1 1 0 010 2H4a1 1 0 010-2z" fill="currentColor" />
                    <path d="M5 8c0-3 3-5 7-5s7 2 7 5H5z" fill="currentColor" />
                    <path d="M5 15h14v2c0 2-2 4-7 4s-7-2-7-4v-2z" fill="currentColor" />
                    <circle cx="8" cy="6" r="0.5" fill="white" />
                    <circle cx="12" cy="5" r="0.5" fill="white" />
                    <circle cx="16" cy="6" r="0.5" fill="white" />
                  </svg>
                ),
                bg: 'bg-orange-100',
                title: 'Food Stain Removal',
                desc: 'Effective removal of grease, sauce, and food stains from all fabric types'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                ),
                bg: 'bg-amber-100',
                title: 'Rust Stain Removal',
                desc: 'Advanced treatment to eliminate rust and metal stains from garments'
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 2.65a2.5 2.5 0 00-3.54 0l-1.41 1.41-1.41-1.41a1 1 0 00-1.41 1.41l1.41 1.41-7.07 7.07a2 2 0 00-.59 1.41v2.83a1 1 0 001 1h2.83a2 2 0 001.41-.59l7.07-7.07 1.41 1.41a1 1 0 001.41-1.41l-1.41-1.41 1.41-1.41a2.5 2.5 0 000-3.54zM9.17 15H7v-2.17l7.07-7.07 2.17 2.17L9.17 15z" />
                    <path d="M6 19c0 0-2 2-2 4a2 2 0 004 0c0-2-2-4-2-4z" />
                  </svg>
                ),
                bg: 'bg-indigo-100',
                title: 'Color Bleed & Dye Removal',
                desc: 'Expert color bleeding prevention and dye stain removal techniques'
              }
            ].map((feature, idx) => (
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
                  className={`${feature.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">OUR EXPERT SERVICES</h2>
          <p className="text-center text-gray-600 mb-12">Laundryman stores are one-stop shop for all your cleaning needs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: (
                  <svg className={`w-8 h-8 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth={2} />
                    <circle cx="12" cy="12" r="4" strokeWidth={2} />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18M6 20h2M16 20h2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h1M15 12h1" />
                  </svg>
                ),
                bg: bgColor('bgLight'),
                title: 'Laundry',
                desc: 'Wash & Fold | Wash & Steam Iron',
                link: null
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v1.5M12 18.5v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4h6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4l-2.5 10c0 1.5 1 2.5 3.5 2.5s3.5-1 3.5-2.5L12 4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 8h4M10 12h4" />
                  </svg>
                ),
                bg: 'bg-green-100',
                title: 'Dry Cleaning',
                desc: 'Designer Wear, Heavy Ethnic Wear & Woollens',
                link: null
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {/* Sneaker outline */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 17.5h20c0 0 0 2-2 2H4c-2 0-2-2-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 17.5c0-1.5 0.5-3 2-3.5l3-1c1-0.3 2-1.5 2.5-2.5l1-2c0.5-1 1.5-2 3-2h4c1 0 2 0.5 2.5 1.5l1 2c0.5 1 1.5 1.5 2 1.5h1c0.5 0 1 0.5 1 1v5" />
                    {/* Laces */}
                    <path strokeLinecap="round" d="M9 10l2 1.5M11 9l2 1.5M13 8l2 1.5" />
                    {/* Heel detail */}
                    <path strokeLinecap="round" d="M4 15.5c1-0.5 2-0.5 3 0" />
                  </svg>
                ),
                bg: 'bg-purple-100',
                title: 'Shoe Cleaning',
                desc: 'Shoe Cleaning, Restoration & Protection',
                link: null
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 16h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 16V8M18 16V8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20v1M20 20v1" />
                  </svg>
                ),
                bg: 'bg-teal-100',
                title: 'Sofa Cleaning',
                desc: 'Deep Cleaning & Stain Removal for Upholstery',
                link: null
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                bg: 'bg-yellow-100',
                title: 'B2B Services',
                desc: 'Corporate, Hotel & Institutional Solutions',
                link: '/b2b-services'
              }
            ].map((service, idx) => {
              const content = (
                <motion.div
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center flex flex-col h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                >
                  <motion.div 
                    className={`${service.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 flex-shrink-0">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">{service.desc}</p>
                </motion.div>
              )
              
              return service.link ? (
                <Link key={idx} to={service.link}>
                  {content}
                </Link>
              ) : (
                <div key={idx}>{content}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">BEST LAUNDRY & DRY CLEAN SERVICE, NOW WITH FREE HOME DELIVERY</h2>
          <p className="text-center text-gray-600 mb-12">Laundryman stores provide free home pickup and delivery at a time of your convenience. We also provide express delivery service</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className={`text-2xl font-bold mb-6 ${textColor('primary')}`}>Regular Delivery</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="font-semibold">Free</span> (No extra charges)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Laundry – 48 Hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dry Clean – 72 Hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Shoe Cleaning – 3 to 5 Days</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className={`text-2xl font-bold mb-6 ${textColor('primary')}`}>Express Delivery</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#24bcee] mr-2">⚡</span>
                  <span>1.5 times extra charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24bcee] mr-2">⚡</span>
                  <span>Same-day or next-day delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24bcee] mr-2">⚡</span>
                  <span>Available for selected services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Stage Process */}
      <section className={`py-16 ${heroGradient()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">6 STAGE PROCESS FOR UNMATCHED GARMENT CARE</h2>
          <p className="text-center text-white/80 mb-12">Specialized Machinery & Skilled Experts for each stage makes us the best laundry & dry cleaner near you.</p>
          
          {/* Timeline Flow */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-white/20">
              <motion.div 
                className="h-full bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch">
              {[
                { 
                  title: 'Sorting & Inspection', 
                  desc: 'Segregation basis care label, fabric type and color',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Stain Treatment', 
                  desc: 'Advanced spotting machines | Premium stain removing solutions',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c0 0-6 8-6 12a6 6 0 0012 0c0-4-6-12-6-12z" />
                    </svg>
                  )
                },
                { 
                  title: 'Processing', 
                  desc: 'World-Renowned Dry cleaning machines | Eco-friendly solutions',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {/* T-shirt */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3l-3 3v2h4v-2h10v2h4V6l-3-3h-3l-2 2h-2l-2-2H6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v5M17 8v5" />
                      {/* Washing basin/tub */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h16l-2 7H6l-2-7z" />
                      {/* Bubbles */}
                      <circle cx="8" cy="17" r="1.5" fill="currentColor" />
                      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                      <circle cx="16" cy="17" r="1.5" fill="currentColor" />
                    </svg>
                  )
                },
                { 
                  title: 'Finishing', 
                  desc: 'Unique Steam Ironing equipment for each garment type',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )
                },
                { 
                  title: 'Quality Check', 
                  desc: 'Meticulous inspection of each item by experts',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Packing', 
                  desc: 'Folded, Hanger or Vacuum packing as per preference',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  className="relative text-center group flex flex-col h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  {/* Step Circle */}
                  <motion.div 
                    className="relative z-10 mx-auto mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                      <div className={`${textColor('primary')}`}>
                        {step.icon}
                      </div>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shadow">
                      {idx + 1}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 transition-colors flex-1 flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-white/70 text-sm flex-1">{step.desc}</p>
                  </motion.div>
                  
                  {/* Arrow for desktop */}
                  {idx < 5 && (
                    <div className="hidden lg:block absolute top-8 -right-3 z-20">
                      <motion.svg 
                        className="w-6 h-6 text-yellow-400"
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.3 }}
                      >
                        <path d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                      </motion.svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-center text-gray-600 mb-12">
            Real feedback from our satisfied customers in Ranchi, Jharkhand
          </p>
          
          <TestimonialCarousel 
            testimonials={[
              {
                name: 'Santosh Gupta',
                role: 'Senior Lecturer',
                rating: 5,
                text: 'I am satisfied with the quality and timelines of service.',
                location: 'Lalgutwa, Ranchi',
                serviceUsed: 'Laundry & Dry Cleaning',
                customerSince: '2 years'
              },
              {
                name: 'Ashish Chawla',
                role: 'Designer',
                rating: 5,
                text: 'I am very happy that Laundryman doesn\'t use PERC. They use organic chemicals.',
                location: 'Doranda, Ranchi',
                serviceUsed: 'Dry Cleaning',
                customerSince: '1 year'
              },
              {
                name: 'Manisha Sharma',
                role: 'Instagram Blogger',
                rating: 4,
                text: 'Premium quality wash & steam iron at affordable rates.',
                location: 'Harmu, Ranchi',
                serviceUsed: 'Laundry Service',
                customerSince: '6 months'
              },
              {
                name: 'Smita Mukherjee',
                role: 'Home Maker',
                rating: 5,
                text: 'Professional Team. On Time Services. Optimal pricing.',
                location: 'Hinoo, Ranchi',
                serviceUsed: 'All Services',
                customerSince: '3 years'
              },
              {
                name: 'Rajesh Kumar',
                role: 'Business Owner',
                rating: 5,
                text: 'Excellent B2B services for our office. Highly reliable and professional.',
                location: 'Kantatoli, Ranchi',
                serviceUsed: 'B2B Services',
                customerSince: '2 years'
              },
              {
                name: 'Priya Singh',
                role: 'Fashion Designer',
                rating: 5,
                text: 'They handle my designer wear with such care. Best dry cleaning service!',
                location: 'Dhurwa, Ranchi',
                serviceUsed: 'Dry Cleaning',
                customerSince: '1.5 years'
              }
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">KNOW MORE ABOUT LAUNDRYMAN</h2>
          <div className="space-y-4">
            {[
              { q: 'What is dry cleaning?', a: 'Dry cleaning is a professional cleaning process that uses specialized solvents instead of water to clean delicate fabrics and garments. At Laundryman, we use the world\'s latest Lagoon technology – a completely eco-friendly and Woolmark certified process that is gentle on fabrics while being tough on stains. This method prevents color bleeding, shrinkage, and fabric damage that can occur with traditional water-based washing.' },
              { q: 'What dry cleaning services does Laundryman provide in Ranchi?', a: 'Laundryman offers comprehensive dry cleaning services in Ranchi including haute couture, bridal wear (lehengas, sherwanis), silk sarees, designer wear, woolens, suits, blazers, jackets, carpets, blankets, curtains, blinds, soft toys, suitcases/trolleys, and leather items. We specialize in handling delicate and expensive fabrics with utmost care using German eco-friendly cleaning solutions.' },
              { q: 'Why is Laundryman the best dry cleaner in Ranchi?', a: 'Laundryman stands out as Ranchi\'s premier dry cleaning service due to our world-renowned Lagoon technology, German eco-friendly cleaning solutions, and 7 years of trusted excellence. Our process is 100% color bleeding and shrinkage proof. We can remove 99% of stains – including old and stubborn ones like blood, makeup, food, and rust. Each customer gets a separate wash cycle ensuring complete hygiene, and our expert team follows a meticulous 6-stage process for unmatched garment care.' },
              { q: 'How to avail services from Laundryman in Ranchi?', a: 'Availing Laundryman\'s services is simple and convenient! You can schedule a free home pickup by calling us, messaging on WhatsApp, or booking through our website. Our delivery executive will collect your garments from your doorstep at your preferred time. You can also walk-in and drop your clothes at our store. We serve all areas of Ranchi including Harmu, Hinoo, Doranda, Lalpur, Kantatoli, and more.' },
              { q: 'What hygiene precautions does Laundryman take?', a: 'Hygiene is our top priority at Laundryman. We follow strict sanitization protocols including: separate wash cycle for each customer\'s clothes, sanitization of all garments, use of eco-friendly German cleaning solutions that are safe for skin, regular deep cleaning of all machinery, and proper packaging to ensure your clothes remain fresh and hygienic until delivery. Our Lagoon technology is Woolmark certified for quality and safety.' },
              { q: 'Does Laundryman provide same day or express delivery?', a: 'Yes! Laundryman offers express delivery service for urgent requirements. Our regular delivery timelines are: Laundry – 48 hours, Dry Cleaning – 72 hours, and Shoe Cleaning – 3 to 5 days. For express delivery, we offer same-day or next-day service at 1.5x the regular price. Express delivery is available for selected services – contact us to check availability for your specific requirement.' },
              { q: 'Does Laundryman provide free home delivery in Ranchi?', a: 'Absolutely! Laundryman provides FREE home pickup and delivery across Ranchi. There are no hidden charges for collection or delivery. Simply schedule a pickup at your convenient time, and our delivery executive will collect your garments from your doorstep and deliver them back once cleaned – all at no extra cost. We cover all major areas of Ranchi.' },
              { q: 'What are the prices for Laundryman dry cleaning services?', a: 'Laundryman offers premium dry cleaning services at competitive and transparent prices. We currently have a special offer of Flat 20% Off on your first order! Our pricing varies based on the type of garment and service required. For detailed pricing, please contact us via WhatsApp or call us. We assure you the best value for world-class dry cleaning service in Ranchi.' },
              { q: 'Do you provide online dry cleaning service in Ranchi?', a: 'Yes, Laundryman offers convenient online dry cleaning service in Ranchi. You can easily book a pickup through our website, WhatsApp, or by calling us. Our process is completely digital – from booking to tracking your order. We\'ll pick up your clothes from your doorstep, clean them with our premium process, and deliver them back to you without you having to step out of your home.' },
              { q: 'Does Laundryman clean curtains and carpets in Ranchi?', a: 'Yes, Laundryman provides professional curtain and carpet dry cleaning services in Ranchi. Our specialized cleaning process effectively removes dust, allergens, stains, and odors from curtains and carpets without causing any damage or shrinkage. We handle all types of fabrics including heavy drapes, sheer curtains, and various carpet materials. Free pickup and delivery available for these bulky items.' },
              { q: 'Can I walk-in and drop clothes at Laundryman store in Ranchi?', a: 'Yes, you can walk-in to our Laundryman store in Ranchi to drop off your clothes. Our friendly staff will assist you with garment inspection, provide you with a detailed receipt, and give you an estimated delivery time. However, for your convenience, we highly recommend our free home pickup service – saving you time and effort while ensuring the same premium quality service.' },
              { q: 'Does Laundryman have express delivery for dry cleaning in Ranchi?', a: 'Yes, Laundryman offers express delivery service for customers who need their garments urgently. With express service, you can get your dry cleaning done in same-day or next-day delivery. Express delivery is charged at 1.5 times the regular price and is subject to availability. This is perfect for last-minute events, business meetings, or emergencies. Contact us to check express delivery availability for your order.' },
              { q: 'How good is Laundryman\'s shoe cleaning service in Ranchi?', a: 'Laundryman\'s shoe cleaning service in Ranchi is exceptional! We offer comprehensive shoe care including deep cleaning, stain removal, restoration, and protection services. Our experts handle all types of footwear – sneakers, leather shoes, formal shoes, sports shoes, and more. We use specialized cleaning solutions and techniques to restore your shoes to their original glory. Delivery time for shoe cleaning is 3-5 days.' },
              { q: 'What makes Laundryman\'s laundry service different?', a: 'Laundryman\'s laundry service stands apart with our premium Wash & Fold and Wash & Steam Iron options. We use world-renowned washing machines, German eco-friendly detergents, and follow a strict 6-stage process: Sorting & Inspection, Stain Treatment, Processing, Finishing, Quality Check, and Packing. Each customer gets a separate wash cycle, and our expert steam ironing gives your clothes a crisp, professional finish.' },
              { q: 'Does Laundryman provide B2B laundry services for businesses?', a: 'Yes, Laundryman offers specialized B2B laundry and dry cleaning services for businesses in Ranchi. We cater to hotels, corporate offices, hospitals, gyms, salons, and other institutions with customized solutions, dedicated pickup schedules, and competitive bulk pricing. Our B2B services ensure consistent quality, timely delivery, and professional handling of large volumes. Contact us for a customized quote for your business needs.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold pr-4">{faq.q}</h3>
                  <motion.svg
                    className="w-6 h-6 text-gray-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openFaqIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup Modal */}
      <PickupModal 
        isOpen={isPickupModalOpen} 
        onClose={() => setIsPickupModalOpen(false)} 
      />
    </div>
  )
}

