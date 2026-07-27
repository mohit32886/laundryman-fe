import MetaTags from '../components/SEO/MetaTags'
import SchemaMarkup from '../components/SEO/SchemaMarkup'
import Breadcrumb from '../components/Breadcrumb'

export default function StoreLocator() {
  const cities = [
    'Delhi', 'Ahmedabad', 'Bangalore', 'Chennai', 'Hyderabad', 'Mumbai',
    'Pune', 'Kolkata', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ]

  return (
    <>
      <MetaTags
        title="Store Locator - Find Laundryman Locations in Ranchi"
        description="Find Laundryman stores near you in Ranchi. Locations in Harmu, Hinoo, Doranda, Lalpur, Kantatoli and more areas. Free pickup and delivery available."
        url="/store-locator"
        keywords="Laundryman store locations Ranchi, laundry service near me, dry cleaning locations Ranchi, find Laundryman store"
      />
      <SchemaMarkup
        type="localBusiness"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Store Locator', path: '/store-locator' }
          ]
        }}
      />
      <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden theme-hero-bg text-white py-20 md:py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📍 Store & Workshop Locations in Ranchi
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Store <span className="theme-title-gradient">LOCATOR</span></h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">Find a Laundryman store or workshop near you in Ranchi</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Locate a Store</h2>
              
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search by city or location..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Popular Cities */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Popular Cities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cities.map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => alert(`Searching stores in ${city}... Store filtering coming soon!`)}
                      className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200/80 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm font-light">Multiple Locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-slate-900">Find Stores Near You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Laundryman Store - Connaught Place', address: '123, Connaught Place, New Delhi', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Bandra', address: '456, Bandra West, Mumbai', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Koramangala', address: '789, Koramangala, Bangalore', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Jubilee Hills', address: '321, Jubilee Hills, Hyderabad', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - T Nagar', address: '654, T Nagar, Chennai', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - SG Highway', address: '987, SG Highway, Ahmedabad', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
            ].map((store, idx) => (
              <div key={idx} className="glass-card border border-slate-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold mb-3 text-slate-900">{store.name}</h3>
                <div className="space-y-2 text-slate-600 text-sm font-light">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-cyan-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{store.hours}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Getting directions to ${store.name}. Google Maps integration coming soon!`)}
                  className="mt-4 w-full theme-cta-btn text-white py-2.5 rounded-xl font-bold shadow-md transition-all"
                >
                  Get Directions
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't find a store near you?</p>
            <button 
              onClick={() => alert('Store request submitted! We will contact you soon.')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Request Store in Your Area
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

