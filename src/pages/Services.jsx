import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroGradient, textColor } from '../utils/classNames'
import { colors } from '../config/colors'
import PickupModal from '../components/PickupModal'
import MetaTags from '../components/SEO/MetaTags'
import SchemaMarkup from '../components/SEO/SchemaMarkup'
import Breadcrumb from '../components/Breadcrumb'
import { contactInfo } from '../config/contact'

export default function Services() {
  const location = useLocation()
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false)

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
        keywords="laundry service Ranchi, dry cleaning Ranchi, shoe cleaning Ranchi, sofa cleaning Ranchi, wash and fold Ranchi"
      />
      <SchemaMarkup
        type="service"
        pageData={{
          service: {
            name: 'Laundry & Dry Cleaning Services',
            description: 'Comprehensive laundry and dry cleaning services including wash & fold, dry cleaning, shoe cleaning, and sofa cleaning'
          },
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }
          ]
        }}
      />
      <Breadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' }
        ]}
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
          
          {/* Laundry Service */}
          <motion.div 
            id="laundry" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h2 className={`text-3xl font-bold mb-4 ${textColor('primary')}`}>Laundry Service</h2>
                  <p className="text-gray-700 mb-6">Professional laundry service with wash & fold or wash & steam iron options.</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Wash & Fold</h3>
                      <p className="text-gray-600">Your clothes washed, dried, and neatly folded</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Wash & Steam Iron</h3>
                      <p className="text-gray-600">Professional washing with steam ironing for crisp finish</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto flex items-center justify-center bg-gradient-to-br from-[#e6f4f8] to-white p-8">
                  <svg className="w-full h-full max-w-md" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 64c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zM80 256c0-61.9 50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112s-112-50.1-112-112zm112 48c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z" fill={colors.primary.DEFAULT}/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

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
                <div className="relative h-64 md:h-auto order-2 md:order-1 flex items-center justify-center bg-gradient-to-br from-[#e6f4f8] to-white p-8">
                  <svg className="w-full h-full max-w-md" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80c.2 0 .5 0 .7 0C309.2 107.8 303 138.1 303 170c0 90.7 60.5 167.3 143.8 191.8c-8.2 8.8-12.4 20.4-12.4 32.9c0 26.5 21.5 48 48 48h118.8c26.5 0 48-21.5 48-48c0-12.5-4.2-24.1-12.4-32.9C505.5 337.3 566 260.7 566 170c0-31.9-6.2-62.2-17.7-90c.2 0 .5 0 .7 0c42.9 0 79.2-28.1 91.5-66.8c2.4-7.5 8.9-13.2 16.7-13.2h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-35.3c-8.7 24.5-31.1 44-57.8 48.1C508.5 152.8 503 171.1 503 190c0 66.2-54.2 120-120.8 120c-25.7 0-49.9-8.2-70.1-22.8c-10.1 4.5-20.8 7.2-32.1 7.2c-14.3 0-27.7-4.1-39.1-11.2c-10.3 6.5-22.1 10.4-34.8 10.4c-30.5 0-55.7-22.5-59.4-51.8C89.8 292.4 96 282.1 96 270c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 21.6 11.5 40.4 28.6 50.7c-4.5 13.3-6.9 27.5-6.9 42.3c0 88.4 71.6 160 160 160s160-71.6 160-160c0-88.4-71.6-160-160-160c-9.8 0-19.3 1.1-28.5 3.1C128.7 28.1 166.2 0 211.8 0zM64 288c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zm0 128c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zm352 0c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z" fill="#1879a2"/>
                  </svg>
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
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Shoe Cleaning Service</h2>
                  <p className="text-gray-700 mb-6">Our 7 Step Process For Spotless Shining Shoes!</p>
                  <div className="mb-6 flex items-center justify-center bg-gradient-to-br from-[#e6f4f8] to-white p-8 rounded-lg">
                    <svg className="w-full h-64 max-w-md" viewBox="0 0 640 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M53.6 9.4C58.5 3.4 65.5 0 72.8 0H184c22.1 0 40 17.9 40 40v32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H264V40c0-22.1 17.9-40 40-40H416c22.1 0 40 17.9 40 40v32H448c-17.7 0-32 14.3-32 32s14.3 32 32 32h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H544V40c0-22.1 17.9-40 40-40h111.2c7.3 0 14.3 3.4 19.2 9.4l28.7 35.8c3.4 4.2 5.2 9.5 5.2 15V496c0 8.8-7.2 16-16 16H608c-8.8 0-16-7.2-16-16V448H64v48c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V60.2c0-5.5 1.8-10.8 5.2-15L33.6 9.4zM64 128H576V384H64V128z" fill="#1879a2"/>
                    </svg>
                  </div>
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
                    <div className="bg-[#1879a2] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold">
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
                  <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Carpet Dry Cleaning</h2>
                  <p className="text-gray-700 mb-6">An intense, deep-cleaning of carpets to restore their original glory. We specialize in dry cleaning of Persian rugs, silk & Turkish carpets, and all other premium, imported rugs.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>100% carpet fabric color & luster preserved</li>
                <li>Eco-friendly, pet and child-safe detergents</li>
                <li>Anti germ treatment & deodorization</li>
                <li>Mold damage reversal</li>
                <li>Complimentary border pasting</li>
              </ul>
                </div>
                <div className="relative h-64 md:h-auto flex items-center justify-center bg-gradient-to-br from-[#e6f4f8] to-white p-8">
                  <svg className="w-full h-full max-w-md" viewBox="0 0 576 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm128 80v96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zm32 32H416v32H160V240z" fill="#1879a2"/>
                  </svg>
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
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Curtain Dry Cleaning</h2>
              <p className="text-gray-700 mb-6">Premium curtain dry cleaning service with facility to remove the curtains from rods and install them back after dry cleaning.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Processing as per curtain fabric type (silk, velvet, blackout etc)</li>
                <li>Zero shrinkage guaranteed with our Italian technology</li>
                <li>99% stain removal promise</li>
                <li>100% shine & lustre maintained with our German organic chemicals</li>
                <li>Crisp, wrinkle free steam iron</li>
                <li>Complimentary curtain ring replacement</li>
              </ul>
            </div>
          </motion.div>

          {/* Steam Ironing Service */}
          <motion.div 
            id="steam-ironing" 
            className="mb-16 scroll-mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Steam Ironing Service</h2>
              <p className="text-gray-700 mb-6">Professional steam ironing service for crisp, wrinkle-free finish on all your garments.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Professional steam ironing for all fabric types</li>
                <li>Unique steam ironing equipment for each garment type</li>
                <li>Crisp, wrinkle-free finish</li>
                <li>Available as standalone service or with laundry</li>
                <li>Maintains fabric quality and texture</li>
              </ul>
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
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Leather Dry Cleaning</h2>
              <p className="text-gray-700 mb-6">Professional leather dry cleaning for jackets, bags, purses, clutches, wallets, belts, shoes, boots and stilettos.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Protect your leather items from dirt, dust, oil stains, perspiration, dehydration, mold & mildew</li>
                <li>Expert leather care technicians inspect each item with utmost care</li>
                <li>Assessment of color, shade, and type of leather for appropriate treatment</li>
                <li>Complimentary conditioning and polishing to ensure smooth & shining finish</li>
              </ul>
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
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Woolens Dry Cleaning</h2>
              <p className="text-gray-700 mb-6">Our Woolmark approved Lagoon system is the world's most advanced and eco-friendly technology for dry cleaning woolen garments – sweaters, coats, furs, shawls, pashmina, and jackets.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Your woolen garments will be delivered stain free</li>
                <li>Retain their original texture, smoothness, fluffiness, shape & size</li>
                <li>Advanced systems and processes ensure zero shrinkage</li>
                <li>For expensive and delicate woolens like furs & pashmina, we use special eco-friendly chemicals from Germany</li>
                <li>Form a protective covering around wool fiber to maintain its shine & lustre</li>
              </ul>
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
                <div className="relative h-64 md:h-auto order-2 md:order-1 flex items-center justify-center bg-gradient-to-br from-[#e6f4f8] to-white p-8">
                  <svg className="w-full h-full max-w-md" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M310.6 6.2c-11.4-8.3-27.8-8.3-39.2 0L166.4 112.2c-11.4 8.3-17.2 21.5-14.6 34.6l51.7 193.2c2.5 9.2 8.9 16.8 17.1 21.4l148.6 82.1c8.2 4.5 17.9 4.5 26.1 0l148.6-82.1c8.2-4.6 14.6-12.2 17.1-21.4l51.7-193.2c2.6-13.1-3.2-26.3-14.6-34.6L310.6 6.2zM256 74.3L388.6 175.7 361.3 292.4 256 348.7l-105.3-56.3L123.4 175.7 256 74.3z" fill="#1879a2"/>
                  </svg>
                </div>
                <div className="p-8 order-1 md:order-2">
                  <h2 className="text-3xl font-bold mb-4 text-[#1879a2]">Haute Couture Dry Cleaning</h2>
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
      <section className="py-16 bg-[#1879a2] text-white">
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
              onClick={() => setIsPickupModalOpen(true)}
              className="bg-white text-[#1879a2] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
            >
              Book Laundryman
            </button>
          </div>
        </div>
      </section>

      {/* Pickup Modal */}
      <PickupModal 
        isOpen={isPickupModalOpen} 
        onClose={() => setIsPickupModalOpen(false)} 
      />
    </div>
    </>
  )
}

