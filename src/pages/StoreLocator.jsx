export default function StoreLocator() {
  const cities = [
    'Delhi', 'Ahmedabad', 'Bangalore', 'Chennai', 'Hyderabad', 'Mumbai',
    'Pune', 'Kolkata', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1879a2] to-[#145e7d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Store Locator</h1>
          <p className="text-xl mb-6">FIND A LAUNDRYMAN STORE NEAR YOU</p>
          <p className="text-lg">EXPERIENCE OUR PREMIUM SERVICES</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1879a2]"
                />
              </div>

              {/* Popular Cities */}
              <div>
                <h3 className="font-semibold mb-4">Popular Cities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cities.map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => alert(`Searching stores in ${city}... Store filtering coming soon!`)}
                      className="bg-[#e6f4f8] hover:bg-[#cce9f1] text-[#1879a2] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">Multiple Locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Stores Near You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Laundryman Store - Connaught Place', address: '123, Connaught Place, New Delhi', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Bandra', address: '456, Bandra West, Mumbai', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Koramangala', address: '789, Koramangala, Bangalore', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - Jubilee Hills', address: '321, Jubilee Hills, Hyderabad', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - T Nagar', address: '654, T Nagar, Chennai', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
              { name: 'Laundryman Store - SG Highway', address: '987, SG Highway, Ahmedabad', phone: '+91 9006463666', hours: 'Mon-Sun: 9 AM - 8 PM' },
            ].map((store, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-[#1879a2]">{store.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{store.hours}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Getting directions to ${store.name}. Google Maps integration coming soon!`)}
                  className="mt-4 w-full bg-[#1879a2] text-white py-2 rounded-lg hover:bg-[#145e7d] transition-colors"
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
  )
}

