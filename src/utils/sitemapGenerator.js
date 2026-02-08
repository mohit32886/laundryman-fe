/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml dynamically based on routes and content
 * 
 * Usage:
 * - Call generateSitemap() to get XML string
 * - Can be used in build process or API endpoint
 */

const baseUrl = 'https://laundryman.pro'

/**
 * Site routes configuration
 * Add new routes here to automatically include them in sitemap
 */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/b2b-services', priority: '0.7', changefreq: 'monthly' },
  { path: '/get-franchise', priority: '0.7', changefreq: 'monthly' },
  { path: '/store-locator', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.6', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  // Location pages
  { path: '/locations/doranda', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/harmu', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/hinoo', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/kantatoli', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/lalpur', priority: '0.8', changefreq: 'monthly' },
]

/**
 * Generate sitemap XML string
 * @param {Array} customRoutes - Optional array of custom routes to add
 * @returns {string} XML sitemap string
 */
export const generateSitemap = (customRoutes = []) => {
  const allRoutes = [...routes, ...customRoutes]
  const currentDate = new Date().toISOString().split('T')[0]

  const urlEntries = allRoutes.map(route => {
    const lastmod = route.lastmod || currentDate
    const priority = route.priority || '0.5'
    const changefreq = route.changefreq || 'monthly'

    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

/**
 * Generate sitemap and save to file (for build process)
 * @param {string} outputPath - Path to save sitemap.xml
 */
export const generateAndSaveSitemap = async (outputPath = 'public/sitemap.xml') => {
  if (typeof window !== 'undefined') {
    console.warn('generateAndSaveSitemap should be called in Node.js environment, not browser')
    return
  }

  const fs = await import('fs/promises')
  const path = await import('path')
  
  const sitemapXml = generateSitemap()
  const fullPath = path.resolve(outputPath)
  
  await fs.writeFile(fullPath, sitemapXml, 'utf-8')
  console.log(`✅ Sitemap generated: ${fullPath}`)
}

/**
 * Get sitemap as JSON (useful for API endpoints)
 * @returns {Array} Array of route objects
 */
export const getSitemapRoutes = () => {
  return routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    path: route.path,
    priority: route.priority,
    changefreq: route.changefreq,
    lastmod: route.lastmod || new Date().toISOString().split('T')[0]
  }))
}

export default generateSitemap
