import { Helmet } from 'react-helmet-async';

/**
 * SchemaMarkup Component
 * Generates JSON-LD structured data for SEO
 * 
 * @param {string} type - Schema type: 'website', 'localBusiness', 'service', 'faq'
 * @param {object} pageData - Page-specific data for schema generation
 */
const SchemaMarkup = ({ type = 'website', pageData = {} }) => {
  const baseUrl = 'https://laundryman.pro';

  // LocalBusiness Schema (default for most pages)
  // Use pageData.coordinates if provided (for location-specific pages), otherwise use default
  const defaultCoordinates = { latitude: '23.3441', longitude: '85.3096' }
  const coordinates = pageData.coordinates || defaultCoordinates
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'DryCleaningOrLaundry'],
    name: 'Laundryman',
    url: baseUrl,
    telephone: '+91-9006463666',
    address: {
      '@type': 'PostalAddress',
      streetAddress: pageData.address?.streetAddress || '01, Opp. Bharat Petroleum, Lalgutwa',
      addressLocality: pageData.address?.addressLocality || 'Ranchi',
      addressRegion: pageData.address?.addressRegion || 'Jharkhand',
      postalCode: pageData.address?.postalCode || '835302',
      addressCountry: pageData.address?.addressCountry || 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2400'
    },
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      }
    ],
    image: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.facebook.com/laundryman',
      'https://www.instagram.com/laundryman'
    ]
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Laundryman',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Laundryman',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9006463666',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi']
    },
    sameAs: [
      'https://www.facebook.com/laundryman',
      'https://www.instagram.com/laundryman'
    ]
  };

  // FAQ Schema
  const faqSchema = pageData.faqs && pageData.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  // Service Schema
  const serviceSchema = pageData.service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: pageData.service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Laundryman'
    },
    areaServed: {
      '@type': 'City',
      name: 'Ranchi'
    },
    description: pageData.service.description
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = pageData.breadcrumbs && pageData.breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pageData.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`
    }))
  } : null;

  // Determine which schemas to render
  const schemas = [];

  // Always include Organization schema
  schemas.push(organizationSchema);

  // Add schema based on type
  switch (type) {
    case 'localBusiness':
      schemas.push(localBusinessSchema);
      break;
    case 'website':
      schemas.push(websiteSchema);
      schemas.push(localBusinessSchema);
      break;
    case 'service':
      if (serviceSchema) schemas.push(serviceSchema);
      schemas.push(localBusinessSchema);
      break;
    case 'faq':
      if (faqSchema) schemas.push(faqSchema);
      schemas.push(localBusinessSchema);
      break;
    default:
      schemas.push(localBusinessSchema);
  }

  // Add optional schemas
  if (faqSchema) schemas.push(faqSchema);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SchemaMarkup;
