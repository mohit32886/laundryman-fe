/**
 * Performance Monitor Utility
 * Monitors Core Web Vitals (LCP, FID, CLS) in development mode
 * 
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s (good)
 * - FID (First Input Delay): < 100ms (good)
 * - CLS (Cumulative Layout Shift): < 0.1 (good)
 */

let isMonitoring = false

/**
 * Initialize performance monitoring
 * Only runs in development mode
 */
export const initPerformanceMonitor = () => {
  // Only monitor in development
  if (import.meta.env.PROD) {
    return
  }

  if (isMonitoring) {
    console.warn('Performance monitor already initialized')
    return
  }

  isMonitoring = true

  // Check if PerformanceObserver is supported
  if (typeof PerformanceObserver === 'undefined') {
    console.warn('PerformanceObserver not supported in this browser')
    return
  }

  console.log('🔍 Performance Monitor: Initialized')

  // Monitor Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      
      const lcp = lastEntry.renderTime || lastEntry.loadTime
      const lcpValue = Math.round(lcp)
      
      console.log(`📊 LCP (Largest Contentful Paint): ${lcpValue}ms`, {
        element: lastEntry.element?.tagName,
        url: lastEntry.url,
        size: lastEntry.size,
        rating: lcpValue < 2500 ? '✅ Good' : lcpValue < 4000 ? '⚠️ Needs Improvement' : '❌ Poor'
      })
    })

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  } catch (e) {
    console.warn('LCP monitoring not supported:', e)
  }

  // Monitor First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fid = Math.round(entry.processingStart - entry.startTime)
        
        console.log(`⚡ FID (First Input Delay): ${fid}ms`, {
          eventType: entry.name,
          target: entry.target?.tagName,
          rating: fid < 100 ? '✅ Good' : fid < 300 ? '⚠️ Needs Improvement' : '❌ Poor'
        })
      })
    })

    fidObserver.observe({ entryTypes: ['first-input'] })
  } catch (e) {
    console.warn('FID monitoring not supported:', e)
  }

  // Monitor Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0
    let clsEntries = []

    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push({
            value: entry.value,
            sources: entry.sources?.map(s => ({
              node: s.node?.tagName,
              previousRect: s.previousRect,
              currentRect: s.currentRect
            }))
          })
        }
      })

      // Log CLS periodically
      if (clsEntries.length > 0) {
        console.log(`📐 CLS (Cumulative Layout Shift): ${clsValue.toFixed(4)}`, {
          shifts: clsEntries.length,
          rating: clsValue < 0.1 ? '✅ Good' : clsValue < 0.25 ? '⚠️ Needs Improvement' : '❌ Poor',
          entries: clsEntries
        })
      }
    })

    clsObserver.observe({ entryTypes: ['layout-shift'] })
  } catch (e) {
    console.warn('CLS monitoring not supported:', e)
  }

  // Monitor Time to First Byte (TTFB)
  try {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        const ttfb = Math.round(navigation.responseStart - navigation.requestStart)
        
        console.log(`🌐 TTFB (Time to First Byte): ${ttfb}ms`, {
          rating: ttfb < 800 ? '✅ Good' : ttfb < 1800 ? '⚠️ Needs Improvement' : '❌ Poor'
        })
      }
    })
  } catch (e) {
    console.warn('TTFB monitoring error:', e)
  }

  // Monitor Total Blocking Time (TBT)
  try {
    window.addEventListener('load', () => {
      const longTasks = performance.getEntriesByType('long-task') || []
      let tbt = 0
      
      longTasks.forEach((task) => {
        // Tasks longer than 50ms contribute to TBT
        const blockingTime = task.duration - 50
        if (blockingTime > 0) {
          tbt += blockingTime
        }
      })

      console.log(`⏱️ TBT (Total Blocking Time): ${Math.round(tbt)}ms`, {
        longTasks: longTasks.length,
        rating: tbt < 200 ? '✅ Good' : tbt < 600 ? '⚠️ Needs Improvement' : '❌ Poor'
      })
    })
  } catch (e) {
    console.warn('TBT monitoring error:', e)
  }
}

/**
 * Get performance metrics summary
 */
export const getPerformanceMetrics = () => {
  if (typeof performance === 'undefined') {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0]
  if (!navigation) {
    return null
  }

  return {
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    ttfb: Math.round(navigation.responseStart - navigation.requestStart),
    download: Math.round(navigation.responseEnd - navigation.responseStart),
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
    load: Math.round(navigation.loadEventEnd - navigation.navigationStart),
  }
}

/**
 * Log performance metrics summary
 */
export const logPerformanceSummary = () => {
  const metrics = getPerformanceMetrics()
  if (!metrics) {
    console.warn('Performance metrics not available')
    return
  }

  console.group('📊 Performance Summary')
  console.table(metrics)
  console.groupEnd()
}

// Auto-initialize in development
if (import.meta.env.DEV) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceMonitor)
  } else {
    initPerformanceMonitor()
  }

  // Log summary on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      logPerformanceSummary()
    }, 1000)
  })
}
