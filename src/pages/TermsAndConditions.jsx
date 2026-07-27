import { contactInfo } from '../config/contact'

export default function TermsAndConditions() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden theme-hero-bg text-white py-20 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 glass-panel-dark border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📜 Service Terms & Guidelines
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Terms & <span className="theme-title-gradient">CONDITIONS</span></h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">Laundryman.pro</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> January 2025
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Laundryman's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700">
                Laundryman provides professional laundry, dry cleaning, and related cleaning services with pickup and delivery options. We reserve the right to modify or discontinue any service at any time without prior notice.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Availability</h2>
              <p className="text-gray-700">
                Our services are available in select areas as determined by Laundryman. We reserve the right to refuse service in certain locations or for certain items at our discretion.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pickup and Delivery</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We provide scheduled pickup and delivery services</li>
                <li>Customers must ensure items are ready for pickup at the scheduled time</li>
                <li>We are not responsible for items left unattended during pickup or delivery</li>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Customers must be available to receive deliveries or provide secure drop-off instructions</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing and Payment</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>All prices are subject to change without notice</li>
                <li>Payment is due upon delivery unless other arrangements are made</li>
                <li>We accept cash, credit cards, and digital payment methods</li>
                <li>Additional charges may apply for special requests or rush orders</li>
                <li>Refunds are subject to our refund policy</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Item Condition and Liability</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Customers must disclose any existing damage, stains, or special care requirements</li>
                <li>We handle all items with care but are not responsible for items that are:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Already damaged or in poor condition</li>
                    <li>Improperly labeled or marked</li>
                    <li>Beyond normal wear and tear</li>
                    <li>Made of materials that cannot withstand cleaning processes</li>
                  </ul>
                </li>
                <li>Maximum liability is limited to 10 times the cleaning charge for the item</li>
                <li>We are not liable for sentimental value or consequential damages</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Stain Removal and Damage</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>While we use professional techniques, not all stains can be removed</li>
                <li>Some stains may be permanent despite our best efforts</li>
                <li>Customers assume risk for items with existing damage or delicate materials</li>
                <li>Items may be cleaned at customer's risk if no care label is present</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Lost or Damaged Items</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We maintain records of all items received</li>
                <li>Lost items will be compensated according to our liability limits</li>
                <li>Damage claims must be reported within 48 hours of delivery</li>
                <li>We may request proof of purchase for high-value items</li>
              </ul>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cancellation and Refunds</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Pickup orders can be cancelled before pickup time</li>
                <li>Cancellation fees may apply for same-day cancellations</li>
                <li>Refunds for unsatisfactory service will be evaluated on a case-by-case basis</li>
                <li>No refunds for completed services unless there is a service failure</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Customer Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate contact information</li>
                <li>Ensure items are properly secured for pickup</li>
                <li>Be available for delivery or provide secure drop-off instructions</li>
                <li>Inspect items upon delivery and report issues immediately</li>
                <li>Follow care instructions provided with cleaned items</li>
              </ul>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Prohibited Items</h2>
              <p className="text-gray-700 mb-4">We reserve the right to refuse cleaning of:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Items containing hazardous materials</li>
                <li>Items with strong odors or contamination</li>
                <li>Items we determine are unsafe to clean</li>
                <li>Counterfeit or stolen items</li>
              </ul>
            </div>

            {/* Section 12 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Privacy Policy</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We collect personal information necessary for service delivery</li>
                <li>Information is used solely for service purposes</li>
                <li>We do not share customer information with third parties except as required by law</li>
                <li>Full privacy policy available upon request</li>
              </ul>
            </div>

            {/* Section 13 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Intellectual Property</h2>
              <p className="text-gray-700">
                All content, logos, and materials on our website and app are property of Laundryman and protected by copyright laws.
              </p>
            </div>

            {/* Section 14 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Laundryman's liability is limited to the service charge paid. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* Section 15 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">Any disputes will be resolved through:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>First, direct communication with our customer service team</li>
                <li>If unresolved, through mediation or arbitration as per applicable laws</li>
              </ul>
            </div>

            {/* Section 16 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </div>

            {/* Section 17 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India and subject to the jurisdiction of Indian courts.
              </p>
            </div>

            {/* Section 18 - Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
              <p className="text-gray-700 mb-4">For questions about these terms, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 font-semibold mb-2">Laundryman / MY ONLINE SERVICES</p>
                <p className="text-gray-700 mb-2">01, Opp. Bharat Petroleum, Lalgutwa, Daladili Chowk, Ranchi, Jharkhand 835302</p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href={contactInfo.getTelUrl()} className="text-[#1879a2] hover:text-[#145e7d]">
                    {contactInfo.display.phone}
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:whitebasketpvtltd@gmail.com" className="text-[#1879a2] hover:text-[#145e7d]">
                    whitebasketpvtltd@gmail.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <a 
                    href="https://www.laundryman.pro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1879a2] hover:text-[#145e7d]"
                  >
                    https://www.laundryman.pro
                  </a>
                </p>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="mt-8 p-6 bg-[#1879a2]/10 rounded-lg">
              <p className="text-gray-700 font-medium">
                By using Laundryman's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
