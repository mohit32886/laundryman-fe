import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import MetaTags from '../../components/SEO/MetaTags';
import SchemaMarkup from '../../components/SEO/SchemaMarkup';
import Breadcrumb from '../../components/Breadcrumb';
import WhatsAppBooking from '../../components/WhatsAppBooking';
import RatingBadge from '../../components/ui/RatingBadge';
import { heroGradient, bgColor, textColor, hoverBgColor } from '../../utils/classNames';
import { contactInfo } from '../../config/contact';

/**
 * LocationTemplate Component
 * Template for location-specific landing pages
 * 
 * @param {string} areaName - Name of the area (e.g., "Harmu")
 * @param {string} areaDescription - Description of the area
 * @param {Array} landmarks - Array of local landmarks
 * @param {Array} testimonials - Area-specific testimonials
 * @param {object} coordinates - Geo coordinates { lat, lng }
 */
const LocationTemplate = ({ 
  areaName, 
  areaDescription,
  landmarks = [],
  testimonials = [],
  coordinates = { lat: '23.3441', lng: '85.3096' }
}) => {
  const navigate = useNavigate();
  const [showWhatsAppBooking, setShowWhatsAppBooking] = useState(false);

  const pageTitle = `Best Laundry & Dry Cleaning Service in ${areaName}, Ranchi | Laundryman`;
  const pageDescription = `Premium laundry and dry cleaning service in ${areaName}, Ranchi. Free home pickup & delivery. German eco-friendly solutions. 20% off first order.`;
  const pageUrl = `/locations/${areaName.toLowerCase()}`;

  return (
    <>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        keywords={`laundry service ${areaName}, dry cleaning ${areaName}, laundry ${areaName} Ranchi, laundry pickup ${areaName}, laundry delivery ${areaName}`}
      />
      <SchemaMarkup
        type="localBusiness"
        pageData={{
          coordinates: {
            latitude: coordinates.lat,
            longitude: coordinates.lng
          },
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/store-locator' },
            { name: `${areaName}`, path: pageUrl }
          ],
          service: {
            name: `Laundry & Dry Cleaning Service in ${areaName}`,
            description: pageDescription
          }
        }}
      />
      <Breadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/store-locator' },
          { name: `${areaName}`, path: pageUrl }
        ]}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className={`${heroGradient()} text-white py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best Laundry & Dry Cleaning Service in <span className="text-yellow-300">{areaName}</span>, Ranchi
              </h1>
              <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
                {areaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.button
                  onClick={() => setShowWhatsAppBooking(true)}
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-haspopup="dialog"
                  aria-expanded={showWhatsAppBooking}
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  💬 Quick Quote on WhatsApp
                </motion.button>
                <motion.button
                  onClick={() => navigate('/schedule-pickup')}
                  className={`bg-white ${textColor('primary')} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚚 Free Pickup in {areaName} Today
                </motion.button>
              </div>
              <RatingBadge theme="light" rating={4.9} count={2400} />
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Laundryman in {areaName}?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🚚',
                  title: 'Free Home Pickup & Delivery',
                  description: `We provide free pickup and delivery service in ${areaName} and surrounding areas. No hidden charges.`
                },
                {
                  icon: '🌿',
                  title: 'German Eco-Friendly Solutions',
                  description: 'World-renowned Lagoon technology with eco-friendly cleaning solutions that are safe for your family.'
                },
                {
                  icon: '⭐',
                  title: 'Premium Quality Service',
                  description: '7 years of excellence with 4.9/5 rating from 2400+ satisfied customers in Ranchi.'
                },
                {
                  icon: '⏰',
                  title: 'On-Time Delivery',
                  description: 'Regular delivery: Laundry (48hrs), Dry Cleaning (72hrs). Express delivery also available.'
                },
                {
                  icon: '💰',
                  title: '20% Off First Order',
                  description: 'New customers get flat 20% discount on their first order. Transparent pricing, no hidden costs.'
                },
                {
                  icon: '🏆',
                  title: 'Expert Care',
                  description: '6-stage process with specialized machinery and skilled experts for unmatched garment care.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Landmarks Section */}
        {landmarks.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Serving {areaName} & Nearby Areas
                </h2>
                <p className="text-lg text-gray-600">
                  We provide laundry and dry cleaning services to residents and businesses near these landmarks
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {landmarks.map((landmark, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className={`${bgColor('primary')} text-white w-10 h-10 rounded-full flex items-center justify-center mr-3`}>
                        📍
                      </div>
                      <span className="font-medium">{landmark}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Area-Specific Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our {areaName} Customers Say
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                    <div className="flex items-center">
                      <div className={`${bgColor('primary')} text-white w-12 h-12 rounded-full flex items-center justify-center mr-3`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={`${bgColor('primary')} text-white py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Premium Laundry Service in {areaName}?
              </h2>
              <p className="text-xl mb-8">
                Schedule your free pickup today and get 20% off on your first order!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/schedule-pickup')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Laundryman
                </motion.button>
                <motion.a
                  href={contactInfo.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {showWhatsAppBooking && (
        <WhatsAppBooking
          isOpen={showWhatsAppBooking}
          onClose={() => setShowWhatsAppBooking(false)}
        />
      )}
    </>
  );
};

export default LocationTemplate;
