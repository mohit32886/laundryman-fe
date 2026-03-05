import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { headingClasses, bodyTextClasses } from '../utils/fonts'
import { bgColor, textColor, borderColor, accentColor } from '../utils/classNames'
import Button from '../components/ui/Button'
import MetaTags from '../components/SEO/MetaTags'
import SchemaMarkup from '../components/SEO/SchemaMarkup'
import { submitPickupForm } from '../services/googleSheetsService'
import { createOrderInDashboard } from '../services/orderManagementService'
import { formStateManager } from '../utils/formStateManager'
import ResumeBookingPrompt from '../components/ResumeBookingPrompt'

const SUCCESS_MESSAGE_DURATION = 4000
const ERROR_MESSAGE_DURATION = 3000
const MAX_NAME_LENGTH = 100
const MAX_ADDRESS_LENGTH = 500
const PHONE_REGEX = /^[6-9]\d{9}$/

const CATEGORY_CONFIG = {
  upper_body: { label: 'Upper Body', icon: '👔' },
  lower_body: { label: 'Lower Body', icon: '👖' },
  others:     { label: 'Ethnic & More', icon: '👗' },
  household:  { label: 'Household', icon: '🏠' },
}
const SHOW_CATEGORIES = ['upper_body', 'lower_body', 'others', 'household']

const EXCLUDE_IDS = new Set([
  'prepaid_discount', 'top_up_ewallet', 'due_amount',
  'seasonal_offer', 'same_day_delivery',
])

const STATIC_PRODUCTS = [
  { productId: 'shirt',            name: 'Shirt',              category: 'upper_body', basePrice: 149 },
  { productId: 'blouse',           name: 'Blouse',             category: 'upper_body', basePrice: 80  },
  { productId: 'jacket',           name: 'Jacket',             category: 'upper_body', basePrice: 200 },
  { productId: 'blazer_coat',      name: 'Blazer / Coat',      category: 'upper_body', basePrice: 250 },
  { productId: 'sweater_cardigan', name: 'Sweater / Cardigan', category: 'upper_body', basePrice: 150 },
  { productId: 'shawl',            name: 'Shawl',              category: 'upper_body', basePrice: 120 },
  { productId: 'pant',             name: 'Pant',               category: 'lower_body', basePrice: 120 },
  { productId: 'jeans',            name: 'Jeans',              category: 'lower_body', basePrice: 130 },
  { productId: 'skirt',            name: 'Skirt',              category: 'lower_body', basePrice: 100 },
  { productId: 'tie',              name: 'Tie',                category: 'lower_body', basePrice: 50  },
  { productId: 'saree',            name: 'Saree',              category: 'others',     basePrice: 180 },
  { productId: 'salwar_suit',      name: 'Salwar Suit',        category: 'others',     basePrice: 200 },
  { productId: 'kurta',            name: 'Kurta',              category: 'others',     basePrice: 140 },
  { productId: 'kurti',            name: 'Kurti',              category: 'others',     basePrice: 130 },
  { productId: 'lehenga',          name: 'Lehenga',            category: 'others',     basePrice: 300 },
  { productId: 'sherwani',         name: 'Sherwani',           category: 'others',     basePrice: 350 },
  { productId: 'shoes',            name: 'Shoes',              category: 'others',     basePrice: 180 },
  { productId: 'bedsheet',         name: 'Bedsheet',           category: 'household',  basePrice: 80  },
  { productId: 'blanket',          name: 'Blanket',            category: 'household',  basePrice: 120 },
  { productId: 'quilt',            name: 'Quilt',              category: 'household',  basePrice: 150 },
  { productId: 'bath_towel',       name: 'Bath Towel',         category: 'household',  basePrice: 40  },
  { productId: 'curtain',          name: 'Curtain',            category: 'household',  basePrice: 50  },
  { productId: 'carpet_per_sqft',  name: 'Carpet (per sq ft)', category: 'household',  basePrice: 29  },
]

const TIME_SLOTS = [
  { id: 'today-evening',      label: 'Today Evening',       sublabel: '6–8 PM'    },
  { id: 'tomorrow-morning',   label: 'Tomorrow Morning',    sublabel: '9–11 AM'   },
  { id: 'tomorrow-afternoon', label: 'Tomorrow Afternoon',  sublabel: '2–4 PM'    },
  { id: 'custom',             label: 'Choose Custom',       sublabel: '→'         },
]

const getPickupDate = (slotId) => {
  const today = new Date()
  if (slotId === 'today-evening') return today.toISOString().split('T')[0]
  today.setDate(today.getDate() + 1)
  return today.toISOString().split('T')[0]
}

const getPickupTimeSlot = (slotId) => ({
  'today-evening': '6pm-8pm',
  'tomorrow-morning': '9am-11am',
  'tomorrow-afternoon': '2pm-4pm',
  'custom': '',
}[slotId] || '')

const SchedulePickup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('upper_body')

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', pickupTime: '' })

  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const [savedFormData, setSavedFormData] = useState(null)
  const [savedCart, setSavedCart] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [ticketNumber, setTicketNumber] = useState(null)

  // Fetch products on mount
  useEffect(() => {
    setProductsLoading(true)
    const apiUrl = import.meta.env.VITE_ORDER_API_URL
    if (!apiUrl) {
      setProducts(STATIC_PRODUCTS)
      setProductsLoading(false)
      return
    }
    fetch(`${apiUrl}/api/products`)
      .then(r => r.json())
      .then(json => {
        if (json.success && json.data?.length > 0) {
          const filtered = json.data.filter(
            p => p.isActive && p.basePrice > 0
              && SHOW_CATEGORIES.includes(p.category)
              && !EXCLUDE_IDS.has(p.productId)
          )
          setProducts(filtered.length > 0 ? filtered : STATIC_PRODUCTS)
        } else {
          setProducts(STATIC_PRODUCTS)
        }
      })
      .catch(() => setProducts(STATIC_PRODUCTS))
      .finally(() => setProductsLoading(false))
  }, [])

  // Resume prompt
  useEffect(() => {
    const saved = formStateManager.load()
    if (saved?.cart && Object.keys(saved.cart).length > 0) {
      setSavedFormData(saved.formData || {})
      setSavedCart(saved.cart)
      setShowResumePrompt(true)
    }
  }, [])

  // Persist draft
  useEffect(() => {
    if (Object.keys(cart).length > 0 || formData.name) {
      formStateManager.save({ formData, cart })
    }
  }, [formData, cart])

  const getCartItems = () =>
    Object.entries(cart)
      .filter(([, v]) => v.quantity > 0)
      .map(([id, v]) => ({ productId: id, name: v.name, price: v.price, quantity: v.quantity }))

  const cartTotal = () => getCartItems().reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = () => getCartItems().reduce((sum, i) => sum + i.quantity, 0)

  const addItem = (product) =>
    setCart(prev => ({
      ...prev,
      [product.productId]: {
        name: product.name,
        price: product.basePrice,
        quantity: (prev[product.productId]?.quantity || 0) + 1,
      },
    }))

  const removeItem = (product) =>
    setCart(prev => {
      const qty = (prev[product.productId]?.quantity || 0) - 1
      if (qty <= 0) {
        const { [product.productId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [product.productId]: { ...prev[product.productId], quantity: qty } }
    })

  const productsByCategory = SHOW_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat)
    return acc
  }, {})

  const handleResumeBooking = () => {
    setFormData(savedFormData || {})
    setCart(savedCart || {})
    setShowResumePrompt(false)
  }

  const handleStartFresh = () => {
    formStateManager.clear()
    setShowResumePrompt(false)
    setCart({})
    setFormData({ name: '', phone: '', address: '', pickupTime: '' })
  }

  const resetAll = () => {
    setCart({})
    setFormData({ name: '', phone: '', address: '', pickupTime: '' })
    formStateManager.clear()
  }

  const handleSubmit = async () => {
    setErrorMessage('')

    if (!formData.name.trim()) {
      setSubmitStatus('error'); setErrorMessage('Please enter your name')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }
    if (formData.name.trim().length > MAX_NAME_LENGTH) {
      setSubmitStatus('error'); setErrorMessage(`Name must be under ${MAX_NAME_LENGTH} characters`)
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!PHONE_REGEX.test(cleanPhone)) {
      setSubmitStatus('error'); setErrorMessage('Enter a valid 10-digit mobile number (starting 6–9)')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }
    if (!formData.address.trim()) {
      setSubmitStatus('error'); setErrorMessage('Please enter your pickup address')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }
    if (formData.address.trim().length > MAX_ADDRESS_LENGTH) {
      setSubmitStatus('error'); setErrorMessage(`Address must be under ${MAX_ADDRESS_LENGTH} characters`)
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }
    if (!formData.pickupTime) {
      setSubmitStatus('error'); setErrorMessage('Please select a pickup time')
      setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION); return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    const cartItems = getCartItems()
    const pickupData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      pickupDate: getPickupDate(formData.pickupTime),
      pickupTime: getPickupTimeSlot(formData.pickupTime),
      serviceType: 'mixed',
      items: cartItems,
      message: `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} — Website Booking`,
    }

    try {
      const result = await createOrderInDashboard(pickupData)
      setTicketNumber(result.ticketNumber)
      submitPickupForm(pickupData).catch(err => console.error('Sheets backup:', err))
      setSubmitStatus('success')
      resetAll()
      setTimeout(() => navigate('/'), SUCCESS_MESSAGE_DURATION)
    } catch (dashboardError) {
      console.error('Dashboard order failed, falling back to Sheets:', dashboardError)
      try {
        await submitPickupForm(pickupData)
        setSubmitStatus('success')
        resetAll()
        setTimeout(() => navigate('/'), SUCCESS_MESSAGE_DURATION)
      } catch (err) {
        console.error('Booking failed:', err)
        setSubmitStatus('error')
        setErrorMessage('Failed to submit booking. Please try again or contact us directly.')
        setTimeout(() => setSubmitStatus(null), ERROR_MESSAGE_DURATION)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <MetaTags
        title="Schedule Laundry Pickup in Ranchi | Laundryman"
        description="Book a free laundry pickup in Ranchi. Select your items, choose a convenient time slot, and we'll come to your door. Premium dry cleaning & laundry service."
        url="/schedule-pickup"
        keywords="laundry pickup Ranchi, schedule pickup laundry Ranchi, dry cleaning pickup Ranchi, home laundry pickup Ranchi"
      />
      <SchemaMarkup
        type="localBusiness"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Schedule Pickup', path: '/schedule-pickup' }
          ]
        }}
      />

      {/* Hero */}
      <section className={`${bgColor('primary')} text-white py-16`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className={headingClasses('h1')}>Schedule a Pickup</h1>
          <p className={`${bodyTextClasses('lg')} mt-4 opacity-90`}>
            Select your items, pick a time slot — we'll handle the rest
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 mt-6">
            <span className={`${bodyTextClasses()} font-bold`}>🎉 20% Off on 1st Order — Code: FIRST20</span>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Progress bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${textColor('secondary')}`}>
                Step {currentStep} of 3 —{' '}
                {currentStep === 1 ? 'Add Items' : currentStep === 2 ? 'Pickup Details' : 'Confirm'}
              </span>
              <button
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
              >
                ← Back to site
              </button>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`${bgColor('primary')} h-full rounded-full`}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <AnimatePresence mode="wait">

              {/* STEP 1: Cart */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="px-6 pt-6 pb-3">
                    <h2 className={`${headingClasses('h2')} text-xl`}>What are you sending?</h2>
                    <p className={`text-sm ${textColor('secondary')} mt-1`}>
                      Tap items to add them to your cart
                    </p>
                  </div>

                  {/* Category tabs */}
                  <div className="px-6 flex gap-2 overflow-x-auto pb-3">
                    {SHOW_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                          activeCategory === cat
                            ? `${bgColor('primary')} text-white border-transparent`
                            : `bg-white ${textColor('secondary')} border-gray-200 hover:border-gray-400`
                        }`}
                      >
                        {CATEGORY_CONFIG[cat].icon} {CATEGORY_CONFIG[cat].label}
                      </button>
                    ))}
                  </div>

                  {/* Product rows */}
                  <div className="px-6 pb-4">
                    {productsLoading ? (
                      <div className="py-12 text-center">
                        <div className="w-7 h-7 border-2 border-gray-200 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className={`text-sm ${textColor('secondary')}`}>Loading items…</p>
                      </div>
                    ) : productsByCategory[activeCategory]?.length === 0 ? (
                      <p className={`text-sm ${textColor('secondary')} text-center py-10`}>No items in this category</p>
                    ) : (
                      <div className="space-y-0.5">
                        {productsByCategory[activeCategory]?.map(product => {
                          const qty = cart[product.productId]?.quantity || 0
                          return (
                            <div
                              key={product.productId}
                              className={`flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${qty > 0 ? 'bg-blue-50/70' : 'hover:bg-gray-50'}`}
                            >
                              <div className="flex-1 min-w-0 mr-4">
                                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                                <p className={`text-xs ${textColor('secondary')}`}>₹{product.basePrice}/pc</p>
                              </div>
                              {qty > 0 ? (
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <button
                                    onClick={() => removeItem(product)}
                                    className={`w-7 h-7 rounded-full border ${borderColor('primary')} ${textColor('primary')} flex items-center justify-center text-base leading-none font-bold hover:bg-blue-50 transition-colors`}
                                  >−</button>
                                  <span className={`w-5 text-center text-sm font-bold ${textColor('primary')}`}>{qty}</span>
                                  <button
                                    onClick={() => addItem(product)}
                                    className={`w-7 h-7 rounded-full ${bgColor('primary')} text-white flex items-center justify-center text-base leading-none font-bold hover:opacity-90 transition-opacity`}
                                  >+</button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => addItem(product)}
                                  className={`px-3 py-1 rounded-full border ${borderColor('primary')} ${textColor('primary')} text-xs font-semibold hover:bg-blue-50 transition-colors flex-shrink-0`}
                                >Add</button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Cart bar */}
                  <div className="border-t border-gray-100 px-6 py-4 rounded-b-2xl">
                    {cartCount() > 0 ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`font-bold text-sm ${textColor('primary')}`}>
                            {cartCount()} item{cartCount() !== 1 ? 's' : ''}
                          </span>
                          <span className="text-gray-500 text-sm ml-1.5">· ₹{cartTotal().toLocaleString('en-IN')}</span>
                        </div>
                        <Button variant="primary" onClick={() => setCurrentStep(2)}>
                          Continue →
                        </Button>
                      </div>
                    ) : (
                      <p className={`text-sm ${textColor('secondary')} text-center`}>
                        Add at least one item to continue
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Pickup details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6"
                >
                  <h2 className={`${headingClasses('h2')} text-xl mb-0.5`}>Pickup Details</h2>
                  <p className={`text-sm ${textColor('secondary')} mb-6`}>
                    {cartCount()} item{cartCount() !== 1 ? 's' : ''} · ₹{cartTotal().toLocaleString('en-IN')} estimated
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:${borderColor('primary')} text-sm transition-colors`}
                        placeholder="Enter your name"
                        maxLength={MAX_NAME_LENGTH}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:${borderColor('primary')} text-sm transition-colors`}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Pickup Address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:${borderColor('primary')} text-sm transition-colors`}
                        placeholder="Your full address in Ranchi"
                        maxLength={MAX_ADDRESS_LENGTH}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Pickup Time</label>
                      <div className="grid grid-cols-2 gap-3">
                        {TIME_SLOTS.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => setFormData({ ...formData, pickupTime: slot.id })}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              formData.pickupTime === slot.id
                                ? `${borderColor('primary')} bg-blue-50/60`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-800">{slot.label}</div>
                            <div className={`text-xs ${textColor('secondary')}`}>{slot.sublabel}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">← Back</Button>
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1"
                      disabled={!formData.name || !formData.phone || !formData.address || !formData.pickupTime}
                    >
                      Review Order →
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6"
                >
                  <h2 className={`${headingClasses('h2')} text-xl mb-5`}>Confirm Booking</h2>

                  {/* Order summary */}
                  <div className="bg-gray-50 rounded-xl p-5 mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-3">Order Summary</p>
                    <div className="space-y-2">
                      {getCartItems().map(item => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                          <span className="font-medium text-gray-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`flex justify-between font-bold text-sm mt-3 pt-3 border-t border-gray-200 ${textColor('primary')}`}>
                      <span>Estimated Total</span>
                      <span>₹{cartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">* Final price confirmed after pickup & inspection</p>
                  </div>

                  {/* Pickup info */}
                  <div className="bg-gray-50 rounded-xl p-5 mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pickup slot</span>
                      <span className="font-medium">{TIME_SLOTS.find(t => t.id === formData.pickupTime)?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Address</span>
                      <span className="font-medium text-right max-w-[55%] leading-snug">{formData.address}</span>
                    </div>
                  </div>

                  {/* Offer */}
                  <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
                    <p className="text-sm font-bold text-orange-600">🎉 20% off on your first order!</p>
                  </div>

                  {/* Status messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm mb-4">
                      ✓ Booking confirmed!{ticketNumber ? ` Ticket: ${ticketNumber}` : " We'll contact you shortly."}
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                      ✗ {errorMessage || 'Please try again.'}
                    </div>
                  )}

                  <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input type="checkbox" required className={`mt-0.5 w-4 h-4 ${accentColor('primary')}`} />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/terms-and-conditions" className={`${textColor('primary')} underline`}>terms & conditions</a>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">← Back</Button>
                    <Button variant="success" onClick={handleSubmit} className="flex-1" size="large" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting…' : 'Confirm Booking ✓'}
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {showResumePrompt && (
        <ResumeBookingPrompt
          savedData={{ cart: savedCart }}
          onResume={handleResumeBooking}
          onStartFresh={handleStartFresh}
          onDismiss={() => setShowResumePrompt(false)}
        />
      )}
    </>
  )
}

export default SchedulePickup
