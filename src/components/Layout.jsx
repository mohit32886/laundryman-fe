import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActionButtons from './FloatingActionButtons'

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top when route changes, but only if there's no hash
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  )
}

