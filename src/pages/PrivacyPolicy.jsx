import { contactInfo } from '../config/contact'

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden theme-hero-bg text-white py-20 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🔒 Privacy & Data Protection
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Privacy <span className="theme-title-gradient">POLICY</span></h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">Laundryman.pro</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Effective Date:</strong> 22-01-2026
            </p>

            <p className="text-gray-700 mb-8">
              Laundryman ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, store and protect your personal information when you visit our website, use our services, or contact us through Facebook/Instagram/WhatsApp/phone.
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">We may collect the following information:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Name</li>
                <li>Phone number</li>
                <li>Address / pickup and delivery location</li>
                <li>Email (if provided)</li>
                <li>Order details (items, quantity, service type)</li>
                <li>Messages and communication history (WhatsApp/Instagram/Facebook)</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Confirm laundry pickup requests and delivery schedules</li>
                <li>Provide order updates, delivery status and customer support</li>
                <li>Improve service quality and response time</li>
                <li>Contact you regarding service-related issues</li>
                <li>Maintain business records and invoices</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing of Information</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your information only when necessary:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>With our delivery staff for pickup/delivery</li>
                <li>With service partners involved in the service (only if needed)</li>
                <li>If required by law or government authorities</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700">
                We take reasonable measures to protect your data from misuse, loss, unauthorized access, or disclosure.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700">
                We keep customer data only as long as necessary for service delivery, customer support, and business/legal requirements.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-700">
                Our website may use cookies for basic functionality and improved user experience.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">You can request:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access to your information</li>
                <li>Correction of incorrect information</li>
                <li>Deletion of your data (where applicable)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To request this, contact us using the details below.
              </p>
            </div>

            {/* Section 8 - Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 font-semibold mb-2">Laundryman / MY ONLINE SERVICES</p>
                <p className="text-gray-700 mb-2">Ranchi, Jharkhand, India</p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href={contactInfo.getTelUrl()} className={`${textColor('primary')} hover:underline`}>
                    {contactInfo.display.phone}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <a 
                    href="https://www.laundryman.pro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${textColor('primary')} hover:underline`}
                  >
                    https://www.laundryman.pro
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
