/**
 * Font Configuration
 * Centralized font configuration following DRY principles
 * 
 * ⚠️ IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all fonts
 * 
 * To change fonts across the entire website:
 * 1. Update the values in this file
 * 2. Update the Google Fonts import in index.html (if using web fonts)
 * 3. Update CSS variables in src/index.css
 * 
 * Usage in components:
 *   import { fontFamily } from '../config/fonts'
 *   style={{ fontFamily: fontFamily.primary }}
 *   
 *   Or use Tailwind classes: className="font-primary"
 */

export const fonts = {
  // Primary font family (used for body text and most content)
  primary: {
    name: 'Roboto',
    fallback: 'sans-serif',
    googleFonts: 'Roboto:300,400,500,700,900', // Weights: light, regular, medium, bold, black
    cssValue: '"Roboto", sans-serif',
  },
  
  // Secondary font (optional, for headings or special cases)
  secondary: {
    name: 'Roboto',
    fallback: 'sans-serif',
    googleFonts: 'Roboto:300,400,500,700,900',
    cssValue: '"Roboto", sans-serif',
  },
  
  // Monospace font (for code, technical content)
  mono: {
    name: 'Roboto Mono',
    fallback: 'monospace',
    googleFonts: 'Roboto+Mono:400,700',
    cssValue: '"Roboto Mono", monospace',
  },
}

/**
 * Font weights configuration
 */
export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

/**
 * Font sizes configuration (in rem units for scalability)
 */
export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
}

/**
 * Line heights configuration
 */
export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}

/**
 * Get Google Fonts URL for all configured fonts
 * @returns {string} Google Fonts import URL
 */
export const getGoogleFontsUrl = () => {
  const fontsToLoad = [
    fonts.primary.googleFonts,
    fonts.mono.googleFonts,
  ].filter(Boolean)
  
  return `https://fonts.googleapis.com/css2?${fontsToLoad.map(font => `family=${font}`).join('&')}&display=swap`
}

/**
 * Get CSS font-family value
 * @param {string} type - Font type: 'primary', 'secondary', or 'mono'
 * @returns {string} CSS font-family value
 */
export const getFontFamily = (type = 'primary') => {
  return fonts[type]?.cssValue || fonts.primary.cssValue
}

export default fonts

