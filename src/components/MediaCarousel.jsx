import { useState, useEffect, useRef } from 'react'

export default function MediaCarousel({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  // Default items if none provided
  const defaultItems = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=500&fit=crop',
      alt: 'Professional laundry service'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=500&fit=crop',
      alt: 'Dry cleaning process'
    },
    {
      type: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1626785774626-28b269cb84af?w=800&h=500&fit=crop',
      title: 'Our Cleaning Process'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556912167-f556f1f39f12?w=800&h=500&fit=crop',
      alt: 'Quality service'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
      alt: 'Laundry facilities'
    }
  ]

  const carouselItems = items.length > 0 ? items : defaultItems

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
    // Reset auto-slide timer when manually navigating
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 4000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
    // Reset auto-slide timer when manually navigating
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 4000)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    // Reset auto-slide timer when manually navigating
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 4000)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (carouselItems.length <= 1) return

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Only start auto-slide if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [carouselItems.length, isPaused])

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="min-w-full flex-shrink-0">
              {item.type === 'video' ? (
                <div className="relative w-full h-[500px] bg-black overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={item.thumbnail}
                    src={item.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-[500px]">
                  <img
                    src={item.url}
                    alt={item.alt || `Carousel item ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white font-semibold">{item.caption}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {carouselItems.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {carouselItems.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

