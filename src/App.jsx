import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Route-level code splitting for optimized bundle loading
const Services = lazy(() => import('./pages/Services'))
const B2BServices = lazy(() => import('./pages/B2BServices'))
const Pricing = lazy(() => import('./pages/Pricing'))
const StoreLocator = lazy(() => import('./pages/StoreLocator'))
const Blogs = lazy(() => import('./pages/Blogs'))
const GetFranchise = lazy(() => import('./pages/GetFranchise'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const SchedulePickup = lazy(() => import('./pages/SchedulePickup'))
const Harmu = lazy(() => import('./pages/locations/Harmu'))
const Hinoo = lazy(() => import('./pages/locations/Hinoo'))
const Doranda = lazy(() => import('./pages/locations/Doranda'))
const Lalpur = lazy(() => import('./pages/locations/Lalpur'))
const Kantatoli = lazy(() => import('./pages/locations/Kantatoli'))
const Login = lazy(() => import('./pages/Login'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Subscriptions = lazy(() => import('./pages/Subscriptions'))
const SubscriptionDetail = lazy(() => import('./pages/SubscriptionDetail'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const Account = lazy(() => import('./pages/Account'))

// Minimal, smooth fallback spinner
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-700 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 text-sm font-medium animate-pulse">Loading Laundryman...</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/b2b-services" element={<B2BServices />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/store-locator" element={<StoreLocator />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/get-franchise" element={<GetFranchise />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/schedule-pickup" element={<SchedulePickup />} />
            <Route path="/locations/harmu" element={<Harmu />} />
            <Route path="/locations/hinoo" element={<Hinoo />} />
            <Route path="/locations/doranda" element={<Doranda />} />
            <Route path="/locations/lalpur" element={<Lalpur />} />
            <Route path="/locations/kantatoli" element={<Kantatoli />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failed" element={<PaymentFailed />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/track/:ticketNumber" element={<OrderTracking />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/subscriptions/manage" element={<SubscriptionDetail />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
