import { useState } from 'react';
import { motion } from 'framer-motion';
import { headingClasses, bodyTextClasses } from '../utils/fonts';
import { bgColor, textColor } from '../utils/classNames';
import { colors } from '../config/colors';
import MetaTags from '../components/SEO/MetaTags';
import SchemaMarkup from '../components/SEO/SchemaMarkup';
import { contactInfo } from '../config/contact';

const Pricing = () => {
  const [expandedCategory, setExpandedCategory] = useState('men');

  const pricingData = {
    men: [
      { item: 'Shirt', regular: 39, silk: 69 },
      { item: 'White Shirt', regular: 49 },
      { item: 'T-Shirt', regular: 39 },
      { item: 'Trouser / Jeans', regular: 45 },
      { item: 'Kurta', regular: 59, silk: 109 },
      { item: 'Blazer / Coat', regular: 239 },
      { item: 'Sherwani', regular: 299 },
      { item: 'Suit 2pc', regular: 339 },
    ],
    women: [
      { item: 'Kurti / Kameez', regular: 59, silk: 100 },
      { item: 'Saree', regular: 179 },
      { item: 'Saree (Work)', regular: 249 },
      { item: 'Lehenga Heavy', regular: 399 },
      { item: 'Trouser / Leggings', regular: 49 },
    ],
    kids: [
      { item: 'Shirt / T-Shirt', regular: 29 },
      { item: 'Skirt / Frock', regular: 39 },
      { item: 'Dress Fancy', regular: 59 },
    ],
    household: [
      { item: 'Bedsheet (Single)', regular: 59 },
      { item: 'Bedsheet (Double)', regular: 99 },
      { item: 'Blanket (Single)', regular: 249 },
      { item: 'Blanket (Double)', regular: 349 },
      { item: 'Carpet (per sq ft)', regular: 29 },
    ],
    b2b: [
      { item: 'Hotel Linen', regular: 'Starting ₹20/pc' },
      { item: 'Tent House', regular: 'Starting ₹10/pc' },
      { item: 'Spa & Salon', regular: 'Starting ₹8/pc' },
    ]
  };

  const calculateDiscount = (price) => {
    if (typeof price === 'number') {
      return Math.round(price * 0.8); // 20% off
    }
    return price;
  };

  return (
    <>
      <MetaTags
        title="Laundryman Pricing - Transparent Rates for All Services | Ranchi"
        description="Transparent pricing for laundry, dry cleaning, shoe cleaning, and B2B services in Ranchi. Get 20% off on your first order. No hidden charges."
        url="/pricing"
        keywords="laundry prices Ranchi, dry cleaning cost Ranchi, laundry service rates Ranchi, affordable laundry Ranchi"
      />
      <SchemaMarkup
        type="localBusiness"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' }
          ]
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`${bgColor('primary')} text-white py-20`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className={headingClasses('h1')}>Our Pricing</h1>
          <p className={`${bodyTextClasses('lg')} mt-4 opacity-90`}>
            Premium quality dry cleaning & laundry services at affordable prices
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 mt-6">
            <span className={`${bodyTextClasses()} font-bold`}>✓ Transparent Pricing</span>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 shadow-lg"
      >
        <div className="container mx-auto px-4 text-center">
          <p className={`${bodyTextClasses()} font-bold`}>
            🎉 Flat 20% Off on 1st Order! Use Code: <span className="text-yellow-300">FIRST20</span>
          </p>
        </div>
      </motion.div>

      {/* Pricing Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {Object.keys(pricingData).map((category) => (
            <div
              key={category}
              className="border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className={`w-full flex items-center justify-between p-6 ${bgColor('bgLight')} hover:bg-gray-100 transition-colors`}
              >
                <h3 className={headingClasses('h3')}>
                  {category === 'b2b' ? 'B2B' : category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <span className="text-2xl">
                  {expandedCategory === category ? '−' : '+'}
                </span>
              </button>
              
              {expandedCategory === category && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="bg-white"
                >
                  <div className="p-6 space-y-3">
                    {pricingData[category].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <span className={bodyTextClasses()}>{item.item}</span>
                        <div className="flex items-center gap-3">
                          {typeof item.regular === 'number' && (
                            <>
                              <span className={`${bodyTextClasses()} line-through text-gray-400`}>
                                ₹{item.regular}
                              </span>
                              <span className={`${bodyTextClasses()} font-bold text-green-600`}>
                                ₹{calculateDiscount(item.regular)}
                              </span>
                            </>
                          )}
                          {typeof item.regular === 'string' && (
                            <span className={`${bodyTextClasses()} font-bold`}>{item.regular}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <p className={`${bodyTextClasses()} ${textColor('secondary')} text-center mt-8`}>
          * Prices may vary based on fabric, embroidery & complexity
        </p>
      </section>

      {/* CTA Section */}
      <section className={`${bgColor('primary')} text-white py-16`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={headingClasses('h2')}>Need a Custom Quote?</h2>
          <p className={`${bodyTextClasses('lg')} mt-4 mb-8`}>
            Contact us for bulk orders, corporate accounts, or special requirements
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={contactInfo.getTelUrl()}
              className={`bg-white ${textColor('primary')} px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors`}
            >
              📞 Call: {contactInfo.display.phone}
            </a>
            <a
              href={contactInfo.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Pricing;
