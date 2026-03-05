import { useState, useEffect } from 'react';
import { getProductPrices } from '../services/productService';
import { motion } from 'framer-motion';
import { headingClasses, bodyTextClasses } from '../utils/fonts';
import { bgColor, textColor } from '../utils/classNames';
import { colors } from '../config/colors';
import MetaTags from '../components/SEO/MetaTags';
import SchemaMarkup from '../components/SEO/SchemaMarkup';
import { contactInfo } from '../config/contact';

const Pricing = () => {
  const [expandedCategory, setExpandedCategory] = useState('men');
  const [priceMap, setPriceMap] = useState(null);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    getProductPrices()
      .then(setPriceMap)
      .catch(() => setPriceError(true));
  }, []);

  const pricingData = {
    men: [
      { item: 'Shirt', productId: 'shirt' },
      { item: 'White Shirt', productId: 'shirt' },
      { item: 'T-Shirt', productId: 'shirt' },
      { item: 'Trouser / Jeans', productId: 'jeans' },
      { item: 'Kurta', productId: 'kurta' },
      { item: 'Blazer / Coat', productId: 'blazer_coat' },
      { item: 'Sherwani', productId: 'sherwani' },
      { item: 'Suit 2pc', productId: 'suit_pc' },
    ],
    women: [
      { item: 'Kurti / Kameez', productId: 'kurti' },
      { item: 'Saree', productId: 'saree' },
      { item: 'Saree (Work)', productId: 'saree' },
      { item: 'Lehenga Heavy', productId: 'lehenga' },
      { item: 'Trouser / Leggings', productId: 'pant' },
    ],
    kids: [
      { item: 'Shirt / T-Shirt', productId: 'shirt' },
      { item: 'Skirt / Frock', productId: 'frock_dress' },
      { item: 'Dress Fancy', productId: 'dress_fancy' },
    ],
    household: [
      { item: 'Bedsheet (Single)', productId: 'bedsheet' },
      { item: 'Bedsheet (Double)', productId: 'bed_cover' },
      { item: 'Blanket (Single)', productId: 'blanket' },
      { item: 'Blanket (Double)', productId: 'blanket' },
      { item: 'Carpet (per sq ft)', productId: 'carpet_per_sqft' },
    ],
    b2b: [
      { item: 'Hotel Linen', price: 'Starting ₹20/pc' },
      { item: 'Tent House', price: 'Starting ₹10/pc' },
      { item: 'Spa & Salon', price: 'Starting ₹8/pc' },
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
        {priceError && (
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className={`${bodyTextClasses()} text-red-600 font-semibold`}>Unable to load pricing at this time.</p>
            <p className={`${bodyTextClasses()} text-red-500 mt-1`}>Please try again later or contact us for current rates.</p>
          </div>
        )}
        {!priceError && (
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
                          {item.price ? (
                            <span className={`${bodyTextClasses()} font-bold`}>{item.price}</span>
                          ) : priceMap === null ? (
                            <span className={`${bodyTextClasses()} text-gray-400`}>Loading...</span>
                          ) : (
                            <>
                              <span className={`${bodyTextClasses()} line-through text-gray-400`}>
                                ₹{priceMap[item.productId]}
                              </span>
                              <span className={`${bodyTextClasses()} font-bold text-green-600`}>
                                ₹{calculateDiscount(priceMap[item.productId])}
                              </span>
                            </>
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
        )}

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
