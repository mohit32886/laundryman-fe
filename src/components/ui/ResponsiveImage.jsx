import { useState } from 'react'

/**
 * ResponsiveImage Component
 * Optimized image component with lazy loading and responsive sources
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} loading - Loading strategy ('lazy' | 'eager')
 * @param {string} className - Additional CSS classes
 * @param {object} sizes - Responsive sizes attribute
 * @param {object} style - Inline styles
 */
const ResponsiveImage = ({ 
  src, 
  alt, 
  loading = 'lazy',
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  style = {},
  ...props
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false)
  }

  // Handle image error
  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  // Generate responsive srcSet if src contains query params or is a URL
  const generateSrcSet = () => {
    if (!src) return undefined
    
    // If src already has query params (e.g., from image CDN), use it
    if (src.includes('?')) {
      const baseUrl = src.split('?')[0]
      return `${baseUrl}?w=400&q=80 400w, ${baseUrl}?w=800&q=80 800w, ${baseUrl}?w=1200&q=80 1200w`
    }
    
    // Otherwise, return undefined to use the original src
    return undefined
  }

  const srcSet = generateSrcSet()

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        style={{ minHeight: '200px', ...style }}
        role="img"
        aria-label={alt || 'Image failed to load'}
      >
        <svg 
          className="w-12 h-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
      <picture>
        {srcSet && (
          <>
            {/* WebP format for better compression */}
            <source 
              srcSet={srcSet.replace(/w=\d+/g, (match) => match.replace('w=', 'w='))} 
              type="image/webp" 
              sizes={sizes}
            />
            {/* Fallback for browsers that don't support WebP */}
            <source 
              srcSet={srcSet} 
              sizes={sizes}
            />
          </>
        )}
        <img
          src={src}
          alt={alt}
          loading={loading}
          srcSet={srcSet}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          style={{ ...style, maxWidth: '100%', height: 'auto' }}
          {...props}
        />
      </picture>
    </div>
  )
}

export default ResponsiveImage
