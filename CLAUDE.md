# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laundryman is a React-based website for a premium laundry and dry cleaning service in Ranchi, India. The site provides service booking, B2B solutions, pricing information, location pages, and integrates with Google Sheets for form submissions and WhatsApp for customer communication.

**Tech Stack:**
- React 19.1.1 with functional components and hooks
- Vite 7.1.7 for fast development and optimized builds
- React Router DOM 7.9.5 for client-side routing
- Tailwind CSS 4.1.16 for styling (utility-first approach)
- Framer Motion 12.23.24 for animations
- react-helmet-async for SEO meta tags

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build production bundle (optimized with code splitting)
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

## Architecture & Patterns

### Centralized Configuration System

This project follows a strict **Single Source of Truth** pattern for configuration. All brand colors, contact information, and typography are centralized in `src/config/`:

- **Colors** (`src/config/colors.js`): Brand colors extracted from logo. When changing colors:
  1. Update values in `src/config/colors.js`
  2. Update corresponding CSS variables in `src/index.css`
  3. Components use utility functions from `src/utils/classNames.js` (never hardcode colors)

- **Contact Info** (`src/config/contact.js`): Phone numbers and WhatsApp links. Single place to update all contact information across the site.

- **Fonts** (`src/config/fonts.js`): Typography configuration synced with CSS variables and Google Fonts in `index.html`.

**CRITICAL**: Always use utility functions from `src/utils/classNames.js` for styling:
```javascript
import { bgColor, textColor, hoverBgColor, heroGradient } from '../utils/classNames'
// ✅ Correct
<button className={`${bgColor('primary')} ${textColor('white')} ${hoverBgColor('primary')}`}>

// ❌ Wrong - never hardcode colors
<button className="bg-[#1879a2] text-white hover:bg-[#145e7d]">
```

### Routing Structure

- **App.jsx**: Central routing with `<Layout>` wrapper for all pages
- **Layout.jsx**: Provides consistent structure (Navbar, Footer, FloatingActionButtons) and scroll-to-top on route change
- **Location-based pages**: Template pattern in `src/pages/locations/LocationTemplate.jsx` used for area-specific landing pages (SEO-optimized for local search)

### Form Submission & Data Flow

All forms submit to Google Sheets via Apps Script web app:
- Service: `src/services/googleSheetsService.js`
- Environment variable: `VITE_GOOGLE_SCRIPT_URL` (optional in development)
- Form types: callback, B2B quote, pickup scheduling, franchise inquiry, contact
- Development mode: Forms log to console if no URL configured

### State Management

- **Form persistence**: `src/utils/formStateManager.js` handles localStorage for booking form drafts (24-hour expiry)
- **Modal state**: Local component state using `useState` hooks
- **No global state library**: Simple prop drilling and context where needed

### SEO Strategy

- **MetaTags component** (`src/components/SEO/MetaTags.jsx`): Generates comprehensive meta tags, OpenGraph, Twitter Cards
- **SchemaMarkup component** (`src/components/SEO/SchemaMarkup.jsx`): JSON-LD structured data
- **react-helmet-async**: Wraps app in `<HelmetProvider>` (see `src/main.jsx`)
- **Location pages**: Each area has SEO-optimized landing page with local keywords, landmarks, testimonials

### Performance

- **Vite config optimizations**:
  - Manual code splitting: `react-vendor` and `animation-vendor` chunks
  - esbuild minification with console removal in production
  - Optimized dependencies pre-bundled
  - No source maps in production

- **Performance monitoring** (`src/utils/performanceMonitor.js`):
  - Auto-initializes in development mode only
  - Monitors Core Web Vitals: LCP, FID, CLS, TTFB, TBT
  - Logs performance metrics to console

### Component Patterns

1. **Modal components**: Reusable pattern with `isOpen` and `onClose` props
2. **LocationTemplate**: Template component for area-specific pages (props: areaName, areaDescription, landmarks, testimonials, coordinates)
3. **Animation**: Framer Motion for all interactive elements (button hovers, scroll animations)
4. **Responsive**: Mobile-first Tailwind classes with sm:, md:, lg: breakpoints

## Styling Guidelines

1. **Use Tailwind utility classes** - avoid custom CSS where possible
2. **Never hardcode colors** - always use `src/utils/classNames.js` utilities
3. **Follow mobile-first** - base styles for mobile, add responsive variants upward
4. **Use Framer Motion** for animations (whileHover, whileTap, viewport scroll animations)
5. **Arbitrary values**: Use Tailwind arbitrary values `[#hexcode]` for brand colors via utility functions

## Code Quality

- ESLint configured with React Hooks and React Refresh plugins
- Unused variables allowed if they start with uppercase (ignore pattern for React components)
- Functional components with hooks only (no class components)
- PropTypes not used (rely on component documentation in comments)

## Form Submissions

When creating or modifying forms:
1. Add form type to `FORM_TYPES` in `src/services/googleSheetsService.js`
2. Create corresponding submit function (e.g., `submitPickupForm`)
3. Include timestamp automatically (handled by service)
4. Use `no-cors` mode for Google Apps Script requests
5. Show user feedback on success/error

## WhatsApp Integration

- Contact config provides WhatsApp number with country code (919006468666)
- Helper function: `contactInfo.getWhatsAppUrl()` generates proper `wa.me` link
- FloatingActionButtons component provides persistent WhatsApp button
- WhatsAppBooking component for in-page booking flow

## File Organization

- `/src/components/` - Reusable UI components (modals, navbar, footer, etc.)
- `/src/components/SEO/` - SEO-specific components (MetaTags, SchemaMarkup)
- `/src/components/ui/` - Small UI primitives (badges, buttons, etc.)
- `/src/pages/` - Route-level page components
- `/src/pages/locations/` - Location-specific landing pages
- `/src/config/` - Centralized configuration (colors, fonts, contact)
- `/src/services/` - External integrations (Google Sheets, etc.)
- `/src/utils/` - Utility functions (classNames, fonts, form state, performance)
- `/src/styles/` - Global CSS (touch optimization, etc.)

## Environment Variables

Create `.env` file with:
```env
VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url_here
```

Optional in development (forms will log to console without it).

## Important Notes

- Site URL: `https://laundryman.pro`
- Target market: Ranchi, India (local SEO important)
- Business focus: Premium eco-friendly laundry service with German Lagoon technology
- Key metrics: 4.9/5 rating, 2400+ customers, 7 years of service
- Delivery times: Laundry 48hrs, Dry Cleaning 72hrs (with express option)
- First order offer: 20% discount for new customers
