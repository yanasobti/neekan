import { useEffect, useState, useRef } from "react";
import { getProducts } from "../services/api";

// Reusable ProductCard Component
function ProductCard({ product, onView }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onView(product)}
    >
      <div className="relative overflow-hidden bg-white aspect-[4/5]">
        {/* Image Container */}
        <div className="absolute inset-0">
          {/* Placeholder */}
          <div className={`absolute inset-0 bg-neutral-100 flex items-center justify-center transition-opacity duration-500 ${imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'}`}>
            <svg className="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          {/* Actual Image */}
          {product.imageUrl && !imageError && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/50 transition-all duration-500">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <span className="text-white text-xs uppercase tracking-[0.3em] mb-2">View</span>
            <span className="w-8 h-px bg-white"></span>
          </div>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent">
          <h3 className="text-white text-lg font-light tracking-wide">
            {product.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
function ProductSection({ id, title, subtitle, products, onViewProduct }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (products.length === 0) return null;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-20 px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-3">{subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-extralight text-neutral-900 tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-px bg-neutral-300 mt-6"></div>
        </div>

        {/* Products Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Category definitions
const CATEGORIES = {
  lighting: {
    id: 'lighting',
    title: 'Lighting Solutions',
    subtitle: 'Illuminate Your Space',
    keywords: ['light', 'lamp', 'led', 'bulb', 'ceiling light', 'wall light', 'outdoor light', 'decorative light', 'chandelier', 'spotlight', 'downlight', 'panel light', 'tube light', 'street light'],
    categoryMatch: ['lighting', 'lights', 'light']
  },
  fans: {
    id: 'fans',
    title: 'Premium Fans',
    subtitle: 'Comfort & Style',
    keywords: ['fan', 'ceiling fan', 'exhaust fan', 'industrial fan', 'table fan', 'pedestal fan', 'ventilation'],
    categoryMatch: ['fans', 'fan']
  },
  switches: {
    id: 'switches',
    title: 'Switches & Sockets',
    subtitle: 'Smart Controls',
    keywords: ['switch', 'socket', 'modular', 'dimmer', 'plug', 'board', 'regulator'],
    categoryMatch: ['switches', 'switch', 'sockets', 'socket']
  },
  cables: {
    id: 'cables',
    title: 'Cables & Wiring',
    subtitle: 'Safe Connections',
    keywords: ['cable', 'wire', 'wiring', 'copper', 'electrical wire', 'power cable', 'conduit', 'flex'],
    categoryMatch: ['cables', 'cable', 'wiring', 'wires']
  },
  accessories: {
    id: 'accessories',
    title: 'Electrical Accessories',
    subtitle: 'Essential Components',
    keywords: ['mcb', 'panel', 'distribution', 'meter', 'fuse', 'relay', 'contactor', 'capacitor', 'junction', 'box', 'tape', 'accessory', 'accessories'],
    categoryMatch: ['accessories', 'accessory', 'other']
  }
};

// Helper function to categorize products
function categorizeProduct(product) {
  // First priority: Check explicit category field
  if (product.category) {
    const productCategory = product.category.toLowerCase().trim();
    for (const [categoryKey, category] of Object.entries(CATEGORIES)) {
      if (category.categoryMatch.some(match => productCategory === match || productCategory.includes(match))) {
        return categoryKey;
      }
    }
  }

  // Second priority: Check name and description with keywords
  // Important: Check more specific categories first (fans before lighting due to "LED" overlap)
  const searchText = `${product.name} ${product.description || ''}`.toLowerCase();

  // Check fans first (to handle "LED Ceiling Fan" correctly)
  if (CATEGORIES.fans.keywords.some(keyword => searchText.includes(keyword))) {
    return 'fans';
  }

  // Check switches
  if (CATEGORIES.switches.keywords.some(keyword => searchText.includes(keyword))) {
    return 'switches';
  }

  // Check cables
  if (CATEGORIES.cables.keywords.some(keyword => searchText.includes(keyword))) {
    return 'cables';
  }

  // Check lighting
  if (CATEGORIES.lighting.keywords.some(keyword => searchText.includes(keyword))) {
    return 'lighting';
  }

  // Check accessories
  if (CATEGORIES.accessories.keywords.some(keyword => searchText.includes(keyword))) {
    return 'accessories';
  }

  return 'accessories'; // Default category
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('all');

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(CATEGORIES);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group products by category
  const categorizedProducts = products.reduce((acc, product) => {
    const category = categorizeProduct(product);
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border border-neutral-300 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 border border-neutral-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute inset-4 border border-neutral-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-neutral-500 text-xs uppercase tracking-[0.3em]">Loading Products</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-6 border border-neutral-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-neutral-600 font-light">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-6 animate-fade-in">
            Complete Range
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6 leading-tight">
            Our Products
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
            Discover our curated collection of premium electrical solutions for every need
          </p>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-8">
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`text-sm whitespace-nowrap tracking-wider transition-all duration-300 pb-1 border-b-2 ${
                  activeSection === key
                    ? 'text-neutral-900 border-neutral-900'
                    : 'text-neutral-500 border-transparent hover:text-neutral-700'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Product Sections */}
      <div className="bg-neutral-50">
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <ProductSection
            key={key}
            id={key}
            title={category.title}
            subtitle={category.subtitle}
            products={categorizedProducts[key] || []}
            onViewProduct={openModal}
          />
        ))}

        {/* Empty State */}
        {products.length === 0 && (
          <section className="py-32 text-center">
            <div className="w-24 h-24 mx-auto mb-8 border border-neutral-200 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-neutral-400 text-lg font-light">No products available</p>
            <p className="text-neutral-300 text-sm mt-2">Check back soon for our latest collection</p>
          </section>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-neutral-900/95 backdrop-blur-sm"></div>

          {/* Modal Container */}
          <div className="min-h-screen flex items-center justify-center p-4">
            <div
              className="relative bg-white w-full max-w-5xl shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Left: Image */}
                <div className="relative bg-neutral-100 aspect-square lg:aspect-auto lg:min-h-[600px]">
                  {selectedProduct.imageUrl ? (
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="max-w-lg">
                    <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4">
                      Product Details
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-extralight text-neutral-900 tracking-tight mb-6 leading-tight">
                      {selectedProduct.name}
                    </h2>

                    <div className="w-12 h-px bg-neutral-300 mb-6"></div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                          Description
                        </h3>
                        <p className="text-neutral-600 leading-relaxed font-light">
                          {selectedProduct.description || "A premium quality product designed to meet the highest standards of performance and aesthetics. Contact us for detailed specifications."}
                        </p>
                      </div>

                      {selectedProduct.category && (
                        <div>
                          <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                            Category
                          </h3>
                          <p className="text-neutral-700 font-light">{selectedProduct.category}</p>
                        </div>
                      )}

                      <div className="pt-6 border-t border-neutral-200 flex gap-4">
                        <a
                          href="/contact"
                          className="flex-1 text-center px-8 py-4 bg-neutral-900 text-white text-sm uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors duration-300"
                        >
                          Get Quote
                        </a>
                        <button
                          onClick={closeModal}
                          className="px-8 py-4 border border-neutral-300 text-neutral-700 text-sm uppercase tracking-[0.15em] hover:border-neutral-900 hover:text-neutral-900 transition-colors duration-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
