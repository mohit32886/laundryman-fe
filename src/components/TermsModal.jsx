import { motion, AnimatePresence } from 'framer-motion'

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleClose = () => {
    onClose()
  }

  const termsContent = `TERMS AND CONDITIONS

Last Updated: January 2025

1. ACCEPTANCE OF TERMS
By accessing and using Laundryman's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.

2. SERVICE DESCRIPTION
Laundryman provides professional laundry, dry cleaning, and related cleaning services with pickup and delivery options. We reserve the right to modify or discontinue any service at any time without prior notice.

3. SERVICE AVAILABILITY
Our services are available in select areas as determined by Laundryman. We reserve the right to refuse service in certain locations or for certain items at our discretion.

4. PICKUP AND DELIVERY
- We provide scheduled pickup and delivery services
- Customers must ensure items are ready for pickup at the scheduled time
- We are not responsible for items left unattended during pickup or delivery
- Delivery times are estimates and not guaranteed
- Customers must be available to receive deliveries or provide secure drop-off instructions

5. PRICING AND PAYMENT
- All prices are subject to change without notice
- Payment is due upon delivery unless other arrangements are made
- We accept cash, credit cards, and digital payment methods
- Additional charges may apply for special requests or rush orders
- Refunds are subject to our refund policy

6. ITEM CONDITION AND LIABILITY
- Customers must disclose any existing damage, stains, or special care requirements
- We handle all items with care but are not responsible for items that are:
  * Already damaged or in poor condition
  * Improperly labeled or marked
  * Beyond normal wear and tear
  * Made of materials that cannot withstand cleaning processes
- Maximum liability is limited to 10 times the cleaning charge for the item
- We are not liable for sentimental value or consequential damages

7. STAIN REMOVAL AND DAMAGE
- While we use professional techniques, not all stains can be removed
- Some stains may be permanent despite our best efforts
- Customers assume risk for items with existing damage or delicate materials
- Items may be cleaned at customer's risk if no care label is present

8. LOST OR DAMAGED ITEMS
- We maintain records of all items received
- Lost items will be compensated according to our liability limits
- Damage claims must be reported within 48 hours of delivery
- We may request proof of purchase for high-value items

9. CANCELLATION AND REFUNDS
- Pickup orders can be cancelled before pickup time
- Cancellation fees may apply for same-day cancellations
- Refunds for unsatisfactory service will be evaluated on a case-by-case basis
- No refunds for completed services unless there is a service failure

10. CUSTOMER RESPONSIBILITIES
- Provide accurate contact information
- Ensure items are properly secured for pickup
- Be available for delivery or provide secure drop-off instructions
- Inspect items upon delivery and report issues immediately
- Follow care instructions provided with cleaned items

11. PROHIBITED ITEMS
We reserve the right to refuse cleaning of:
- Items containing hazardous materials
- Items with strong odors or contamination
- Items we determine are unsafe to clean
- Counterfeit or stolen items

12. PRIVACY POLICY
- We collect personal information necessary for service delivery
- Information is used solely for service purposes
- We do not share customer information with third parties except as required by law
- Full privacy policy available upon request

13. INTELLECTUAL PROPERTY
All content, logos, and materials on our website and app are property of Laundryman and protected by copyright laws.

14. LIMITATION OF LIABILITY
To the maximum extent permitted by law, Laundryman's liability is limited to the service charge paid. We are not liable for indirect, incidental, or consequential damages.

15. DISPUTE RESOLUTION
Any disputes will be resolved through:
- First, direct communication with our customer service team
- If unresolved, through mediation or arbitration as per applicable laws

16. MODIFICATIONS TO TERMS
We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.

17. GOVERNING LAW
These terms are governed by the laws of India and subject to the jurisdiction of Indian courts.

18. CONTACT INFORMATION
For questions about these terms, please contact us:
- Email: whitebasketpvtltd@gmail.com
- Phone: +91 9006463666
- Address: 01, Opp. Bharat Petroleum, Lalgutwa, Daladili Chowk, Ranchi, Jharkhand 835302

By using Laundryman's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                    Terms and Conditions
                  </h2>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed text-sm space-y-4">
                      {termsContent.split('\n\n').map((section, idx) => {
                        if (section.trim() === '') return null
                        if (section.match(/^\d+\./)) {
                          // Section with number
                          const parts = section.split('\n')
                          const title = parts[0]
                          const content = parts.slice(1).join('\n')
                          return (
                            <div key={idx} className="mb-6">
                              <h3 className="font-bold text-base mb-2 text-gray-900">{title}</h3>
                              <p className="text-gray-700 whitespace-pre-line">{content}</p>
                            </div>
                          )
                        }
                        return (
                          <p key={idx} className="text-gray-700 whitespace-pre-line">{section}</p>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

