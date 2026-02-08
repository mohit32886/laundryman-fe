/**
 * Brand Colors Configuration
 * Colors extracted from the logo to maintain brand consistency
 * 
 * ⚠️ IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all colors
 * 
 * To change colors across the entire website:
 * 1. Update the values in this file
 * 2. Also update the corresponding CSS variables in src/index.css
 *    (Future: automate this sync with a build script)
 * 
 * Usage in components:
 *   import { bgColor, textColor } from '../utils/classNames'
 *   className={`${bgColor('primary')} ${textColor('primary')}`}
 */

export const colors = {
  // Primary Brand Colors (from logo)
  primary: {
    DEFAULT: '#1879a2',      // Main brand color
    light: '#24bcee',        // Lighter cyan-blue
    medium: '#35a0d9',       // Medium blue
    dark: '#145e7d',         // Darker blue for hover states
    darker: '#0f4358',       // Even darker variant
    darkest: '#0a2833',      // Darkest variant
  },
  
  // Background variants
  bg: {
    light: '#e6f4f8',        // Very light blue background
    lighter: '#cce9f1',      // Light blue background
    lightest: '#99d3e3',      // Lighter variant
  },
  
  // Secondary Colors (WhatsApp green - kept for brand consistency)
  secondary: {
    DEFAULT: '#10b981',     // Green for WhatsApp
    light: '#34d399',
    dark: '#059669',
  },
  
  // WhatsApp specific colors (standard brand colors)
  whatsapp: {
    DEFAULT: '#25D366',      // WhatsApp green
    hover: '#20BA5A',        // WhatsApp hover green
  },
  
  // Neutral colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
  },
}

/**
 * Tailwind-compatible color object for use in className strings
 * Usage: className={`bg-[${colors.tw.primary}]`}
 */
export const twColors = {
  primary: colors.primary.DEFAULT,
  primaryLight: colors.primary.light,
  primaryMedium: colors.primary.medium,
  primaryDark: colors.primary.dark,
  bgLight: colors.bg.light,
  bgLighter: colors.bg.lighter,
  secondary: colors.secondary.DEFAULT,
  whatsapp: colors.whatsapp.DEFAULT,
  whatsappHover: colors.whatsapp.hover,
}

/**
 * Helper function to get Tailwind arbitrary value format
 * Usage: className={twColor('primary')} // returns 'bg-[#1879a2]'
 */
export const twColor = (colorKey, prefix = 'bg') => {
  const colorMap = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    primaryMedium: colors.primary.medium,
    primaryDark: colors.primary.dark,
    bgLight: colors.bg.light,
    bgLighter: colors.bg.lighter,
    secondary: colors.secondary.DEFAULT,
    whatsapp: colors.whatsapp.DEFAULT,
    whatsappHover: colors.whatsapp.hover,
  }
  
  return `${prefix}-[${colorMap[colorKey] || colorKey}]`
}

export default colors

