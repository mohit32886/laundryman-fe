import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { colors } from '../config/colors'

export default function TestimonialCarousel({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(1)

  const defaultTestimonials = [
    {
      name: 'Santosh Gupta',
      role: 'Senior Lecturer',
      rating: 5,
      text: 'I am satisfied with the quality and timelines of service.',
      location: 'Lalgutwa, Ranchi',
      serviceUsed: 'Laundry & Dry Cleaning',
      customerSince: '2 years'
    },
    {
      name: 'Ashish Chawla',
      role: 'Designer',
      rating: 5,
      text: 'I am very happy that Laundryman doesn\'t use PERC. They use organic chemicals.',
      location: 'Doranda, Ranchi',
      serviceUsed: 'Dry Cleaning',
      customerSince: '1 year'
    },
    {
      name: 'Manisha Sharma',
      role: 'Instagram Blogger',
      rating: 4,
      text: 'Premium quality wash & steam iron at affordable rates.',
      location: 'Harmu, Ranchi',
      serviceUsed: 'Laundry Service',
      customerSince: '6 months'
    },
    {
      name: 'Smita Mukherjee',
      role: 'Home Maker',
      rating: 5,
      text: 'Professional Team. On Time Services. Optimal pricing.',
      location: 'Hinoo, Ranchi',
      serviceUsed: 'All Services',
      customerSince: '3 years'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      rating: 5,
      text: 'Excellent B2B services for our office. Highly reliable and professional.',
      location: 'Kantatoli, Ranchi',
      serviceUsed: 'B2B Services',
      customerSince: '2 years'
    },
    {
      name: 'Priya Singh',
      role: 'Fashion Designer',
      rating: 5,
      text: 'They handle my designer wear with such care. Best dry cleaning service!',
      location: 'Dhurwa, Ranchi',
      serviceUsed: 'Dry Cleaning',
      customerSince: '1.5 years'
    }
  ]

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1) // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2) // Tablet: 2 cards
      } else {
        setItemsPerSlide(3) // Desktop: 3 cards
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset currentIndex when itemsPerSlide changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerSlide])

  const slidesCount = Math.ceil(items.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex >= slidesCount - 1 ? 0 : prevIndex + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex <= 0 ? slidesCount - 1 : prevIndex - 1
    })
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Carousel Container */}
      <div className="relative overflow-hidden px-8 sm:px-12 md:px-16">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {Array.from({ length: slidesCount }).map((_, slideIndex) => {
            const start = slideIndex * itemsPerSlide
            const slideItems = items.slice(start, start + itemsPerSlide)
            
            return (
              <div key={slideIndex} className="min-w-full flex-shrink-0">
                <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                  itemsPerSlide === 1 
                    ? 'grid-cols-1 max-w-md mx-auto' 
                    : itemsPerSlide === 2 
                      ? 'grid-cols-2 max-w-3xl mx-auto' 
                      : 'grid-cols-3 max-w-5xl mx-auto'
                }`}>
                  {slideItems.map((testimonial, idx) => (
                    <div
                      key={start + idx}
                      className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full"
                    >
                      {/* Customer Info */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[${colors.primary.light}] to-[${colors.primary.DEFAULT}] flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md`}>
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                            {testimonial.name}
                          </h3>
                          <p className={`text-xs sm:text-sm text-[${colors.primary.DEFAULT}] font-semibold truncate`}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <div className="mb-3 sm:mb-4">
                        <svg className={`w-6 h-6 sm:w-8 sm:h-8 text-[${colors.primary.light}]/30`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 min-h-[60px] sm:min-h-[80px]">
                        "{testimonial.text}"
                      </p>

                      {/* Star Rating */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="flex gap-0.5 sm:gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm sm:text-base font-semibold text-gray-700">
                          {testimonial.rating}.0
                        </span>
                      </div>

                      {/* Service Details */}
                      <div className="border-t border-gray-100 pt-4 sm:pt-5 space-y-2 sm:space-y-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[${colors.primary.light}] flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-medium truncate">{testimonial.serviceUsed || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[${colors.primary.light}] flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Customer since {testimonial.customerSince || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {slidesCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-[${colors.primary.light}] hover:text-white text-[${colors.primary.DEFAULT}] rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-100`}
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-[${colors.primary.light}] hover:text-white text-[${colors.primary.DEFAULT}] rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-100`}
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slidesCount > 1 && (
        <div className="flex justify-center mt-6 sm:mt-10 space-x-2 sm:space-x-3">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? `bg-[${colors.primary.DEFAULT}] w-6 sm:w-8`
                  : 'bg-gray-300 w-2 sm:w-2.5 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
