import { useState } from 'react';
import { motion } from 'framer-motion';
import { headingClasses, bodyTextClasses } from '../utils/fonts';
import { textColor, bgColor } from '../utils/classNames';
import Button from './ui/Button';

const galleryItems = [
  {
    id: 1,
    category: 'Stain Removal',
    before: '/placeholder-stain-before.jpg',
    after: '/placeholder-stain-after.jpg',
    description: 'Blood stain completely removed from white shirt'
  },
  {
    id: 2,
    category: 'White Clothes',
    before: '/placeholder-white-before.jpg',
    after: '/placeholder-white-after.jpg',
    description: 'Yellowed white shirt restored to original brightness'
  },
  {
    id: 3,
    category: 'Designer Wear',
    before: '/placeholder-designer-before.jpg',
    after: '/placeholder-designer-after.jpg',
    description: 'Silk saree with makeup stains - expertly cleaned'
  },
  {
    id: 4,
    category: 'Shoes',
    before: '/placeholder-shoes-before.jpg',
    after: '/placeholder-shoes-after.jpg',
    description: 'White sneakers restored to showroom condition'
  },
  {
    id: 5,
    category: 'Carpet',
    before: '/placeholder-carpet-before.jpg',
    after: '/placeholder-carpet-after.jpg',
    description: 'Persian rug deep cleaned and restored'
  },
  {
    id: 6,
    category: 'Sofa',
    before: '/placeholder-sofa-before.jpg',
    after: '/placeholder-sofa-after.jpg',
    description: 'Sofa upholstery stain removal and deep cleaning'
  }
];

const BeforeAfterSlider = ({ before, after, description }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging && e.type !== 'click') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group">
      <div
        className="relative w-full h-full cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onClick={handleMove}
      >
        {/* After Image */}
        <div className="absolute inset-0">
          <img
            src={after}
            alt="After cleaning"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600/24bcee/ffffff?text=AFTER';
            }}
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            AFTER
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={before}
            alt="Before cleaning"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600/dc2626/ffffff?text=BEFORE';
            }}
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            BEFORE
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className={`${bodyTextClasses()} text-white text-sm`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const BeforeAfterGallery = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={headingClasses('h2')}>See The Laundryman Difference</h2>
          <p className={`${bodyTextClasses('lg')} text-gray-600 mt-2`}>
            Real results from our premium cleaning process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.id * 0.1 }}
            >
              <div className="mb-3">
                <span className={`inline-block ${bgColor('primaryLight')} ${textColor('primary')} px-3 py-1 rounded-full text-sm font-semibold`}>
                  {item.category}
                </span>
              </div>
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                description={item.description}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className={`${bodyTextClasses('lg')} mb-6`}>
            Want results like these? Book your pickup now
          </p>
          <Button 
            variant="primary" 
            size="large"
            onClick={() => {
              // Scroll to top and trigger pickup modal
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Dispatch custom event that Home.jsx can listen to
              window.dispatchEvent(new CustomEvent('openPickupModal'));
            }}
          >
            Schedule Free Pickup →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
