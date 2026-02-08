/**
 * Form State Manager
 * Handles localStorage persistence for booking form data
 */

const STORAGE_KEY = 'laundryman_booking_draft'
const EXPIRY_HOURS = 24

export const formStateManager = {
  /**
   * Save form data to localStorage
   * @param {Object} formData - Form data to save
   * @returns {boolean} Success status
   */
  save: (formData) => {
    try {
      const dataWithTimestamp = {
        data: formData,
        timestamp: new Date().getTime()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp))
      return true
    } catch (error) {
      console.error('Failed to save form state:', error)
      return false
    }
  },

  /**
   * Load form data from localStorage
   * @returns {Object|null} Saved form data or null if expired/not found
   */
  load: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null

      const { data, timestamp } = JSON.parse(stored)
      
      // Check if data has expired (24 hours)
      const hoursSinceStored = (new Date().getTime() - timestamp) / (1000 * 60 * 60)
      if (hoursSinceStored > EXPIRY_HOURS) {
        formStateManager.clear()
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to load form state:', error)
      return null
    }
  },

  /**
   * Clear stored form data
   * @returns {boolean} Success status
   */
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear form state:', error)
      return false
    }
  },

  /**
   * Check if there's saved data
   * @returns {boolean} True if saved data exists and is valid
   */
  hasSavedData: () => {
    return formStateManager.load() !== null
  }
}
