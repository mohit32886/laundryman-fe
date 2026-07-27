import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/SEO/MetaTags'
import SchemaMarkup from '../components/SEO/SchemaMarkup'
import { heroGradient, bgColor, textColor, hoverTextColor, hoverBgColor } from '../utils/classNames'
import { contactInfo } from '../config/contact'

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <>
      <MetaTags
        title="About Us - Laundryman | Premium Laundry & Dry Cleaning in Ranchi"
        description="Learn about Laundryman - Ranchi's trusted laundry and dry cleaning service. 7 years of excellence with German eco-friendly solutions and world-class service."
        url="/about-us"
        keywords="about Laundryman, laundry service Ranchi history, dry cleaning company Ranchi, Laundryman story"
      />
      <SchemaMarkup
        type="localBusiness"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about-us' }
          ]
        }}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${heroGradient()} text-white py-20`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🧼 Trusted Fabric & Garment Care Professionals
          </span>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="theme-title-gradient">LAUNDRYMAN</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-slate-300 opacity-90 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get to know Laundryman – Your trusted 7-year laundry and dry cleaning partner in Ranchi
          </motion.p>
        </div>
      </section>

      {/* About Laundryman Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className={`text-3xl md:text-4xl font-bold mb-6 text-center ${textColor('primary')}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Story & Commitment
            </motion.h2>
            <div className="prose prose-lg max-w-none">
              {[
                'Laundryman is a professional laundry and dry-cleaning service operating in Ranchi, Jharkhand. We provide comprehensive cleaning solutions including doorstep pickup & delivery services, expert fabric care, and specialized B2B laundry services for businesses.',
                'Our commitment to quality and customer satisfaction has made us a trusted name in the laundry and dry-cleaning industry. We combine state-of-the-art Italian Lagoon machinery with eco-friendly German cleaning solutions to deliver impeccable results every time.',
                'Whether you need regular laundry services, delicate dry cleaning, or corporate laundry solutions, Laundryman is here to serve you with professionalism and care.'
              ].map((para, idx) => (
                <motion.p
                  key={idx}
                  className={`text-gray-700 text-lg leading-relaxed ${idx < 2 ? 'mb-6' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal & Verification Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${textColor('primary')}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Legal & Business Verification
            </motion.h2>
            
            <div className="space-y-8">
              {/* Business Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Information</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-48 mb-2 sm:mb-0">Business Name (Legal):</span>
                    <span>My Online Services</span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-48 mb-2 sm:mb-0">Brand:</span>
                    <span>Laundryman</span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-48 mb-2 sm:mb-0">Udyam Registration:</span>
                    <span className="font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block font-semibold">UDYAM-JH-20-0030562</span>
                  </div>
                </div>
              </div>

              {/* Registered Address */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Registered Address</h3>
                <div className="text-gray-700">
                  <p className="mb-2">
                    <svg className={`w-5 h-5 inline-block mr-2 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    01, Opp. Bharat Petroleum, Lalgutwa, Daladili Chowk
                  </p>
                  <p className="ml-7">Ranchi, Jharkhand 835302</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <svg className={`w-5 h-5 mr-3 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={contactInfo.getTelUrl()} className={`${textColor('primary')} ${hoverTextColor('primary')} font-semibold`}>
                      {contactInfo.display.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <svg className={`w-5 h-5 mr-3 ${textColor('primary')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:whitebasketpvtltd@gmail.com" className={`${textColor('primary')} ${hoverTextColor('primary')} font-semibold`}>
                      whitebasketpvtltd@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Udyam Certificate Download */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Udyam Certificate</h3>
                <p className="text-gray-700 mb-4">
                  Download our official Udyam registration certificate to verify our business credentials.
                </p>
                <a
                  href="/link-to-udyam.pdf"
                  download
                  className={`inline-flex items-center ${bgColor('primary')} ${hoverBgColor('primary')} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Udyam certificate download will be available soon. Please contact us for a copy.')
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Udyam Certificate
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${textColor('primary')}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Laundryman?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Certified Excellence',
                description: 'Hohenstein and Woolmark certified machinery ensuring the highest quality standards'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Eco-Friendly Solutions',
                description: 'German eco-friendly cleaning solutions that are tough on stains but gentle on fabrics'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Convenient Service',
                description: 'Free pickup and delivery service at your doorstep, making laundry effortless'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Transparent Pricing',
                description: 'Fair and competitive pricing with no hidden charges'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Timely Delivery',
                description: 'Reliable service with on-time delivery guaranteed'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Expert Team',
                description: 'Skilled professionals trained in handling all types of fabrics and garments'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                <motion.div 
                  className={`${bgColor('bgLight')} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${textColor('primary')}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white py-16 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Experience Laundryman?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule your first pickup today and get 20% off on your first order!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
              Chat on WhatsApp
            </motion.button>
            <motion.button 
              onClick={() => navigate('/schedule-pickup')}
              className={`bg-white ${textColor('primary')} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Laundryman
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  )
}
