import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../config/colors'
import { contactInfo } from '../config/contact'

export default function Pricing() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const pricingData = {
    Men: [
      { item: 'Shirt', price: '₹39 (Normal) / ₹69 (Silk)' },
      { item: 'White Shirt', price: '₹49' },
      { item: 'T-Shirt', price: '₹39' },
      { item: 'Shorts (Half Pant)', price: '₹35' },
      { item: 'Trouser / Jeans / Dhoti', price: '₹45' },
      { item: 'Kurta / Bandi', price: '₹59 (Normal) / ₹109 (Silk)' },
      { item: 'Pyjama', price: '₹59' },
      { item: 'Safari', price: '₹149' },
      { item: 'Blazer / Coat', price: '₹239' },
      { item: 'Jacket Normal', price: '₹119 - ₹699' },
      { item: 'Leather Jacket', price: '₹449' },
      { item: 'Sherwani', price: '₹299 - ₹399' },
      { item: 'Sherwani Set', price: '₹499 - ₹699' },
      { item: 'Suit 2pc / 3pc', price: '₹339 / ₹369' },
      { item: 'Sweater / Cardigan', price: '₹99 (Half) / ₹160 (Full)' },
      { item: 'Socks / Gloves / UG\'s', price: '₹19' },
      { item: 'Handkerchief', price: '₹19' },
      { item: 'Tie', price: '₹29' },
      { item: 'Sweatshirt', price: '₹149' },
      { item: 'Track Suit', price: '₹119' }
    ],
    Women: [
      { item: 'Kurti / Kameez', price: '₹59 - ₹100 (Normal) / ₹100 (Silk)' },
      { item: 'Salwar / Pyjama etc', price: '₹59 - ₹100 (Silk)' },
      { item: 'Salwar, Pyjama, Dupatta Set', price: '₹159' },
      { item: 'Westerns / One Piece', price: '₹149 (Normal) / ₹170 (Party Wear)' },
      { item: 'Long Gown / Maxi', price: '₹199' },
      { item: 'Fancy Long Gown / Maxi', price: '₹299 - ₹500' },
      { item: 'Trousers / Leggings / Jeans', price: '₹49' },
      { item: 'Skirt', price: '₹49' },
      { item: 'Saree', price: '₹179' },
      { item: 'Saree (Work)', price: '₹249 (Normal) / ₹300 - ₹500 (Silk)' },
      { item: 'Blouse', price: '₹29 - ₹50' },
      { item: 'Blouse (Fancy)', price: '₹39 - ₹80' },
      { item: 'Lehenga Normal', price: '₹199' },
      { item: 'Lehenga Medium', price: '₹299' },
      { item: 'Lehenga Heavy', price: '₹399' },
      { item: 'Jump Suit', price: '₹149' },
      { item: 'Sweater / Cardigan', price: '₹99 - ₹200' },
      { item: 'Nighty', price: '₹99 (Half) / ₹160 (Full)' },
      { item: 'Stole / Scarf', price: '₹39' },
      { item: 'Shawl', price: '₹39 - ₹60' },
      { item: 'Coat', price: '₹239' },
      { item: 'Jacket', price: '₹99 - ₹200 / ₹270 (Leather)' }
    ],
    Kids: [
      { item: 'Shirt / T-Shirt / Lowers', price: '₹29' },
      { item: 'Skirt / Frock / Dress', price: '₹39' },
      { item: 'Dress Fancy', price: '₹59 - ₹119' },
      { item: 'Blazer / Coat / Kurta', price: '₹119 - ₹199' },
      { item: 'Salwar Kameez', price: '₹99 (Normal) / ₹139 (Silk)' },
      { item: 'Kids Suit Set', price: '₹199' }
    ],
    Household: [
      { item: 'Bedsheet (Single)', price: '₹59' },
      { item: 'Bedsheet (Double)', price: '₹99' },
      { item: 'Quilt (Single)', price: '₹199' },
      { item: 'Quilt (Double)', price: '₹250' },
      { item: 'Bed Cover (Single)', price: '₹79' },
      { item: 'Bed Cover (Double)', price: '₹149' },
      { item: 'Blanket (Single)', price: '₹249' },
      { item: 'Blanket (Double)', price: '₹349' },
      { item: 'King Size Blanket', price: '₹449 - ₹499' },
      { item: 'Pillow / Cushion Cover', price: '₹29' },
      { item: 'Window Curtain', price: '₹49' },
      { item: 'Door Curtain', price: '₹79 - ₹99' },
      { item: 'Carpet (per sq ft)', price: '₹29' },
      { item: 'Sofa Cover (per seat)', price: '₹29' },
      { item: 'Tablecloth', price: '₹39 - ₹99' },
      { item: 'Bath Towel', price: '₹29' },
      { item: 'Car Towel', price: '₹39' },
      { item: 'Bag', price: '₹99 - ₹299' },
      { item: 'Shoes', price: '₹119 - ₹249' },
      { item: 'White Shoes', price: '₹149' },
      { item: 'Duvet Cover', price: '₹149' }
    ],
    'Tent House': [
      { item: 'Plain Parda', price: '₹60' },
      { item: 'Net Parda', price: '₹70' },
      { item: 'Ceiling Parda', price: '₹200 - ₹300' },
      { item: 'Jhalar', price: '₹20' },
      { item: 'Table Cover', price: '₹25' },
      { item: 'Chair Cover', price: '₹11' },
      { item: 'Round Table Cover', price: '₹25' },
      { item: 'Table Cloth', price: '₹15' },
      { item: 'Napkin', price: '₹15' },
      { item: 'Bedsheet', price: '₹25' },
      { item: 'Pillow Cover', price: '₹10' },
      { item: 'Than', price: '₹60' },
      { item: 'White Towel', price: '₹20' },
      { item: 'Sofa Cover', price: '₹30' },
      { item: 'Zajim', price: '₹30' },
      { item: 'Darii', price: '₹15/kg' }
    ],
    'Hotel Linen': [
      { item: 'Bed Sheet Single', price: '₹20' },
      { item: 'Bed Sheet Double', price: '₹25' },
      { item: 'Duvet Cover Double', price: '₹30' },
      { item: 'Duvet Cover Single', price: '₹25' },
      { item: 'Mattress Protector (Single)', price: '₹45' },
      { item: 'Mattress Protector (Double)', price: '₹65' },
      { item: 'Pillow Cover', price: '₹10' },
      { item: 'Cushion Cover', price: '₹8' },
      { item: 'Hand Towel', price: '₹8' },
      { item: 'Bath Towel', price: '₹15' },
      { item: 'Bed Runner', price: '₹10' },
      { item: 'Door Mat', price: '₹15' },
      { item: 'Bathmat', price: '₹10' },
      { item: 'Curtain (Normal Washing)', price: '₹18' },
      { item: 'Window Curtain', price: '₹15' },
      { item: 'Door Curtain', price: '₹20' },
      { item: 'Blanket Single', price: '₹65' },
      { item: 'Blanket Double', price: '₹85' },
      { item: 'White Napkin', price: '₹7' },
      { item: 'Table Mat', price: '₹10' },
      { item: 'Tablecloth & Top', price: '₹10' },
      { item: 'Waist Coat (Dry Cleaning)', price: '₹55' },
      { item: 'Capt. Coat (Dry Cleaning)', price: '₹40' },
      { item: 'Apron', price: '₹40' },
      { item: 'Tie (Dry Cleaning)', price: '₹12' },
      { item: 'Saree', price: '₹100' }
    ],
    'Spa & Salon': [
      { item: 'Big Towel', price: '₹10' },
      { item: 'Small Towel', price: '₹8' },
      { item: 'Apron', price: '₹10' },
      { item: 'Single Bedsheet', price: '₹10' },
      { item: 'Pillow Cover', price: '₹8' },
      { item: 'Window Curtain', price: '₹15' }
    ]
  }

  // Brand color gradient for all cards
  const brandGradient = `from-[${colors.primary.DEFAULT}] to-[${colors.primary.light}]`
  const brandBgLight = `bg-[${colors.bg.light}]`

  const categories = [
    { 
      name: 'Men', 
      icon: '👔', 
      description: 'Shirts, Suits, Trousers & more'
    },
    { 
      name: 'Women', 
      icon: '👗', 
      description: 'Sarees, Lehengas, Kurtis & more'
    },
    { 
      name: 'Kids', 
      icon: '🧒', 
      description: 'All kids clothing'
    },
    { 
      name: 'Household', 
      icon: '🏠', 
      description: 'Bedsheets, Curtains, Carpets'
    },
    { 
      name: 'Tent House', 
      icon: '🎪', 
      description: 'Event linens & covers'
    },
    { 
      name: 'Hotel Linen', 
      icon: '🏨', 
      description: 'Complete hotel laundry'
    },
    { 
      name: 'Spa & Salon', 
      icon: '💆', 
      description: 'Towels, Aprons & more'
    }
  ]

  const openModal = (categoryName) => {
    setSelectedCategory(categoryName)
  }

  const closeModal = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1879a2] via-[#1a8ab8] to-[#24bcee] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium">Transparent Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-yellow-300">Pricing</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Premium quality dry cleaning & laundry services at affordable prices
          </p>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/30 rounded-full p-3">
                <svg className="w-8 h-8 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Flat 20% Off on 1st Order!
                </h2>
                <p className="text-gray-800 font-medium">
                  New customers get special discount on their first order
                </p>
              </div>
            </div>
            <div className="bg-gray-900 text-yellow-400 px-6 py-3 rounded-xl font-bold text-lg">
              Use Code: FIRST20
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dry Cleaning Price List
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any category to view the complete price list
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, idx) => {
              const items = pricingData[category.name] || []
              const previewItems = items.slice(0, 4)
              
              return (
                <motion.div
                  key={category.name}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openModal(category.name)}
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${brandGradient} p-5`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{category.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{category.name}</h3>
                          <p className="text-white/80 text-sm">{items.length} items</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Items */}
                  <div className="p-5">
                    <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {previewItems.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 truncate pr-2">{item.item}</span>
                          <span className="text-[#1879a2] font-semibold whitespace-nowrap">{item.price.split('/')[0]}</span>
                        </div>
                      ))}
                    </div>

                    {items.length > 4 && (
                      <p className="text-gray-400 text-xs mb-4">+{items.length - 4} more items</p>
                    )}

                    {/* View All Button */}
                    <button className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${brandGradient} group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}>
                      View All Prices
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Info Note */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-5 py-3 rounded-full text-sm border border-amber-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prices may vary based on fabric, embroidery & complexity
            </div>
          </div>
        </div>
      </section>

      {/* B2B Services Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#24bcee]/20 text-[#24bcee] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              B2B SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Special Rates for Businesses
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hotels, Spas, Salons, and Tent Houses get exclusive bulk pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Hotel Linen',
                description: 'Complete laundry solutions for hotels including bedsheets, towels, curtains & staff uniforms',
                highlight: 'Starting ₹7/piece',
                features: ['48-hour turnaround', 'Bulk discounts', 'Free pickup & delivery']
              },
              {
                title: 'Tent House',
                description: 'Event & wedding linen cleaning for tent houses and event management companies',
                highlight: 'Starting ₹10/piece',
                features: ['Same-day available', 'Volume pricing', 'Priority service']
              },
              {
                title: 'Spa & Salon',
                description: 'Fresh, hygienic linens for wellness centers, spas, and beauty salons',
                highlight: 'Starting ₹8/piece',
                features: ['Daily pickup option', 'Sanitized washing', 'Subscription plans']
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-700 hover:border-[#24bcee]/50 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-[#1879a2] to-[#24bcee] text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                  {service.highlight}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-[#24bcee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose White Basket Laundry?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🚚', title: 'Free Pickup & Delivery', desc: 'At your doorstep' },
              { icon: '⚡', title: 'Express Service', desc: 'Same day available' },
              { icon: '✨', title: 'Premium Quality', desc: 'Professional cleaning' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive rates' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#24bcee]/30 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1879a2] to-[#24bcee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Contact us for bulk orders, corporate accounts, or special requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={contactInfo.getTelUrl()}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1879a2] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: {contactInfo.display.phone}
            </a>
            <a
              href="mailto:whitebasketpvtltd@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${brandGradient} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{categories.find(c => c.name === selectedCategory)?.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedCategory}</h2>
                      <p className="text-white/80">Complete Price List</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body - Pricing Table */}
              <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(pricingData[selectedCategory] || []).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-gray-800 font-medium">{row.item}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1879a2]/10 to-[#24bcee]/10 text-[#1879a2] font-bold text-sm">
                            {row.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Prices may vary based on fabric, embroidery & complexity
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
