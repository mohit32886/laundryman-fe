/**
 * Mobile Features Utility
 * Provides mobile-specific functionality like phone calls, WhatsApp, directions, share, and vibration
 */

/**
 * Mobile Features Object
 * Contains utility functions for mobile-specific actions
 */
export const mobileFeatures = {
  /**
   * Make a phone call
   * @param {string} phone - Phone number (with or without country code)
   * @returns {void}
   */
  makeCall: (phone) => {
    if (!phone) {
      console.error('Phone number is required')
      return
    }
    
    // Remove any non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    window.location.href = `tel:${cleanPhone}`
  },

  /**
   * Open WhatsApp with a message
   * @param {string} message - Message to send
   * @param {string} number - WhatsApp number (with country code, no +)
   * @returns {void}
   */
  openWhatsApp: (message = '', number = '919006468666') => {
    if (!number) {
      console.error('WhatsApp number is required')
      return
    }
    
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/${cleanNumber}${message ? `?text=${encodedMessage}` : ''}`
    window.open(url, '_blank')
  },

  /**
   * Get directions to an address
   * @param {string} address - Address or location name
   * @returns {void}
   */
  getDirections: (address) => {
    if (!address) {
      console.error('Address is required')
      return
    }
    
    const encodedAddress = encodeURIComponent(address)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    
    let url
    
    if (isIOS) {
      // Try Apple Maps first, fallback to Google Maps
      url = `maps://maps.google.com/maps?daddr=${encodedAddress}`
    } else if (isAndroid) {
      // Use Google Maps for Android
      url = `geo:0,0?q=${encodedAddress}`
    } else {
      // Desktop/other - use Google Maps web
      url = `https://maps.google.com/?q=${encodedAddress}`
    }
    
    window.open(url, '_blank')
  },

  /**
   * Share content using Web Share API or clipboard fallback
   * @param {object} data - Share data { title, text, url }
   * @returns {Promise<void>}
   */
  share: async (data) => {
    if (!data || (!data.url && !data.text)) {
      console.error('Share data is required')
      return
    }

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title || 'Laundryman.pro',
          text: data.text || '',
          url: data.url || window.location.href,
        })
        console.log('Content shared successfully')
      } catch (error) {
        // User cancelled or error occurred
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
          // Fallback to clipboard
          await mobileFeatures.copyToClipboard(data.url || window.location.href)
        }
      }
    } else {
      // Fallback to clipboard
      await mobileFeatures.copyToClipboard(data.url || window.location.href)
    }
  },

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<void>}
   */
  copyToClipboard: async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        console.log('Text copied to clipboard')
        // Show a toast notification (you can integrate with your UI library)
        if (typeof window !== 'undefined' && window.alert) {
          alert('Link copied to clipboard!')
        }
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      alert('Failed to copy link. Please copy manually.')
    }
  },

  /**
   * Vibrate device (if supported)
   * @param {number|number[]} pattern - Vibration pattern in milliseconds
   * @returns {boolean} - True if vibration was successful
   */
  vibrate: (pattern = [100]) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern)
        return true
      } catch (error) {
        console.warn('Vibration failed:', error)
        return false
      }
    } else {
      console.warn('Vibration API not supported')
      return false
    }
  },

  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  /**
   * Check if device is iOS
   * @returns {boolean}
   */
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },

  /**
   * Check if device is Android
   * @returns {boolean}
   */
  isAndroid: () => {
    return /Android/.test(navigator.userAgent)
  },

  /**
   * Open SMS app with a message
   * @param {string} number - Phone number
   * @param {string} message - Message text
   * @returns {void}
   */
  sendSMS: (number, message = '') => {
    if (!number) {
      console.error('Phone number is required')
      return
    }
    
    const cleanNumber = number.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    window.location.href = `sms:${cleanNumber}${message ? `?body=${encodedMessage}` : ''}`
  },

  /**
   * Open email client
   * @param {string} email - Email address
   * @param {string} subject - Email subject
   * @param {string} body - Email body
   * @returns {void}
   */
  sendEmail: (email, subject = '', body = '') => {
    if (!email) {
      console.error('Email address is required')
      return
    }
    
    const params = new URLSearchParams()
    if (subject) params.append('subject', subject)
    if (body) params.append('body', body)
    
    const queryString = params.toString()
    window.location.href = `mailto:${email}${queryString ? `?${queryString}` : ''}`
  },
}

export default mobileFeatures
