import { Helmet } from 'react-helmet-async';

/**
 * MetaTags Component
 * Generates comprehensive meta tags for SEO, OpenGraph, and Twitter Cards
 * 
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} image - OpenGraph/Twitter image URL
 * @param {string} url - Canonical URL
 * @param {string} type - OpenGraph type (website, article, etc.)
 * @param {object} additionalTags - Additional meta tags as key-value pairs
 */
const MetaTags = ({ 
  title, 
  description, 
  image = 'https://laundryman.pro/laundryman2.png',
  url,
  type = 'website',
  additionalTags = {}
}) => {
  const baseUrl = 'https://laundryman.pro';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={additionalTags.keywords || 'laundry service, dry cleaning, Ranchi, laundry pickup, laundry delivery, eco-friendly cleaning'} />
      <meta name="author" content="Laundryman" />
      <meta name="robots" content={additionalTags.robots || 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Laundryman" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@laundryman" />

      {/* Additional Tags */}
      {Object.entries(additionalTags).map(([key, value]) => {
        // Skip already handled tags
        if (['keywords', 'robots'].includes(key)) return null;
        return <meta key={key} name={key} content={value} />;
      })}
    </Helmet>
  );
};

export default MetaTags;
