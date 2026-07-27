/**
 * Single Source-of-Truth Theme Class Utility
 * Connects UI helper functions directly to themeConfig (src/config/theme.js).
 * Changing tokens in theme.js dynamically updates all generated classes.
 */

import { colors } from '../config/colors'
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

export const hoverBgColor = (colorKey) => {
  const colorMap = {
    primary: colors.primary.dark,
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

export const hoverTextColor = (colorKey) => {
  const colorMap = {
    primary: colors.primary.dark,
    primaryLight: colors.primary.DEFAULT,
    secondary: colors.secondary.dark,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `hover:text-[${color}]`
}

export const focusRingColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    secondary: colors.secondary.DEFAULT,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `focus:ring-2 focus:ring-[${color}]`
}

export const accentColor = (colorKey = 'primary') => {
  const colorMap = {
    primary: colors.primary.DEFAULT,
    primaryLight: colors.primary.light,
    secondary: colors.secondary.DEFAULT,
  }
  
  const color = colorMap[colorKey] || colorKey
  return `accent-[${color}]`
}
