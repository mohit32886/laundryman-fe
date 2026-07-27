import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroGradient, bgColor, textColor, hoverBgColor } from '../utils/classNames'
import MetaTags from '../components/SEO/MetaTags'
import SchemaMarkup from '../components/SEO/SchemaMarkup'
import { contactInfo } from '../config/contact'

export default function Services() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <MetaTags
        title="Our Services - Laundry, Dry Cleaning, Shoes | Laundryman Ranchi"
        description="Comprehensive laundry and dry cleaning services in Ranchi. Laundry, dry cleaning, shoe cleaning, sofa cleaning, and B2B services. Free home pickup & delivery."
        url="/services"
        keywords="laundry service Ranchi, dry cleaning Ranchi, shoe cleaning Ranchi, sofa cleaning Ranchi"
      />
      <SchemaMarkup
        type="service"
        pageData={{
          service: {
            name: 'Laundry & Dry Cleaning Services',
            description: 'Comprehensive laundry and dry cleaning services including wash & steam iron, dry cleaning, shoe cleaning, and sofa cleaning'
          },
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }
          ]
        }}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className={`${heroGradient()} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Services</h1>
          <p className="text-xl">One-stop shop for all your cleaning needs</p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dry Cleaning Service */}
          <motion.div 
            id="dry-cleaning" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto order-2 md:order-1">
                  <img
                    src="/services/dry-cleaning.jpg"
                    alt="Dry Cleaning Service"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="p-8 order-1 md:order-2">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Dry Cleaning Service</h2>
                  <p className="text-gray-700 mb-6">Best dry cleaning service for designer wear, heavy ethnic wear & woollens using world's latest Lagoon technology.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Haute couture and designer wear</li>
                    <li>Bridal wear and heavy ethnic wear</li>
                    <li>Silk sarees (Banarasi, Kanjivaram, and more)</li>
                    <li>Woolens and suits</li>
                    <li>Delicate fabrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Shoe Cleaning Service */}
          <motion.div 
            id="shoe-cleaning" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Shoe Cleaning Service</h2>
                    <p className="text-gray-700 mb-6">Our 7 Step Process For Spotless Shining Shoes!</p>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { step: '1', title: 'Inspection', desc: 'Shoe material analyzed to decide the cleaning methodology.' },
                      { step: '2', title: 'Dismantling', desc: 'The laces, sole, and other removable parts are separated.' },
                      { step: '3', title: 'Deep Cleaning & Stain Removal', desc: 'Any spots or stains are removed with German organic chemicals.' },
                      { step: '4', title: 'Deodorize', desc: 'All the bacteria, viruses and bad odor is eliminated.' },
                      { step: '5', title: 'Drying', desc: 'Shoes are Air Dried, Blow Dried, or Sun Dried depending on the skin type.' },
                      { step: '6', title: 'Shoe Nourishment', desc: 'Shoe skin is nourished & enriched with our unique natural oil based polish.' },
                      { step: '7', title: 'Assembly', desc: 'Once polish is dried, our experts reassemble all shoe parts and pack them.' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className={`${bgColor('primary')} text-white w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold`}>
                          {item.step}
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Restoration Services Available:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <span className="text-gray-700">• Sole pasting</span>
                      <span className="text-gray-700">• Inner sole replacement</span>
                      <span className="text-gray-700">• Damaged collar replacement</span>
                      <span className="text-gray-700">• Inner lining replacement</span>
                      <span className="text-gray-700">• Heel replacement</span>
                      <span className="text-gray-700">• Sole replacement</span>
                      <span className="text-gray-700">• Re coloring</span>
                      <span className="text-gray-700">• Laces replacement</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/services/shoe-cleaning.jpg"
                    alt="Shoe Cleaning Service"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carpet Cleaning */}
          <motion.div 
            id="carpet" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Carpet Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">An intense, deep-cleaning of carpets to restore their original glory. We specialize in dry cleaning of Persian rugs, silk & Turkish carpets, and all other premium, imported rugs.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>100% carpet fabric color & luster preserved</li>
                    <li>Eco-friendly, pet and child-safe detergents</li>
                    <li>Anti germ treatment & deodorization</li>
                    <li>Mold damage reversal</li>
                    <li>Complimentary border pasting</li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/services/carpet-cleaning.jpg"
                    alt="Carpet Dry Cleaning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Curtain Cleaning */}
          <motion.div 
            id="curtain" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto order-2 md:order-1">
                  <img
                    src="/services/curtain-cleaning.jpg"
                    alt="Curtain Dry Cleaning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="p-8 order-1 md:order-2">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Curtain Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">Premium curtain dry cleaning service with facility to remove the curtains from rods and install them back after dry cleaning.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Processing as per curtain fabric type (silk, velvet, blackout etc)</li>
                    <li>Zero shrinkage guaranteed with our Italian technology</li>
                    <li>99% stain removal promise</li>
                    <li>100% shine & lustre maintained with our German organic chemicals</li>
                    <li>Crisp, wrinkle free finish</li>
                    <li>Complimentary curtain ring replacement</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leather Cleaning */}
          <motion.div 
            id="leather" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Leather Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">Professional leather dry cleaning for jackets, bags, purses, clutches, wallets, belts, shoes, boots and stilettos.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Protect your leather items from dirt, dust, oil stains, perspiration, dehydration, mold & mildew</li>
                    <li>Expert leather care technicians inspect each item with utmost care</li>
                    <li>Assessment of color, shade, and type of leather for appropriate treatment</li>
                    <li>Complimentary conditioning and polishing to ensure smooth & shining finish</li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/services/leather-cleaning.jpg"
                    alt="Leather Dry Cleaning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Woolens Dry Cleaning */}
          <motion.div 
            id="woolens" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto order-2 md:order-1">
                  <img
                    src="/services/woolens-cleaning.jpg"
                    alt="Woolens Dry Cleaning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="p-8 order-1 md:order-2">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Woolens Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">Our Woolmark approved Lagoon system is the world's most advanced and eco-friendly technology for dry cleaning woolen garments – sweaters, coats, furs, shawls, pashmina, and jackets.</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Your woolen garments will be delivered stain free</li>
                    <li>Retain their original texture, smoothness, fluffiness, shape & size</li>
                    <li>Advanced systems and processes ensure zero shrinkage</li>
                    <li>For expensive and delicate woolens like furs & pashmina, we use special eco-friendly chemicals from Germany</li>
                    <li>Form a protective covering around wool fiber to maintain its shine & lustre</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Haute Couture Dry Cleaning */}
          <motion.div 
            id="haute-couture" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto order-2 md:order-1">
                  <img
                    src="/services/haute-couture.jpg"
                    alt="Haute Couture Dry Cleaning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="p-8 order-1 md:order-2">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Haute Couture Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">Want to restore the glory of your haute couture? Look no further than Laundryman!</p>
                  <p className="text-gray-700 mb-4">We have a separate team of processing experts who handle your most expensive silk, bridal & designer wear for dry cleaning. Each Haute Couture article is given a customized treatment in our state of the art dry cleaning facility.</p>
                  <p className="text-gray-700 mb-4">Our team has more than a decade experience of dry cleaning most delicate and expensive silk sarees, including:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <span className="text-gray-700">• Banarasi silk</span>
                    <span className="text-gray-700">• Kanjivaram/Kanchipuram silk</span>
                    <span className="text-gray-700">• Baluchari silk</span>
                    <span className="text-gray-700">• Bomkai silk</span>
                    <span className="text-gray-700">• Tussar silk</span>
                    <span className="text-gray-700">• Chanderi silk</span>
                    <span className="text-gray-700">• Dharmavaram silk</span>
                    <span className="text-gray-700">• Banglori silk</span>
                    <span className="text-gray-700">• Mysore silk</span>
                    <span className="text-gray-700">• Patola silk</span>
                  </div>
                  <p className="text-gray-700">Be it Manish Malhotra, Tarun Tahiliani, Masaba Gupta, or Sabyasachi Mukherjee – we have got tons of experience dry cleaning fashion articles from most popular designer houses.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white py-16 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Experience Our Services?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open(contactInfo.getWhatsAppUrl(), '_blank')}
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat On WhatsApp
            </button>
            <button 
              onClick={() => navigate('/schedule-pickup')}
              className={`bg-white ${textColor('primary')} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold`}
            >
              Book Laundryman
            </button>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}
