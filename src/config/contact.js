/**
 * Contact Information Configuration
 * Centralized contact information following DRY principles
 * 
 * ⚠️ IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all contact information
 * 
 * To change phone numbers across the entire website:
 * 1. Update the values in this file
 * 2. All components will automatically use the new numbers
 * 
 * Usage in components:
 *   import { contactInfo } from '../config/contact'
 *   window.open(`https://wa.me/${contactInfo.whatsapp.order}`, '_blank')
 *   <a href={`tel:${contactInfo.phone.support}`}>Call Support</a>
 */

export const contactInfo = {
  // WhatsApp numbers (with country code 91 for India)
  whatsapp: {
    order: '919006468666',        // WhatsApp number for orders (with country code)
  },
  
  // Phone numbers (calling number - different from WhatsApp)
  phone: {
    support: '+919006463666',   // Customer support phone number
  },
  
  // Helper functions for common use cases
  getWhatsAppUrl: (number = contactInfo.whatsapp.order) => {
    return `https://wa.me/${number}`
  },
  
  getTelUrl: (number = contactInfo.phone.support) => {
    return `tel:${number}`
  },
  
  // Display formats (with spaces for readability)
  display: {
    whatsapp: '9006468666',       // WhatsApp: +91 9006468666
    phone: '+91 9006463666',      // Calling: +91 9006463666
  },
}

