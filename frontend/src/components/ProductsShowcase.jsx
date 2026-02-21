import { useEffect, useState, useRef } from "react";
import { getProducts } from "../services/api";

// Asymmetric Product Card - Can be small, medium, large, or featured
function ProductCard({ product, size = 'medium', onView }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const isVideo = product.imageUrl?.match(/\.(mp4|webm|ogg)$/i);

  // Size classes for asymmetric layout
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1',
    large: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
    featured: 'col-span-2 row-span-2',
    full: 'col-span-1 aspect-[16/9] md:aspect-[21/9]',
    half: 'col-span-1 aspect-[4/3]'
  };

  useEffect(() => {
    if (videoRef.current && isVideo) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isVideo]);

  return (
    <div
      className={`group cursor-pointer ${sizeClasses[size]} relative overflow-hidden bg-white transition-all duration-500 hover:z-10`}
      onClick={() => onView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Container */}
      <div className="absolute inset-0">
        {/* Placeholder */}
        <div className={`absolute inset-0 bg-neutral-100 flex items-center justify-center transition-opacity duration-500 ${imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'}`}>
          <svg className="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        {/* Video */}
        {isVideo ? (
          <video
            ref={videoRef}
            src={product.imageUrl}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loop
            muted
            playsInline
            onLoadedData={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          /* Image */
          product.imageUrl && !imageError && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
          {product.category && (
            <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-2">
              {product.category}
            </span>
          )}
          <h3 className={`text-white font-light tracking-wide ${size === 'featured' || size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {product.name}
          </h3>
          {(size === 'featured' || size === 'large') && product.description && (
            <p className="text-white/70 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {product.description}
            </p>
          )}
        </div>

        {/* View Button */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest">
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>

      {/* Video Indicator */}
      {isVideo && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </div>
  );
}

// Modern Split Section - alternating text and image layout
function SplitSection({ id, title, subtitle, products, onViewProduct, reverse = false }) {
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

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-20 border-b border-neutral-200"
    >
      {/* Featured Product - Split Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] max-w-7xl mx-auto`}>
        {/* Text Side */}
        <div className={`flex flex-col justify-center p-8 md:p-12 ${reverse ? 'lg:order-2' : 'lg:order-1'} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-3">{subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-extralight text-neutral-900 tracking-tight mb-4">
            {title}
          </h2>
          <div className="w-12 h-px bg-neutral-300 mb-6"></div>

          <h3 className="text-xl font-light text-neutral-800 mb-3">
            {featuredProduct.name}
          </h3>
          <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 max-w-sm">
            {featuredProduct.description || 'Premium quality electrical product designed for modern living spaces.'}
          </p>

          <button
            onClick={() => onViewProduct(featuredProduct)}
            className="inline-flex items-center gap-2 text-neutral-900 text-xs uppercase tracking-widest group w-fit"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Image Side */}
        <div
          className={`relative overflow-hidden bg-neutral-50 min-h-[300px] cursor-pointer group ${reverse ? 'lg:order-1' : 'lg:order-2'} ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
          onClick={() => onViewProduct(featuredProduct)}
        >
          {featuredProduct.imageUrl ? (
            <img
              src={featuredProduct.imageUrl}
              alt={featuredProduct.name}
              className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-800 text-xs uppercase tracking-widest bg-white/90 px-4 py-2 rounded">
              View
            </span>
          </div>
        </div>
      </div>

      {/* Other Products Grid - Compact */}
      {otherProducts.length > 0 && (
        <div className="bg-white py-8 px-6 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {otherProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => onViewProduct(product)}
                >
                  <div className="relative aspect-square bg-neutral-50 overflow-hidden rounded">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors truncate">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
  if (product.category) {
    const productCategory = product.category.toLowerCase().trim();
    for (const [categoryKey, category] of Object.entries(CATEGORIES)) {
      if (category.categoryMatch.some(match => productCategory === match || productCategory.includes(match))) {
        return categoryKey;
      }
    }
  }

  const searchText = `${product.name} ${product.description || ''}`.toLowerCase();

  if (CATEGORIES.fans.keywords.some(keyword => searchText.includes(keyword))) {
    return 'fans';
  }
  if (CATEGORIES.switches.keywords.some(keyword => searchText.includes(keyword))) {
    return 'switches';
  }
  if (CATEGORIES.cables.keywords.some(keyword => searchText.includes(keyword))) {
    return 'cables';
  }
  if (CATEGORIES.lighting.keywords.some(keyword => searchText.includes(keyword))) {
    return 'lighting';
  }
  if (CATEGORIES.accessories.keywords.some(keyword => searchText.includes(keyword))) {
    return 'accessories';
  }

  return 'accessories';
}

export default function ProductsShowcase() {
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
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-neutral-200 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-neutral-900 rounded-full border-t-transparent animate-spin"></div>
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
      {/* Hero Section with Video Background Option */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
          {/* Moving Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'moveGrid 20s linear infinite'
          }}></div>
          {/* Floating Shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-6">
            Explore Our Collection
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6 leading-tight">
            Our Products
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
            Premium electrical solutions crafted with precision and designed for modern spaces
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(CATEGORIES).map(([key, category]) => (
              categorizedProducts[key]?.length > 0 && (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                    activeSection === key
                      ? 'bg-white text-neutral-900 border-white'
                      : 'bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {category.title}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Product Sections */}
      <div className="bg-neutral-50">
        {/* Sticky Category Navigation */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-1 py-4 overflow-x-auto scrollbar-hide">
              <span className="text-neutral-400 text-xs uppercase tracking-widest mr-4 hidden md:block">Jump to:</span>
              {Object.entries(CATEGORIES).map(([key, category]) => (
                categorizedProducts[key]?.length > 0 && (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      activeSection === key
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {category.title}
                    <span className="ml-1 text-[10px] opacity-60">({categorizedProducts[key]?.length || 0})</span>
                  </button>
                )
              ))}
            </div>
          </div>
        </div>

        {Object.entries(CATEGORIES).map(([key, category], index) => (
          <SplitSection
            key={key}
            id={key}
            title={category.title}
            subtitle={category.subtitle}
            products={categorizedProducts[key] || []}
            onViewProduct={openModal}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full md:max-w-4xl md:max-h-[90vh] overflow-hidden rounded-t-lg md:rounded-lg shadow-2xl max-h-[95vh] overflow-y-auto flex flex-col md:grid md:grid-cols-2"
            onClick={e => e.stopPropagation()}
          >
            {/* Image/Video - Mobile: first, Desktop: left */}
            <div className="relative aspect-square bg-neutral-100 md:aspect-auto order-1 md:order-1">
              {selectedProduct.imageUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={selectedProduct.imageUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={selectedProduct.imageUrl || '/placeholder.jpg'}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Details - Mobile: scrollable, Desktop: right */}
            <div className="p-6 md:p-8 flex flex-col relative order-2 md:order-2">
              <button
                onClick={closeModal}
                className="sticky top-0 md:absolute md:top-4 md:right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors mb-4 md:mb-0 self-end md:self-auto"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {selectedProduct.category && (
                <span className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  {selectedProduct.category}
                </span>
              )}

              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">
                {selectedProduct.name}
              </h2>

              <p className="text-neutral-600 font-light leading-relaxed flex-grow">
                {selectedProduct.description || 'Premium quality electrical product designed for modern spaces.'}
              </p>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-8 py-4 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Request Quote
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation for Grid */}
      <style>{`
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
}
