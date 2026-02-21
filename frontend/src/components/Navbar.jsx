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
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Icon - Hanging Light Bulbs */}
            <svg
              className={`w-10 h-12 transition-colors duration-300 ${
                scrolled ? 'text-neutral-900' : 'text-white'
              }`}
              viewBox="0 0 40 48"
              fill="none"
              stroke="currentColor"
            >
              {/* Top Bar */}
              <rect x="4" y="2" width="32" height="4" fill="currentColor" rx="1" />

              {/* Left bulb - wavy wire */}
              <path d="M10 6 Q8 12, 10 18 Q12 24, 10 30" strokeWidth="1.5" fill="none" />
              <ellipse cx="10" cy="34" rx="4" ry="5" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="33" x2="12" y2="33" strokeWidth="1" />

              {/* Middle bulb - wavy wire */}
              <path d="M20 6 Q18 14, 20 22 Q22 30, 20 38" strokeWidth="1.5" fill="none" />
              <ellipse cx="20" cy="42" rx="4" ry="5" strokeWidth="1.5" fill="none" />
              <line x1="18" y1="41" x2="22" y2="41" strokeWidth="1" />
              <line x1="18" y1="43" x2="22" y2="43" strokeWidth="1" />
              <line x1="19" y1="44" x2="21" y2="46" strokeWidth="1" />

              {/* Right bulb - wavy wire */}
              <path d="M30 6 Q32 12, 30 18 Q28 24, 30 30" strokeWidth="1.5" fill="none" />
              <ellipse cx="30" cy="34" rx="4" ry="5" strokeWidth="1.5" fill="none" />
              <line x1="28" y1="33" x2="32" y2="33" strokeWidth="1" />
            </svg>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className={`text-lg font-medium tracking-wider transition-colors duration-300 ${
                scrolled ? 'text-neutral-900' : 'text-white'
              }`}>
                SOBTI
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                scrolled ? 'text-neutral-500' : 'text-white/70'
              }`}>
                Enterprises
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Home */}
            <Link
              to="/"
              className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                scrolled
                  ? 'text-neutral-600 hover:text-neutral-900'
                  : 'text-white/80 hover:text-white'
              } ${isActive('/') ? (scrolled ? 'text-neutral-900' : 'text-white') : ''}`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                scrolled ? 'bg-neutral-900' : 'bg-white'
              } ${isActive('/') ? 'w-full' : 'w-0'}`} />
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
                  scrolled
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-white/80 hover:text-white'
                } ${isActive('/products') ? (scrolled ? 'text-neutral-900' : 'text-white') : ''}`}
              >
                Products
                <svg className={`w-3 h-3 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  scrolled ? 'bg-neutral-900' : 'bg-white'
                } ${isActive('/products') ? 'w-full' : 'w-0'}`} />
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
                scrolled
                  ? 'text-neutral-600 hover:text-neutral-900'
                  : 'text-white/80 hover:text-white'
              } ${isActive('/contact') ? (scrolled ? 'text-neutral-900' : 'text-white') : ''}`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                scrolled ? 'bg-neutral-900' : 'bg-white'
              } ${isActive('/contact') ? 'w-full' : 'w-0'}`} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-px transition-all duration-300 ${
                scrolled ? 'bg-neutral-900' : 'bg-white'
              } ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-px transition-all duration-300 ${
                scrolled ? 'bg-neutral-900' : 'bg-white'
              } ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-px transition-all duration-300 ${
                scrolled ? 'bg-neutral-900' : 'bg-white'
              } ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
