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
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
