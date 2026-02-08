import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import B2BQuoteModal from '../components/B2BQuoteModal'
import { contactInfo } from '../config/contact'
import { heroGradient, bgColor, textColor } from '../utils/classNames'

export default function B2BServices() {
  const [isB2BQuoteModalOpen, setIsB2BQuoteModalOpen] = useState(false)
  const [activePricingTab, setActivePricingTab] = useState('hotel')

  const services = [
    {
      title: 'Corporate Laundry Services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Complete laundry solutions for offices and corporate facilities',
      features: [
        'Employee uniform cleaning',
        'Office linens and towels',
        'Scheduled pickups',
        'Bulk pricing discounts',
        'Dedicated account manager'
      ]
    },
    {
      title: 'Hotel & Hospitality',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      description: 'Professional linen services for hotels and resorts',
      features: [
        'Bed linens and towels',
        'Restaurant linens',
        'Daily pickup and delivery',
        'Same-day service available',
        'Large volume handling'
      ]
    },
    {
      title: 'Restaurant Services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Specialized cleaning for restaurant linens and uniforms',
      features: [
        'Table linens and napkins',
        'Kitchen uniforms',
        'Chef aprons and hats',
        'Daily or scheduled service',
        'Stain removal expertise'
      ]
    },
    {
      title: 'Healthcare Facilities',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Sanitized laundry services for hospitals and clinics',
      features: [
        'Medical linens',
        'Patient gowns',
        'Hospital uniforms',
        'HIPAA compliant processing',
        'Sanitization protocols'
      ]
    },
    {
      title: 'Tent House & Events',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Event & wedding linen cleaning for tent houses',
      features: [
        'Parda & curtain cleaning',
        'Table covers & chair covers',
        'Bedsheets & towels',
        'Bulk volume pricing',
        'Quick turnaround'
      ]
    },
    {
      title: 'Spa & Salon',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      description: 'Fresh, hygienic linens for wellness centers',
      features: [
        'Towels & robes',
        'Bedsheets & aprons',
        'Daily pickup option',
        'Sanitized washing',
        'Subscription plans'
      ]
    }
  ]

  const benefits = [
    {
      title: 'Volume Discounts',
      description: 'Special pricing for bulk orders - save up to 40% on large volumes',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Indian Rupee Symbol ₹ */}
          <path d="M6 3h12" />
          <path d="M6 7h12" />
          <path d="M9 3c2 0 4 1 4 4s-2 4-4 4" />
          <path d="M9 11l6 10" />
        </svg>
      )
    },
    {
      title: 'Custom Contracts',
      description: 'Flexible terms and pricing tailored to your business needs',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Dedicated Account Manager',
      description: 'Personal account manager for seamless service coordination',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Scheduled Pickups',
      description: 'Regular scheduled pickups at your convenience',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Fast Turnaround',
      description: 'Priority processing ensures quick delivery times',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Quality Assurance',
      description: 'Consistent quality with our certified processes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className={`${heroGradient()} text-white py-20 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Trusted by 50+ Businesses in Ranchi</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              B2B <span className="text-yellow-300">Laundry</span> Services
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Professional Laundry & Dry Cleaning Solutions for Your Business
            </motion.p>
            
            <motion.p 
              className="text-lg mb-8 max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Partner with White Basket Laundry for comprehensive, cost-effective laundry solutions tailored to your business needs. 
              From corporate offices to hotels, restaurants, and healthcare facilities - we deliver excellence.
            </motion.p>
            
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
                Contact Sales Team
              </motion.button>
              <motion.button 
                onClick={() => setIsB2BQuoteModalOpen(true)}
                className="bg-white text-[#1879a2] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quote
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className={`${bgColor('primary')} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: '50+', label: 'Business Partners' },
              { value: '10K+', label: 'Items/Month' },
              { value: '48hr', label: 'Turnaround' },
              { value: '99%', label: 'Satisfaction Rate' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR B2B SERVICE OFFERINGS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive solutions for every industry - from hotels to hospitals, we've got you covered</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`${bgColor('bgLight')} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className={textColor('primary')}>{service.icon}</span>
                </motion.div>
                <h3 className={`text-2xl font-bold mb-3 ${textColor('primary')}`}>{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Stage B2B Process - Matching Home Page Style */}
      <section className={`py-16 ${heroGradient()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            HOW B2B PARTNERSHIP WORKS
          </motion.h2>
          <motion.p 
            className="text-center text-white/80 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Simple 4-step process to get started with our B2B laundry services
          </motion.p>
          
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {[
                { 
                  title: 'Consultation', 
                  desc: 'Our B2B team understands your requirements and creates a custom solution',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )
                },
                { 
                  title: 'Contract Setup', 
                  desc: 'Flexible contract terms with pricing tailored to your volume and needs',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Scheduled Service', 
                  desc: 'Regular scheduled pickups at times convenient for your business',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Professional Processing', 
                  desc: 'Your items processed using our certified methods and delivered on time',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                      <div className={textColor('primary')}>
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
                  {idx < 3 && (
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">WHY CHOOSE WHITE BASKET B2B?</h2>
            <p className="text-gray-600">Benefits that make a difference to your business</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`${bgColor('bgLight')} w-14 h-14 rounded-full flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className={textColor('primary')}>{benefit.icon}</span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Pricing Section with Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">B2B PRICING</h2>
            <p className="text-gray-600">Transparent pricing for all your linen and laundry needs</p>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-md">
              {[
                { id: 'hotel', label: 'Hotel & Hospitality', icon: '🏨' },
                { id: 'hospital', label: 'Hospital & Healthcare', icon: '🏥' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActivePricingTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activePricingTab === tab.id
                      ? 'bg-gradient-to-r from-[#1879a2] to-[#24bcee] text-white shadow-lg'
                      : 'text-gray-600 hover:text-[#1879a2]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Hotel Pricing */}
          {activePricingTab === 'hotel' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Bed Linens */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`${bgColor('bgLight')} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${textColor('primary')}`}>Bed Linens</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Bed Sheet (Single)', price: 20 },
                    { item: 'Bed Sheet (Double)', price: 25 },
                    { item: 'Duvet Cover (Single)', price: 25 },
                    { item: 'Duvet Cover (Double)', price: 30 },
                    { item: 'Pillow Cover', price: 10 },
                    { item: 'Cushion Cover', price: 8 },
                    { item: 'Bed Runner', price: 10 },
                    { item: 'Mattress Protector (S)', price: 45 },
                    { item: 'Mattress Protector (D)', price: 65 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className={`font-semibold ${textColor('primary')}`}>₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Towels & Mats */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`${bgColor('bgLight')} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${textColor('primary')}`}>Towels & Mats</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Hand Towel', price: 8 },
                    { item: 'Bath Towel', price: 15 },
                    { item: 'Bathmat', price: 10 },
                    { item: 'Door Mat', price: 15 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className={`font-semibold ${textColor('primary')}`}>₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Curtains & Blankets */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`${bgColor('bgLight')} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${textColor('primary')}`}>Curtains & Blankets</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Window Curtain', price: 15 },
                    { item: 'Door Curtain', price: 20 },
                    { item: 'Curtain (Normal Wash)', price: 18 },
                    { item: 'Blanket (Single)', price: 65 },
                    { item: 'Blanket (Double)', price: 85 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className={`font-semibold ${textColor('primary')}`}>₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Table Linens */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`${bgColor('bgLight')} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${textColor('primary')}`}>Table Linens</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'White Napkin', price: 7 },
                    { item: 'Table Mat', price: 10 },
                    { item: 'Tablecloth & Top', price: 10 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className={`font-semibold ${textColor('primary')}`}>₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Uniforms & Staff Wear */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`${bgColor('bgLight')} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${textColor('primary')}`}>Uniforms & Staff Wear</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Apron', price: 40 },
                    { item: 'Waist Coat (Dry Clean)', price: 55 },
                    { item: 'Captain Coat (Dry Clean)', price: 40 },
                    { item: 'Tie (Dry Clean)', price: 12 },
                    { item: 'Saree', price: 100 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className={`font-semibold ${textColor('primary')}`}>₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bulk Discount Info */}
              <motion.div 
                className="bg-gradient-to-br from-[#1879a2] to-[#24bcee] text-white rounded-xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Bulk Discounts</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-white/90">Special pricing available for high-volume orders:</p>
                  <ul className="space-y-2">
                    {[
                      '10-20% off on monthly contracts',
                      'Custom pricing for 500+ items/month',
                      'Dedicated pickup schedule',
                      'Priority processing'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-yellow-300 mr-2">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button 
                    onClick={() => setIsB2BQuoteModalOpen(true)}
                    className="mt-4 w-full bg-white text-[#1879a2] hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Custom Quote
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Hospital Pricing */}
          {activePricingTab === 'hospital' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Patient Linens */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Patient Linens</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Bedsheet', price: 10 },
                    { item: 'Pillow Cover', price: 3 },
                    { item: 'Blanket', price: 20 },
                    { item: 'Long Curtain', price: 14 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className="font-semibold text-green-600">₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Patient Wear */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Patient Wear</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Patient Gown', price: 6 },
                    { item: 'Patient Payjama', price: 5 },
                    { item: 'Guest Dress', price: '80/kg' },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className="font-semibold text-green-600">₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Towels */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Towels</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Hand Towel', price: 4 },
                    { item: 'Big Towel', price: 6 },
                    { item: 'Towel (OT)', price: 10 },
                    { item: 'Eye Towel (Big)', price: 6 },
                    { item: 'Eye Towel (Small)', price: 4 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className="font-semibold text-green-600">₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* OT Linens */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">OT Linens</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Long Sheet (OT)', price: 8 },
                    { item: 'Small Sheet (OT)', price: 5 },
                    { item: 'Wrapper (OT)', price: 8 },
                    { item: 'Trolley Sheet', price: 5 },
                    { item: 'Cut-sheet (Big)', price: 10 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className="font-semibold text-green-600">₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Staff Uniforms */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Staff Uniforms</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Surgical Gown', price: 15 },
                    { item: 'Scrub Suit Shirt', price: 5 },
                    { item: 'Apron', price: 12.50 },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{row.item}</span>
                      <span className="font-semibold text-green-600">₹{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bulk Discount Info - Hospital */}
              <motion.div 
                className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Hospital Bulk Contracts</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-white/90">Special pricing for healthcare facilities:</p>
                  <ul className="space-y-2">
                    {[
                      'Daily pickup & delivery',
                      'Sanitized processing',
                      '15-25% off on annual contracts',
                      'Emergency same-day service'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-yellow-300 mr-2">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button 
                    onClick={() => setIsB2BQuoteModalOpen(true)}
                    className="mt-4 w-full bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Hospital Quote
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Pricing Note */}
          <motion.div 
            className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-yellow-800">
              <span className="font-semibold">Note:</span> Prices shown are per unit. GST applicable as per government norms. 
              Contact us for customized pricing based on your volume requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${heroGradient()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Partner With Us?</h2>
            <p className="text-xl mb-8 text-white/90">Get a customized quote for your business today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={() => window.open(contactInfo.getWhatsAppUrl(), '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact Sales Team
              </motion.button>
              <motion.button 
                onClick={() => setIsB2BQuoteModalOpen(true)}
                className="bg-white text-[#1879a2] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quote
              </motion.button>
              <Link to="/pricing">
                <motion.button 
                  className="bg-[#24bcee] hover:bg-[#35a0d9] text-white px-8 py-3 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* B2B Quote Modal */}
      <B2BQuoteModal 
        isOpen={isB2BQuoteModalOpen} 
        onClose={() => setIsB2BQuoteModalOpen(false)} 
      />
    </div>
  )
}
