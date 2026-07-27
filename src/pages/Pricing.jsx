import { useState, useEffect } from 'react';
import { getProductPrices } from '../services/productService';
import { motion } from 'framer-motion';
import { headingClasses, bodyTextClasses } from '../utils/fonts';
import { bgColor, textColor } from '../utils/classNames';
import { colors } from '../config/colors';
import MetaTags from '../components/SEO/MetaTags';
import SchemaMarkup from '../components/SEO/SchemaMarkup';
import AddToCartButton from '../components/AddToCartButton';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSubscriptionCoverage } from '../hooks/useSubscriptionCoverage';
import { contactInfo } from '../config/contact';

const Pricing = () => {
  const [expandedCategory, setExpandedCategory] = useState('men');
  const [priceMap, setPriceMap] = useState(null);
  const [priceError, setPriceError] = useState(false);
  const { itemCount, cart } = useCart();
  const coverage = useSubscriptionCoverage();
  const formatRupees = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

  useEffect(() => {
    getProductPrices()
      .then(setPriceMap)
      .catch(() => setPriceError(true));
  }, []);

  const pricingData = {
    men: [
      { item: 'Shirt', productId: 'shirt' },
      { item: 'White Shirt', productId: 'white_shirt' },
      { item: 'T-Shirt', productId: 'tshirt' },
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
      <section className="relative overflow-hidden theme-hero-bg text-white py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🏷️ Transparent Dry Cleaning & Laundry Rates
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Transparent <span className="theme-title-gradient">PRICING</span></h1>
          <p className="text-lg md:text-xl text-slate-300 opacity-90 max-w-2xl mx-auto font-light">
            Premium Lagoon® Eco-Friendly Dry Cleaning & Laundry rates with zero hidden charges
          </p>
          <div className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 rounded-full px-6 py-2.5 mt-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-sm font-semibold text-cyan-200">✓ Free Home Pickup & Delivery Across Ranchi</span>
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
        {coverage.hasActive && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-4xl mx-auto mb-6 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 ${bgColor('bgLighter')}`}
            style={{ border: `2px solid ${colors.primary.DEFAULT}` }}
          >
            <div>
              <p className={`${bodyTextClasses()} font-semibold`}>
                ✨ You're on the <span style={{ color: colors.primary.DEFAULT }}>{coverage.planName}</span> plan
              </p>
              <p className={`${bodyTextClasses()} text-sm text-gray-600 mt-0.5`}>
                {coverage.totalRemaining > 0
                  ? `${coverage.totalRemaining} item${coverage.totalRemaining === 1 ? '' : 's'} still covered this cycle.`
                  : 'Quota fully used for this cycle. Next refill on your billing date.'}
              </p>
            </div>
            <Link
              to="/subscriptions/manage"
              className={`${bodyTextClasses()} font-bold`}
              style={{ color: colors.primary.DEFAULT }}
            >
              Manage plan →
            </Link>
          </motion.div>
        )}
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <Link
              to="/cart"
              className={`flex items-center justify-between gap-3 rounded-xl border-2 ${bgColor('bgLighter')} px-5 py-3 hover:shadow-md transition-shadow`}
              style={{ borderColor: colors.primary.DEFAULT }}
            >
              <span className={`${bodyTextClasses()} font-semibold`}>
                🛒 {itemCount} item{itemCount === 1 ? '' : 's'} in cart · {formatRupees(cart.subtotal)}
              </span>
              <span className={`${textColor('primary')} font-bold`}>View cart →</span>
            </Link>
          </motion.div>
        )}
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
              className="glass-card rounded-2xl border border-white/60 shadow-xl overflow-hidden mb-4 hover:shadow-2xl transition-all"
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="w-full flex items-center justify-between p-6 bg-white/70 hover:bg-cyan-500/10 transition-colors"
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
                    {pricingData[category].map((item, idx) => {
                      const hasProduct = Boolean(item.productId) && priceMap && priceMap[item.productId] != null;
                      const availableCount = hasProduct
                        ? (coverage.availableByProduct.get(item.productId) || 0)
                        : 0;
                      const planCoversProduct = coverage.hasActive
                        && coverage.subscriptionId
                        && item.productId
                        && (coverage.availableByProduct.has(item.productId)
                            || (cart.items || []).some((i) => i.productId === item.productId));
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <span className={bodyTextClasses()}>{item.item}</span>
                            {planCoversProduct && (
                              <span
                                className={`ml-2 inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${bgColor('bgLighter')}`}
                                style={{ color: colors.primary.DEFAULT, border: `1px solid ${colors.primary.DEFAULT}` }}
                              >
                                {availableCount > 0
                                  ? `${availableCount} free with ${coverage.planName}`
                                  : 'Quota used'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
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
                            {hasProduct && (
                              <AddToCartButton
                                productId={item.productId}
                                description={item.item}
                                price={calculateDiscount(priceMap[item.productId])}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
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
      <section className="bg-slate-900 border-t border-b border-slate-800/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">Need a Custom Quote?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto font-light">
            Contact us for bulk orders, corporate accounts, or special requirements
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={contactInfo.getTelUrl()}
              className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
            >
              📞 Call: {contactInfo.display.phone}
            </a>
            <a
              href={contactInfo.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
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
