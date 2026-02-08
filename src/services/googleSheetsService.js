/**
 * Google Sheets Integration Service
 * Submits form data to Google Sheets via Google Apps Script web app
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste the Apps Script code (see GOOGLE_APPS_SCRIPT.md in project root)
 * 4. Deploy as Web App and copy the URL
 * 5. Set VITE_GOOGLE_SCRIPT_URL in your .env file
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

/**
 * Form types that correspond to different data structures
 */
export const FORM_TYPES = {
  CALLBACK: 'callback',
  B2B_QUOTE: 'b2b_quote',
  PICKUP: 'pickup',
  FRANCHISE: 'franchise',
  CONTACT: 'contact'
}

/**
 * Submit form data to Google Sheets
 * @param {string} formType - Type of form (from FORM_TYPES)
 * @param {Object} data - Form data to submit
 * @returns {Promise<Object>} Response from Google Apps Script
 */
export async function submitToGoogleSheets(formType, data) {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL not configured. Set VITE_GOOGLE_SCRIPT_URL in .env')
    // For development, simulate success
    console.log(`[DEV] Form submission (${formType}):`, data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, message: 'Development mode - data logged to console' }
  }

  try {
    const payload = {
      formType,
      timestamp: new Date().toISOString(),
      ...data
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    // Note: With 'no-cors', we can't read the response
    // The request will succeed if Google Apps Script is properly configured
    return { 
      success: true, 
      message: 'Form submitted successfully' 
    }
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
    throw new Error('Failed to submit form. Please try again.')
  }
}

/**
 * Submit callback request form
 */
export async function submitCallbackForm(data) {
  return submitToGoogleSheets(FORM_TYPES.CALLBACK, {
    name: data.name,
    phone: data.phone,
    preferredTime: data.preferredTime || '',
    message: data.message || ''
  })
}

/**
 * Submit B2B quote request form
 */
export async function submitB2BQuoteForm(data) {
  return submitToGoogleSheets(FORM_TYPES.B2B_QUOTE, {
    companyName: data.companyName,
    contactName: data.contactName,
    email: data.email,
    phone: data.phone,
    industry: data.industry,
    volume: data.volume || '',
    location: data.location || '',
    requirements: data.requirements || '',
    message: data.message || ''
  })
}

/**
 * Submit pickup schedule form
 */
export async function submitPickupForm(data) {
  return submitToGoogleSheets(FORM_TYPES.PICKUP, {
    name: data.name,
    phone: data.phone,
    address: data.address,
    pickupDate: data.pickupDate,
    pickupTime: data.pickupTime || '',
    serviceType: data.serviceType,
    message: data.message || ''
  })
}

/**
 * Submit franchise inquiry form
 */
export async function submitFranchiseForm(data) {
  return submitToGoogleSheets(FORM_TYPES.FRANCHISE, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    city: data.city,
    investmentCapacity: data.investmentCapacity || '',
    message: data.message || ''
  })
}

/**
 * Submit contact form
 */
export async function submitContactForm(data) {
  return submitToGoogleSheets(FORM_TYPES.CONTACT, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    subject: data.subject,
    message: data.message
  })
}


