/**
 * Single Source-of-Truth Harmonious Theme Configuration
 */

export const themeConfig = {
  colors: {
    primary: '#0284c7',
    primaryLight: '#38bdf8',
    primaryDark: '#0369a1',
    slateDark: '#090d16',     // Dark Hero & Header background
    slateMedium: '#0f172a',   // Card background depth
    accentCyan: '#38bdf8',    // Cyan glowing badges & borders
    accentEmerald: '#10b981', // WhatsApp green & success pills
    accentGold: '#f59e0b',    // Offer badges & highlights
    surfacePage: '#f8fafc',   // Page background
  },

  gradients: {
    heroBackground: 'theme-hero-bg',
    titleText: 'theme-title-gradient',
    ctaButton: 'theme-cta-btn',
  },

  glassmorphism: {
    cardLight: 'glass-card',
    cardDark: 'glass-panel-dark',
  }
};
