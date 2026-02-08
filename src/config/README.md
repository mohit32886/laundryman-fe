# Configuration Guide

## Overview

This project uses centralized configuration systems following the DRY (Don't Repeat Yourself) principle. All brand colors and fonts are defined in single locations and can be updated globally.

## Table of Contents

1. [Color Configuration](#color-configuration)
2. [Font Configuration](#font-configuration)

## File Structure

```
src/
├── config/
│   ├── colors.js          # Single source of truth for all colors
│   ├── fonts.js           # Single source of truth for all fonts
│   └── README.md          # This file
├── utils/
│   ├── classNames.js      # Utility functions for generating Tailwind color classes
│   └── fonts.js           # Utility functions for generating typography classes
└── index.css              # CSS variables synced with config files
```

---

## Color Configuration

### Quick Start

**To change colors across the entire website, edit `src/config/colors.js`:**

```javascript
export const colors = {
  primary: {
    DEFAULT: '#1879a2',  // Change this to update primary color everywhere
    light: '#24bcee',
    // ... etc
  }
}
```

After updating `colors.js`, you also need to update the corresponding CSS variables in `src/index.css` to keep them in sync.

### Using Colors in Components

**Option 1: Using Utility Functions (Recommended)**

```javascript
import { bgColor, textColor, hoverBgColor, hoverTextColor, heroGradient } from '../utils/classNames'

// In your component:
<button className={`${bgColor('primary')} ${hoverBgColor('primary')} text-white`}>
  Click me
</button>

<section className={heroGradient()}>
  Hero content
</section>
```

**Option 2: Direct Import (for programmatic use)**

```javascript
import { colors } from '../config/colors'

// Use in inline styles or calculations
<div style={{ backgroundColor: colors.primary.DEFAULT }}>
  Content
</div>
```

## Available Color Keys

- `primary` - Main brand color (#1879a2)
- `primaryLight` - Lighter variant (#24bcee)
- `primaryMedium` - Medium variant (#35a0d9)
- `primaryDark` - Darker variant for hovers (#145e7d)
- `bgLight` - Light background (#e6f4f8)
- `bgLighter` - Lighter background (#cce9f1)
- `secondary` - Secondary color (#10b981)
- `whatsapp` - WhatsApp green (#25D366)
- `whatsappHover` - WhatsApp hover green (#20BA5A)

## Utility Functions

All utility functions are in `src/utils/classNames.js`:

- `bgColor(colorKey)` - Background color class
- `textColor(colorKey)` - Text color class
- `borderColor(colorKey)` - Border color class
- `hoverBgColor(colorKey)` - Hover background color class
- `hoverTextColor(colorKey)` - Hover text color class
- `heroGradient()` - Hero section gradient classes
- `focusRingColor(colorKey)` - Focus ring color class

## Migration Guide

To migrate existing components:

1. **Replace hardcoded colors:**
   ```javascript
   // Before
   className="bg-[#1879a2] hover:bg-[#145e7d]"
   
   // After
   className={`${bgColor('primary')} ${hoverBgColor('primary')}`}
   ```

2. **Replace gradients:**
   ```javascript
   // Before
   className="bg-gradient-to-r from-[#1879a2] to-[#145e7d]"
   
   // After
   className={heroGradient()}
   ```

3. **Replace text colors:**
   ```javascript
   // Before
   className="text-[#1879a2] hover:text-[#145e7d]"
   
   // After
   className={`${textColor('primary')} ${hoverTextColor('primary')}`}
   ```

## Best Practices

1. **Always use the utility functions** instead of hardcoding color values
2. **Update colors in `colors.js` only** - never hardcode hex values in components
3. **Keep CSS variables in sync** with `colors.js` (or automate this in the future)
4. **Use semantic color keys** (`primary`, `secondary`) instead of raw hex values
5. **Document custom colors** if you add new ones to the config

---

## Font Configuration

### Quick Start

**To change fonts across the entire website, edit `src/config/fonts.js`:**

```javascript
export const fonts = {
  primary: {
    name: 'Roboto',  // Change this to update font everywhere
    cssValue: '"Roboto", sans-serif',
    // ... etc
  }
}
```

After updating `fonts.js`, you also need to:
1. Update the Google Fonts link in `index.html` (if using web fonts)
2. Update CSS variables in `src/index.css`

### Using Fonts in Components

**Option 1: Using Utility Functions (Recommended)**

```javascript
import { headingClasses, bodyTextClasses, buttonTextClasses } from '../utils/fonts'

// In your component:
<h1 className={headingClasses('h1')}>
  Main Heading
</h1>

<p className={bodyTextClasses('base')}>
  Body text content
</p>

<button className={`${buttonTextClasses('base')} px-4 py-2`}>
  Click me
</button>
```

**Option 2: Direct Import (for programmatic use)**

```javascript
import { fonts, getFontFamily } from '../config/fonts'

// Use in inline styles
<div style={{ fontFamily: getFontFamily('primary') }}>
  Content
</div>
```

### Available Font Utilities

All utility functions are in `src/utils/fonts.js`:

- `fontFamilyStyle(type)` - Get font-family style object
- `fontWeightClass(weight)` - Font weight class (`font-light`, `font-bold`, etc.)
- `fontSizeClass(size)` - Font size class (`text-xs`, `text-lg`, etc.)
- `lineHeightClass(height)` - Line height class (`leading-tight`, `leading-normal`, etc.)
- `typographyClasses(options)` - Complete typography classes
- `headingClasses(level)` - Optimized classes for headings (h1-h6)
- `bodyTextClasses(size)` - Optimized classes for body text
- `buttonTextClasses(size)` - Optimized classes for button text

### Font Weights Available

- `light` - 300
- `normal` - 400 (default)
- `medium` - 500
- `semibold` - 600
- `bold` - 700
- `extrabold` - 800
- `black` - 900

### Font Sizes Available

- `xs` - 0.75rem (12px)
- `sm` - 0.875rem (14px)
- `base` - 1rem (16px) - default
- `lg` - 1.125rem (18px)
- `xl` - 1.25rem (20px)
- `2xl` - 1.5rem (24px)
- `3xl` - 1.875rem (30px)
- `4xl` - 2.25rem (36px)
- `5xl` - 3rem (48px)
- `6xl` - 3.75rem (60px)

### Migration Guide

To migrate existing components:

1. **Replace hardcoded font styles:**
   ```javascript
   // Before
   className="text-2xl font-bold"
   
   // After
   className={headingClasses('h2')}
   ```

2. **Use typography utilities:**
   ```javascript
   // Before
   className="text-base font-normal leading-relaxed"
   
   // After
   className={bodyTextClasses('base')}
   ```

### Best Practices

1. **Always use the utility functions** instead of hardcoding font values
2. **Update fonts in `fonts.js` only** - never hardcode font names in components
3. **Keep CSS variables in sync** with `fonts.js`
4. **Use semantic font keys** (`primary`, `secondary`, `mono`) instead of raw font names
5. **Use heading utilities** for headings instead of manual classes
6. **Document custom fonts** if you add new ones to the config

---

## Future Improvements

Consider automating the sync between config files and CSS using:
- A build script
- CSS-in-JS solution
- PostCSS plugin
- Tailwind plugin that reads from the JS config files

