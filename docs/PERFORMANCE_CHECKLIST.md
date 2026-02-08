# ⚡ Performance Checklist

**Project:** Laundryman.pro Mobile Optimization  
**Last Updated:** February 8, 2026  
**Purpose:** Ensure optimal performance on mobile devices

---

## 🎯 Core Web Vitals Targets

### Largest Contentful Paint (LCP)
- **Target:** < 2.5 seconds (Good)
- **Acceptable:** < 4.0 seconds (Needs Improvement)
- **Poor:** > 4.0 seconds

**Testing:**
- [ ] LCP < 2.5s on 4G connection
- [ ] LCP < 1.5s on WiFi
- [ ] Hero image loads quickly
- [ ] Main content visible within 2.5s

### First Input Delay (FID)
- **Target:** < 100ms (Good)
- **Acceptable:** < 300ms (Needs Improvement)
- **Poor:** > 300ms

**Testing:**
- [ ] Button clicks respond < 100ms
- [ ] Form inputs respond < 100ms
- [ ] Menu interactions are instant
- [ ] No blocking JavaScript

### Cumulative Layout Shift (CLS)
- **Target:** < 0.1 (Good)
- **Acceptable:** < 0.25 (Needs Improvement)
- **Poor:** > 0.25

**Testing:**
- [ ] No unexpected layout shifts
- [ ] Images have dimensions set
- [ ] Fonts load without FOIT/FOUT
- [ ] Ads/embeds don't cause shifts

---

## 📊 Lighthouse Scores

### Mobile Performance Score
- **Target:** > 90 (Good)
- **Acceptable:** 70-89 (Needs Improvement)
- **Poor:** < 70

**Testing:**
- [ ] Run Lighthouse audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Desktop Performance Score
- **Target:** > 95 (Good)
- **Acceptable:** 80-94 (Needs Improvement)
- **Poor:** < 80

---

## ⏱️ Load Time Targets

### Page Load Times
- **First Contentful Paint (FCP):** < 1.8s
- **Time to Interactive (TTI):** < 3.8s
- **Total Blocking Time (TBT):** < 200ms
- **Speed Index:** < 3.4s

**Testing:**
- [ ] FCP < 1.8s
- [ ] TTI < 3.8s
- [ ] TBT < 200ms
- [ ] Speed Index < 3.4s

### Network Conditions
- [ ] **4G:** Page loads < 3s
- [ ] **3G:** Page loads < 5s
- [ ] **Slow 3G:** Page loads < 8s
- [ ] **Offline:** Service worker works (if implemented)

---

## 🖼️ Image Optimization

### Image Formats
- [ ] **WebP** format used where supported
- [ ] **Fallback** formats (JPEG/PNG) provided
- [ ] **Lazy loading** implemented (`loading="lazy"`)
- [ ] **Responsive images** with srcset

### Image Sizes
- [ ] **Hero images:** < 200KB
- [ ] **Content images:** < 100KB
- [ ] **Thumbnails:** < 50KB
- [ ] **Icons:** < 10KB (SVG preferred)

### Image Dimensions
- [ ] **Width/height** attributes set (prevents CLS)
- [ ] **Aspect ratio** maintained
- [ ] **Responsive sizing** (max-width: 100%)

**Testing:**
- [ ] All images load efficiently
- [ ] No oversized images
- [ ] Images scale correctly on mobile
- [ ] Placeholder shown during load

---

## 📦 Code Optimization

### JavaScript
- [ ] **Code splitting** implemented
- [ ] **Tree shaking** enabled
- [ ] **Minification** enabled in production
- [ ] **Console logs** removed in production
- [ ] **Dead code** eliminated

### Bundle Sizes
- [ ] **Initial bundle:** < 200KB (gzipped)
- [ ] **Total JavaScript:** < 500KB (gzipped)
- [ ] **Vendor chunks** separated
- [ ] **Lazy loading** for routes

**Testing:**
- [ ] Run `npm run build`
- [ ] Check bundle sizes
- [ ] Verify code splitting
- [ ] No duplicate dependencies

### CSS
- [ ] **Unused CSS** removed
- [ ] **Critical CSS** inlined
- [ ] **CSS minification** enabled
- [ ] **Tailwind purging** configured

---

## 🚀 Caching & CDN

### Browser Caching
- [ ] **Static assets** cached (1 year)
- [ ] **HTML** cached (short duration)
- [ ] **Cache headers** configured
- [ ] **ETags** enabled

### CDN Configuration
- [ ] **CDN** configured (if applicable)
- [ ] **Gzip/Brotli** compression enabled
- [ ] **HTTP/2** enabled
- [ ] **Preconnect** to external domains

---

## 🔧 Build Optimizations

### Vite Configuration
- [ ] **Manual chunks** configured (react-vendor, animation-vendor)
- [ ] **Minification** enabled (esbuild/terser)
- [ ] **Source maps** disabled in production
- [ ] **Console removal** in production

**File:** `vite.config.js`
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'animation-vendor': ['framer-motion'],
      },
    },
  },
  minify: 'esbuild',
  esbuild: {
    drop: ['console', 'debugger'],
  },
}
```

### Production Build
- [ ] Run `npm run build`
- [ ] Check `dist/` folder
- [ ] Verify chunk sizes
- [ ] Test production build locally

---

## 📱 Mobile-Specific Optimizations

### Viewport Configuration
- [ ] **Viewport meta tag** correct
- [ ] **Initial scale** set to 1
- [ ] **User scalable** disabled (if needed)

### Touch Optimization
- [ ] **Touch-action** set on interactive elements
- [ ] **Tap highlight** configured
- [ ] **Double-tap zoom** disabled on buttons
- [ ] **Smooth scrolling** enabled

### Safe Area Insets
- [ ] **Safe area insets** implemented
- [ ] **Notched devices** supported
- [ ] **Bottom navigation** respects safe area

---

## 🎨 Font Optimization

### Font Loading
- [ ] **Font-display: swap** used
- [ ] **Preload** critical fonts
- [ ] **Subset fonts** (if possible)
- [ ] **WOFF2** format used

### Font Sizes
- [ ] **Base font size:** 16px (prevents iOS zoom)
- [ ] **Responsive typography** implemented
- [ ] **No layout shift** on font load

---

## 🔍 Monitoring & Analytics

### Performance Monitoring
- [ ] **Performance Monitor** initialized (dev mode)
- [ ] **Core Web Vitals** logged
- [ ] **Performance metrics** tracked
- [ ] **Real User Monitoring** configured (if applicable)

**File:** `src/utils/performanceMonitor.js`
- Auto-initializes in development
- Logs LCP, FID, CLS, TTFB, TBT
- Provides performance summary

### Analytics
- [ ] **Google Analytics** configured (if applicable)
- [ ] **Performance tracking** enabled
- [ ] **Error tracking** configured (if applicable)

---

## 🧪 Testing Tools

### Chrome DevTools
- [ ] **Performance tab** - Record and analyze
- [ ] **Lighthouse** - Run audit
- [ ] **Network tab** - Check load times
- [ ] **Coverage tab** - Find unused code

### Online Tools
- [ ] **PageSpeed Insights** - https://pagespeed.web.dev/
- [ ] **WebPageTest** - https://www.webpagetest.org/
- [ ] **GTmetrix** - https://gtmetrix.com/
- [ ] **Lighthouse CI** - Continuous monitoring

### Command Line
```bash
# Build and analyze
npm run build
npm run preview

# Lighthouse CLI
npx lighthouse https://laundryman.pro --view
```

---

## 📋 Performance Checklist by Page

### Home Page
- [ ] Hero section loads < 2s
- [ ] Images lazy load correctly
- [ ] Animations are smooth
- [ ] No layout shifts

### Services Page
- [ ] Service cards load efficiently
- [ ] Images optimized
- [ ] Smooth scrolling
- [ ] Fast navigation

### Contact Page
- [ ] Form loads quickly
- [ ] Form submission is fast
- [ ] No blocking scripts
- [ ] Error handling efficient

### Blog Page
- [ ] Blog posts lazy load
- [ ] Images optimized
- [ ] Infinite scroll works (if implemented)
- [ ] Fast filtering/search

---

## 🐛 Common Performance Issues

### Issues to Avoid
- [ ] **Large bundle sizes** - Use code splitting
- [ ] **Unoptimized images** - Compress and use WebP
- [ ] **Blocking JavaScript** - Defer non-critical scripts
- [ ] **Render-blocking CSS** - Inline critical CSS
- [ ] **Too many HTTP requests** - Combine files
- [ ] **No caching** - Configure cache headers
- [ ] **Large fonts** - Subset and optimize
- [ ] **Layout shifts** - Set image dimensions

### Debugging Tips
1. Use Chrome DevTools Performance tab
2. Check Network tab for slow requests
3. Use Lighthouse to identify issues
4. Monitor Core Web Vitals in production
5. Test on real devices, not just emulators

---

## ✅ Sign-Off Checklist

- [ ] Core Web Vitals meet targets
- [ ] Lighthouse score > 90
- [ ] Load times acceptable
- [ ] Images optimized
- [ ] Code optimized
- [ ] Caching configured
- [ ] Mobile optimizations implemented
- [ ] Performance monitoring set up
- [ ] Tested on real devices
- [ ] No critical performance issues

---

## 📊 Performance Metrics Log

### Initial Load
- **FCP:** _______ ms
- **LCP:** _______ ms
- **TTI:** _______ ms
- **TBT:** _______ ms
- **CLS:** _______

### Lighthouse Scores
- **Performance:** _______ / 100
- **Accessibility:** _______ / 100
- **Best Practices:** _______ / 100
- **SEO:** _______ / 100

### Bundle Sizes
- **Initial JS:** _______ KB (gzipped)
- **Total JS:** _______ KB (gzipped)
- **CSS:** _______ KB (gzipped)

---

**Last Tested:** _______________  
**Tested By:** _______________  
**Status:** ⬜ Pass ⬜ Fail ⬜ Needs Review

---

## 📚 Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
