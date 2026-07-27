import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bgColor, textColor, borderColor, accentColor } from '../utils/classNames';
import { headingClasses, bodyTextClasses } from '../utils/fonts';

const PricingCalculator = () => {
  const [serviceType, setServiceType] = useState('laundry');
  const [quantity, setQuantity] = useState(5);
  const [deliverySpeed, setDeliverySpeed] = useState('regular');
  const navigate = useNavigate();

  // Pricing data structure
  const prices = {
    laundry: { regular: 60, express: 90, unit: 'kg' },
    'dry-clean': { regular: 150, express: 225, unit: 'pc' },
    shoes: { regular: 300, express: 450, unit: 'pair' },
    sofa: { regular: 500, express: 750, unit: 'seat' },
    carpet: { regular: 29, express: 43.5, unit: 'sq ft' }
  };

  // Calculate prices
  const calculatePrice = () => {
    const basePrice = prices[serviceType][deliverySpeed];
    const total = Math.round(basePrice * quantity);
    const discount = Math.round(total * 0.20);
    const final = total - discount;
    
    return { total, discount, final };
  };

  const { total, discount, final } = calculatePrice();

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-16 max-w-2xl mx-auto px-4"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl">
          <h2 className={`${headingClasses('h2')} text-center mb-2`}>
            Instant Price Estimate
          </h2>
          <p className={`${bodyTextClasses()} text-center ${textColor('secondary')} mb-8`}>
            Get pricing in 30 seconds
          </p>

          {/* Service Type Dropdown */}
          <div className="mb-6">
            <label className={`block ${bodyTextClasses()} font-bold mb-2`}>
              What do you need cleaned?
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:${borderColor('primary')} focus:outline-none ${bodyTextClasses()}`}
            >
              <option value="laundry">Laundry - Wash & Steam Iron</option>
              <option value="dry-clean">Dry Cleaning - Designer Wear</option>
              <option value="shoes">Shoe Cleaning</option>
              <option value="sofa">Sofa Cleaning</option>
              <option value="carpet">Carpet Cleaning</option>
            </select>
          </div>

          {/* Quantity Slider */}
          <div className="mb-6">
            <label className={`block ${bodyTextClasses()} font-bold mb-2`}>
              How many {prices[serviceType].unit}?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${accentColor('primary')}`}
              />
              <span className={`${bodyTextClasses()} font-bold text-2xl ${textColor('primary')} min-w-[60px] text-right`}>
                {quantity}
              </span>
            </div>
          </div>

          {/* Delivery Speed */}
          <div className="mb-8">
            <label className={`block ${bodyTextClasses()} font-bold mb-3`}>
              Delivery speed?
            </label>
            <div className="space-y-3">
              <label className={`flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:${borderColor('primary')} transition-colors`}>
                <input
                  type="radio"
                  name="delivery"
                  value="regular"
                  checked={deliverySpeed === 'regular'}
                  onChange={(e) => setDeliverySpeed(e.target.value)}
                  className={`mr-3 w-4 h-4 ${accentColor('primary')}`}
                />
                <div className="flex-1">
                  <span className={`${bodyTextClasses()} font-bold`}>Regular</span>
                  <span className={`${bodyTextClasses()} ${textColor('secondary')} ml-2`}>
                    FREE (48-72 hours)
                  </span>
                </div>
              </label>
              <label className={`flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:${borderColor('primary')} transition-colors`}>
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliverySpeed === 'express'}
                  onChange={(e) => setDeliverySpeed(e.target.value)}
                  className={`mr-3 w-4 h-4 ${accentColor('primary')}`}
                />
                <div className="flex-1">
                  <span className={`${bodyTextClasses()} font-bold`}>Express</span>
                  <span className={`${bodyTextClasses()} ${textColor('secondary')} ml-2`}>
                    1.5x price (Same/Next day)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Price Estimate Box */}
          <motion.div
            key={final}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={`bg-white rounded-xl p-6 border-l-4 ${borderColor('primary')} shadow-lg`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={bodyTextClasses()}>Estimated Cost:</span>
                <span className={`${bodyTextClasses()} font-bold text-xl`}>₹{total}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className={bodyTextClasses()}>💰 First order discount (20%):</span>
                <span className={`${bodyTextClasses()} font-bold`}>-₹{discount}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className={`${bodyTextClasses()} font-bold text-lg`}>YOUR PRICE:</span>
                <span className={`${headingClasses('h3')} ${textColor('primary')}`}>
                  ₹{final}
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <button
              className={`w-full ${bgColor('primary')} text-white py-4 rounded-lg ${bodyTextClasses()} font-bold text-lg hover:opacity-90 transition-opacity`}
              onClick={() => navigate('/schedule-pickup')}
            >
              Schedule Pickup Now
            </button>
            <a
              href="/pricing"
              className={`block text-center ${textColor('primary')} ${bodyTextClasses()} font-bold hover:underline`}
            >
              View Full Price List →
            </a>
          </div>
        </div>
      </motion.section>

    </>
  );
};

export default PricingCalculator;
