import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)

  const isActive = (path) => location.pathname === path
  const isProductsPage = location.pathname === '/products'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProductsDropdownOpen(false)
  }, [location])

  const productCategories = [
    { id: 'lighting', label: 'Lighting Solutions' },
    { id: 'fans', label: 'Premium Fans' },
    { id: 'switches', label: 'Switches & Sockets' },
    { id: 'cables', label: 'Cables & Wiring' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const handleCategoryClick = (categoryId) => {
    if (isProductsPage) {
      // Already on products page, just scroll
      const element = document.getElementById(categoryId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to products page then scroll
      navigate(`/products#${categoryId}`)
    }
    setProductsDropdownOpen(false)
  }

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.hash && isProductsPage) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [location, isProductsPage])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <span className={`text-2xl font-light tracking-wider transition-colors duration-300 ${
              scrolled ? 'text-neutral-900' : 'text-neutral-900'
            }`}>
              SOBTI ENTERPRISES
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Home */}
            <Link
              to="/"
              className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
              } ${isActive('/') ? 'text-neutral-900' : ''}`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-px bg-neutral-900 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0'
              }`} />
            </Link>

            {/* Products with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`relative text-sm tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 ${
                  scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                } ${isActive('/products') ? 'text-neutral-900' : ''}`}
              >
                Products
                <svg className={`w-3 h-3 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute -bottom-1 left-0 h-px bg-neutral-900 transition-all duration-300 ${
                  isActive('/products') ? 'w-full' : 'w-0'
                }`} />
              </Link>

              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                productsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="bg-white shadow-xl border border-neutral-100 min-w-[220px]">
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="block w-full text-left px-6 py-3 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
              } ${isActive('/contact') ? 'text-neutral-900' : ''}`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 h-px bg-neutral-900 transition-all duration-300 ${
                isActive('/contact') ? 'w-full' : 'w-0'
              }`} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-px bg-neutral-900 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`w-full h-px bg-neutral-900 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-full h-px bg-neutral-900 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="px-6 py-8">
          <Link
            to="/"
            className={`block text-lg tracking-wider py-3 ${
              isActive('/') ? 'text-neutral-900' : 'text-neutral-500'
            }`}
          >
            Home
          </Link>

          {/* Products with sub-items */}
          <div>
            <Link
              to="/products"
              className={`block text-lg tracking-wider py-3 ${
                isActive('/products') ? 'text-neutral-900' : 'text-neutral-500'
              }`}
            >
              Products
            </Link>
            <div className="pl-4 border-l border-neutral-200 ml-2 space-y-2">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    handleCategoryClick(category.id)
                    setMobileMenuOpen(false)
                  }}
                  className="block text-sm text-neutral-500 hover:text-neutral-900 py-2"
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className={`block text-lg tracking-wider py-3 ${
              isActive('/contact') ? 'text-neutral-900' : 'text-neutral-500'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
