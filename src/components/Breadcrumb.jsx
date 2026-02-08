import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Breadcrumb Component
 * Displays navigation breadcrumbs and generates breadcrumb schema markup
 * 
 * @param {Array} items - Array of breadcrumb items: [{ name: string, path: string }]
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  const baseUrl = 'https://laundryman.pro';

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index < items.length - 1 ? (
                <>
                  <Link 
                    to={item.path}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                </>
              ) : (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
