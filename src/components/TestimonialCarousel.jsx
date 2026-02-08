import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { headingClasses, bodyTextClasses, fontWeightClass } from '../utils/fonts';
import { textColor, bgColor } from '../utils/classNames';

const testimonials = [
  {
    id: 1,
    name: 'Santosh Gupta',
    role: 'Senior Lecturer',
    location: 'Lalgutwa, Ranchi',
    service: 'Laundry & Dry Cleaning',
    tenure: '2 years',
    rating: 5,
    text: 'I am satisfied with the quality and timelines of service.',
  },
  {
    id: 2,
    name: 'Ashish Chawla',
    role: 'Designer',
    location: 'Doranda, Ranchi',
    service: 'Dry Cleaning',
    tenure: '1 year',
    rating: 5,
    text: 'I am very happy that Laundryman doesn\'t use PERC. They use organic chemicals.'
  },
  {
    id: 3,
    name: 'Manisha Sharma',
    role: 'Instagram Blogger',
    location: 'Harmu, Ranchi',
    service: 'Laundry Service',
    tenure: '6 months',
    rating: 5,
    text: 'Premium quality wash & steam iron at affordable rates.'
  },
  {
    id: 4,
    name: 'Smita Mukherjee',
    role: 'Home Maker',
    location: 'Hinoo, Ranchi',
    service: 'All Services',
    tenure: '3 years',
    rating: 5,
    text: 'Professional Team. On Time Services. Optimal pricing.'
  },
  {
    id: 5,
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    location: 'Kantatoli, Ranchi',
    service: 'B2B Services',
    tenure: '2 years',
    rating: 5,
    text: 'Excellent B2B services for our office. Highly reliable and professional.'
  },
  {
    id: 6,
    name: 'Priya Singh',
    role: 'Fashion Designer',
    location: 'Dhurwa, Ranchi',
    service: 'Dry Cleaning',
    tenure: '1.5 years',
    rating: 5,
    text: 'They handle my designer wear with such care. Best dry cleaning service!'
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-yellow-400 text-lg">
        {'⭐'.repeat(rating)}
      </div>
      <span className={`${bodyTextClasses()} ${fontWeightClass('bold')} text-yellow-600`}>
        {rating}.0
      </span>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <StarRating rating={testimonial.rating} />
      
      <blockquote className={`${bodyTextClasses()} text-gray-900 my-4 italic`}>
        "{testimonial.text}"
      </blockquote>

      <div className="mt-auto">
        <p className={`${bodyTextClasses()} ${fontWeightClass('bold')} text-gray-900`}>
          {testimonial.name}
        </p>
        <p className={`${bodyTextClasses()} text-gray-600 text-sm`}>
          {testimonial.role} | {testimonial.location}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-block ${bgColor('primaryLight')} ${textColor('primary')} px-3 py-1 rounded-full text-xs font-semibold`}>
            {testimonial.service}
          </span>
          <span className={`${bodyTextClasses()} text-gray-600 text-xs`}>
            • Customer since {testimonial.tenure}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate every 5 seconds on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const visibleTestimonials = isMobile 
    ? [testimonials[currentIndex]]
    : testimonials;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Aggregate Rating Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex flex-col items-center bg-white rounded-2xl shadow-lg px-8 py-4 border-2 border-blue-200">
            <div className="text-4xl mb-2">⭐⭐⭐⭐⭐</div>
            <p className={`${headingClasses('h3')} ${textColor('primary')}`}>
              4.9/5
            </p>
            <p className={`${bodyTextClasses()} text-gray-600`}>
              From 2,400+ Happy Customers
            </p>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={headingClasses('h2')}>What Our Customers Say</h2>
          <p className={`${bodyTextClasses('lg')} text-gray-600 mt-2`}>
            Real feedback from our satisfied customers in Ranchi, Jharkhand
          </p>
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? `${bgColor('primary')} w-8` : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
