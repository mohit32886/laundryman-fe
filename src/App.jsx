import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import B2BServices from './pages/B2BServices'
import Pricing from './pages/Pricing'
import StoreLocator from './pages/StoreLocator'
import Blogs from './pages/Blogs'
import GetFranchise from './pages/GetFranchise'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import SchedulePickup from './pages/SchedulePickup'
import Harmu from './pages/locations/Harmu'
import Hinoo from './pages/locations/Hinoo'
import Doranda from './pages/locations/Doranda'
import Lalpur from './pages/locations/Lalpur'
import Kantatoli from './pages/locations/Kantatoli'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import OrderTracking from './pages/OrderTracking'
import Wallet from './pages/Wallet'
import Subscriptions from './pages/Subscriptions'
import SubscriptionDetail from './pages/SubscriptionDetail'
import MyOrders from './pages/MyOrders'
import Account from './pages/Account'

function App() {
  return (
    <BrowserRouter>
      <Layout>
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
      </Layout>
    </BrowserRouter>
  )
}

export default App
