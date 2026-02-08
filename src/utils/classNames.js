/**
 * Utility functions for generating Tailwind class names using centralized colors
 * Import colors from config/colors.js and use these utilities for consistent styling
 */

import { colors } from '../config/colors'

/**
 * Get background color class
 * @param {string} colorKey - Key from colors config (e.g., 'primary', 'primaryLight')
 * @returns {string} Tailwind className with arbitrary value
 */
export const bgColor = (colorKey) => {
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
  
  const color = colorMap[colorKey] || colorKey
  return `bg-[${color}]`
}

/**
 * Get text color class
 * @param {string} colorKey - Key from colors config
 * @returns {string} Tailwind className with arbitrary value
 */
export const textColor = (colorKey) => {
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
  
  const color = colorMap[colorKey] || colorKey
  return `text-[${color}]`
}

/**
 * Get border color class
 * @param {string} colorKey - Key from colors config
 * @returns {string} Tailwind className with arbitrary value
 */
export const borderColor = (colorKey) => {
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
  
  const color = colorMap[colorKey] || colorKey
  return `border-[${color}]`
}

/**
 * Get hover background color class
 * @param {string} colorKey - Key from colors config
 * @returns {string} Tailwind className with arbitrary value
 */
export const hoverBgColor = (colorKey) => {
  const colorMap = {
    primary: colors.primary.dark, // Default hover is darker
    primaryLight: colors.primary.DEFAULT,
    primaryMedium: colors.primary.DEFAULT,
    primaryDark: colors.primary.darker,
    bgLight: colors.bg.lighter,
    secondary: colors.secondary.dark,
    whatsapp: colors.whatsapp.hover,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `hover:bg-[${color}]`
}

/**
 * Get hover text color class
 * @param {string} colorKey - Key from colors config
 * @returns {string} Tailwind className with arbitrary value
 */
export const hoverTextColor = (colorKey) => {
  const colorMap = {
    primary: colors.primary.dark,
    primaryLight: colors.primary.DEFAULT,
    secondary: colors.secondary.dark,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `hover:text-[${color}]`
}

/**
 * Get gradient classes for hero sections
 * @returns {string} Tailwind gradient classes
 */
export const heroGradient = () => {
  return `bg-gradient-to-r from-[${colors.primary.DEFAULT}] to-[${colors.primary.dark}]`
}

/**
 * Get focus ring color class
 * @param {string} colorKey - Key from colors config (defaults to 'primary')
 * @returns {string} Tailwind focus ring className
 */
export const focusRingColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    secondary: colors.secondary.DEFAULT,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `focus:ring-2 focus:ring-[${color}]`
}

/**
 * Get accent color class (for form inputs like range sliders, checkboxes)
 * @param {string} colorKey - Key from colors config (defaults to 'primary')
 * @returns {string} Tailwind accent color className
 */
export const accentColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    secondary: colors.secondary.DEFAULT,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `accent-[${color}]`
}

