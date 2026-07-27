/**
 * Single Source-of-Truth Theme Class Utility
 * Connects UI helper functions directly to themeConfig (src/config/theme.js).
 * Changing tokens in theme.js dynamically updates all generated classes.
 */

import { themeConfig } from '../config/theme'

export const heroGradient = () => {
  return themeConfig.gradients.heroBackground;
}

export const titleGradient = () => {
  return themeConfig.gradients.titleText;
}

export const ctaButtonClass = () => {
  return themeConfig.gradients.ctaButton;
}

export const glassCardClass = (variant = 'light') => {
  return variant === 'dark' ? themeConfig.glassmorphism.cardDark : themeConfig.glassmorphism.cardLight;
}

export const bgColor = (colorKey) => {
  const colorMap = {
    primary: 'bg-cyan-700',
    primaryLight: 'bg-cyan-600',
    primaryMedium: 'bg-cyan-600',
    primaryDark: 'bg-cyan-800',
    bgLight: 'bg-cyan-50',
    bgLighter: 'bg-cyan-100',
    secondary: 'bg-emerald-600',
    whatsapp: 'bg-emerald-500',
    whatsappHover: 'bg-emerald-600',
  }
  
  return colorMap[colorKey] || `bg-[${colorKey}]`
}

export const textColor = (colorKey) => {
  const colorMap = {
    primary: 'text-cyan-800',
    primaryLight: 'text-cyan-600',
    primaryMedium: 'text-cyan-600',
    primaryDark: 'text-cyan-900',
    bgLight: 'text-cyan-50',
    bgLighter: 'text-cyan-100',
    secondary: 'text-emerald-600',
    whatsapp: 'text-emerald-500',
    whatsappHover: 'text-emerald-600',
  }
  
  return colorMap[colorKey] || `text-[${colorKey}]`
}

export const borderColor = (colorKey) => {
  const colorMap = {
    primary: 'border-cyan-700',
    primaryLight: 'border-cyan-600',
    primaryMedium: 'border-cyan-600',
    primaryDark: 'border-cyan-800',
    bgLight: 'border-cyan-50',
    bgLighter: 'border-cyan-100',
    secondary: 'border-emerald-600',
    whatsapp: 'border-emerald-500',
    whatsappHover: 'border-emerald-600',
  }
  
  return colorMap[colorKey] || `border-[${colorKey}]`
}

export const hoverBgColor = (colorKey) => {
  const colorMap = {
    primary: 'hover:bg-cyan-800',
    primaryLight: 'hover:bg-cyan-700',
    primaryMedium: 'hover:bg-cyan-700',
    primaryDark: 'hover:bg-cyan-900',
    bgLight: 'hover:bg-cyan-100',
    secondary: 'hover:bg-emerald-700',
    whatsapp: 'hover:bg-emerald-600',
  }
  
  return colorMap[colorKey] || `hover:bg-[${colorKey}]`
}

export const hoverTextColor = (colorKey) => {
  const colorMap = {
    primary: 'hover:text-cyan-900',
    primaryLight: 'hover:text-cyan-700',
    secondary: 'hover:text-emerald-700',
  }
  
  return colorMap[colorKey] || `hover:text-[${colorKey}]`
}

export const focusRingColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: 'focus:ring-2 focus:ring-cyan-700',
    primaryLight: 'focus:ring-2 focus:ring-cyan-600',
    secondary: 'focus:ring-2 focus:ring-emerald-600',
  }
  
  return colorMap[colorKey] || `focus:ring-2 focus:ring-[${colorKey}]`
}

export const accentColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: 'accent-cyan-700',
    primaryLight: 'accent-cyan-600',
    secondary: 'accent-emerald-600',
  }
  
  return colorMap[colorKey] || `accent-[${colorKey}]`
}
