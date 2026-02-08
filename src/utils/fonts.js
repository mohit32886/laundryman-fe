/**
 * Font utility functions for generating Tailwind class names and styles
 * Import fonts from config/fonts.js and use these utilities for consistent typography
 */

import { fonts, fontWeights, fontSizes, lineHeights, getFontFamily } from '../config/fonts'

/**
 * Get font-family style object for inline styles
 * @param {string} type - Font type: 'primary', 'secondary', or 'mono' (default: 'primary')
 * @returns {object} Style object with fontFamily property
 */
export const fontFamilyStyle = (type = 'primary') => {
  return {
    fontFamily: getFontFamily(type),
  }
}

/**
 * Get font-weight class
 * @param {string} weight - Weight key: 'light', 'normal', 'medium', 'bold', etc.
 * @returns {string} Tailwind font-weight class
 */
export const fontWeightClass = (weight) => {
  const weightMap = {
    light: 'font-light',      // 300
    normal: 'font-normal',    // 400
    medium: 'font-medium',   // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',        // 700
    extrabold: 'font-extrabold', // 800
    black: 'font-black',      // 900
  }
  
  return weightMap[weight] || 'font-normal'
}

/**
 * Get font-size class
 * @param {string} size - Size key: 'xs', 'sm', 'base', 'lg', 'xl', '2xl', etc.
 * @returns {string} Tailwind font-size class
 */
export const fontSizeClass = (size) => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  }
  
  return sizeMap[size] || 'text-base'
}

/**
 * Get line-height class
 * @param {string} height - Height key: 'none', 'tight', 'snug', 'normal', 'relaxed', 'loose'
 * @returns {string} Tailwind line-height class
 */
export const lineHeightClass = (height) => {
  const heightMap = {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  }
  
  return heightMap[height] || 'leading-normal'
}

/**
 * Get complete typography classes
 * @param {object} options - Typography options
 * @param {string} options.size - Font size (default: 'base')
 * @param {string} options.weight - Font weight (default: 'normal')
 * @param {string} options.height - Line height (default: 'normal')
 * @param {string} options.family - Font family type (default: 'primary')
 * @returns {string} Combined Tailwind classes
 */
export const typographyClasses = ({ 
  size = 'base', 
  weight = 'normal', 
  height = 'normal',
  family = 'primary' 
} = {}) => {
  const classes = [
    fontSizeClass(size),
    fontWeightClass(weight),
    lineHeightClass(height),
  ]
  
  // Note: Font family is applied via CSS variables in base styles
  // If you need to override, use inline styles with fontFamilyStyle()
  
  return classes.filter(Boolean).join(' ')
}

/**
 * Get heading typography classes (optimized for headings)
 * @param {string} level - Heading level: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @returns {string} Combined Tailwind classes for heading
 */
export const headingClasses = (level = 'h1') => {
  const headingMap = {
    h1: typographyClasses({ size: '5xl', weight: 'bold', height: 'tight' }),
    h2: typographyClasses({ size: '4xl', weight: 'bold', height: 'tight' }),
    h3: typographyClasses({ size: '3xl', weight: 'bold', height: 'snug' }),
    h4: typographyClasses({ size: '2xl', weight: 'bold', height: 'snug' }),
    h5: typographyClasses({ size: 'xl', weight: 'bold', height: 'normal' }),
    h6: typographyClasses({ size: 'lg', weight: 'bold', height: 'normal' }),
  }
  
  return headingMap[level] || headingMap.h1
}

/**
 * Get body text typography classes
 * @param {string} size - Size: 'sm', 'base', 'lg' (default: 'base')
 * @returns {string} Combined Tailwind classes for body text
 */
export const bodyTextClasses = (size = 'base') => {
  return typographyClasses({ 
    size, 
    weight: 'normal', 
    height: 'relaxed' 
  })
}

/**
 * Get button text typography classes
 * @param {string} size - Size: 'sm', 'base', 'lg' (default: 'base')
 * @returns {string} Combined Tailwind classes for button text
 */
export const buttonTextClasses = (size = 'base') => {
  return typographyClasses({ 
    size, 
    weight: 'medium', 
    height: 'normal' 
  })
}

