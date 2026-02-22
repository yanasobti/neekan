import { useEffect, useState, useRef } from "react";
import { getProducts } from "../services/api";

const GIF_URL = "https://belezzaworld.com/img/main/realmetal_new2.gif";

// Restarts the GIF every time the section scrolls into view
function SwitchesShowcase() {
  const ref = useRef(null);
  const [gifSrc, setGifSrc] = useState(GIF_URL + '?t=' + Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Bust the cache so the browser re-fetches & replays from frame 1
          setGifSrc(GIF_URL + '?t=' + Date.now());
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-[85vh] overflow-hidden bg-neutral-950">
      {/* GIF Background — re-triggered on scroll */}
      <img
        src={gifSrc}
        alt="Premium Switches"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-black/30 to-neutral-50"></div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.6em] mb-5 font-light">
          Schneider · Norisys · Vihan · GreatWhite · GM · Legrand
        </p>
        <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight mb-6">
          A New Era of
          <br />
          <span className="font-light">Switching</span>
        </h3>
        <div className="w-16 h-px bg-white/20 mb-6"></div>
        <p className="text-white/60 text-base sm:text-lg font-light max-w-xl">
          Exquisite range of premium switches designed to elevate every space.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

// Sleek section divider between categories
function SectionDivider() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-12 overflow-hidden">
      <div className={`flex items-center justify-center gap-4 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left line */}
        <div className={`h-px bg-gradient-to-r from-transparent to-neutral-300 transition-all duration-1000 ease-out ${visible ? 'w-24 sm:w-40 md:w-56' : 'w-0'}`}></div>
        {/* Center diamond */}
        <div className={`w-2 h-2 rotate-45 border border-neutral-300 transition-all duration-700 delay-300 ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
        {/* Right line */}
        <div className={`h-px bg-gradient-to-l from-transparent to-neutral-300 transition-all duration-1000 ease-out ${visible ? 'w-24 sm:w-40 md:w-56' : 'w-0'}`}></div>
      </div>
    </div>
  );
}

// Category section — featured product + horizontal scroll row
function CategorySection({ id, title, subtitle, products, onViewProduct }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, [products]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  const featured = products[0];
  const rest = products.slice(1);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-20 py-16"
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-2">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-neutral-900 tracking-tight">{title}</h2>
          </div>
          <p className="text-neutral-400 text-sm font-light hidden sm:block">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Featured + Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          {/* Featured product — large card */}
          <div
            className="lg:col-span-2 group relative cursor-pointer overflow-hidden bg-neutral-100 aspect-[4/5] lg:aspect-auto"
            onClick={() => onViewProduct(featured)}
          >
            {featured.imageUrl ? (
              <img
                src={featured.imageUrl}
                alt={featured.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">{featured.category || 'Featured'}</p>
              <h3 className="text-white text-xl md:text-2xl font-light mb-1">{featured.name}</h3>
              {featured.description && (
                <p className="text-white/50 text-sm font-light line-clamp-2 max-w-sm">{featured.description}</p>
              )}
              <span className="inline-flex items-center gap-1.5 text-white/70 text-xs uppercase tracking-widest mt-4 group-hover:text-white transition-colors">
                View Details
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Right side — small grid of next 6 products */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {products.slice(1, 7).map((product) => (
              <div
                key={product.id}
                className="group relative cursor-pointer overflow-hidden bg-neutral-50 aspect-square"
                onClick={() => onViewProduct(product)}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs uppercase tracking-widest">View</span>
                </div>
                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-white/90 backdrop-blur-sm">
                  <p className="text-neutral-800 text-xs font-light truncate">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable row for remaining products (7+) */}
        {products.length > 7 && (
          <div className="relative">
            {/* Scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors -ml-2"
              >
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors -mr-2"
              >
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Fade edges */}
            {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-50 to-transparent z-[5] pointer-events-none"></div>}
            {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-50 to-transparent z-[5] pointer-events-none"></div>}

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            >
              {products.slice(7).map((product) => (
                <div
                  key={product.id}
                  className="group flex-shrink-0 w-40 sm:w-48 cursor-pointer"
                  onClick={() => onViewProduct(product)}
                >
                  <div className="relative aspect-square bg-neutral-50 overflow-hidden mb-2">
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
                    <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/50 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs uppercase tracking-widest">View</span>
                    </div>
                  </div>
                  <p className="text-neutral-700 text-xs font-light truncate group-hover:text-neutral-900 transition-colors">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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

  // Sort fans: Kuhl first, Indo last
  if (categorizedProducts.fans) {
    const brandOrder = ['kuhl', 'orient', 'ecolink', 'indo'];
    categorizedProducts.fans.sort((a, b) => {
      const textA = `${a.name} ${a.description || ''}`.toLowerCase();
      const textB = `${b.name} ${b.description || ''}`.toLowerCase();
      const rankA = brandOrder.findIndex(brand => textA.includes(brand));
      const rankB = brandOrder.findIndex(brand => textB.includes(brand));
      return (rankA === -1 ? 999 : rankA) - (rankB === -1 ? 999 : rankB);
    });
  }

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

        {Object.entries(CATEGORIES).map(([key, category], index) => {
          const hasProducts = categorizedProducts[key]?.length > 0;
          if (!hasProducts) return null;

          // Find if there's a previous visible category for the divider
          const previousKeys = Object.keys(CATEGORIES).slice(0, index);
          const hasPreviousSection = previousKeys.some(k => categorizedProducts[k]?.length > 0);

          return (
          <div key={key}>
            {/* Divider between sections (skip for sections with cinematic intros) */}
            {hasPreviousSection && key !== 'lighting' && key !== 'switches' && key !== 'fans' && <SectionDivider />}

            {/* Lighting Video Showcase — cinematic intro */}
            {key === 'lighting' && categorizedProducts[key]?.length > 0 && (
              <div className="relative w-full h-[85vh] overflow-hidden">
                {/* Video Background */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/lighting-showcase.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-black/30 to-neutral-50"></div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.6em] mb-5 font-light">
                    Neekan Lites · Ledlum · Philips · OSRAM
                  </p>
                  <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight mb-6">
                    A New Era of
                    <br />
                    <span className="font-light">Lighting</span>
                  </h3>
                  <div className="w-16 h-px bg-white/20 mb-6"></div>
                  <p className="text-white/60 text-base sm:text-lg font-light max-w-xl">
                    Premium lighting solutions that redefine ambiance, efficiency, and modern design.
                  </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
                    <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Switches GIF Showcase — cinematic intro */}
            {key === 'switches' && categorizedProducts[key]?.length > 0 && (
              <SwitchesShowcase />
            )}

            {/* Fans Video Showcase — cinematic intro */}
            {key === 'fans' && categorizedProducts[key]?.length > 0 && (
              <div className="relative w-full h-[85vh] overflow-hidden bg-neutral-950">
                {/* Video Background */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/fans-showcase.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-black/30 to-neutral-50"></div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.6em] mb-5 font-light">
                    Orient · Indo · Ecolink · Kuhl Fans
                  </p>
                  <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight mb-6">
                    A New Era of
                    <br />
                    <span className="font-light">Fans</span>
                  </h3>
                  <div className="w-16 h-px bg-white/20 mb-6"></div>
                  <p className="text-white/60 text-base sm:text-lg font-light max-w-xl">
                    Premium ceiling fans that blend comfort, style, and energy efficiency.
                  </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
                    <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            <CategorySection
              id={key}
              title={category.title}
              subtitle={category.subtitle}
              products={categorizedProducts[key] || []}
              onViewProduct={openModal}
              reverse={index % 2 === 1}
            />
          </div>
          );
        })}
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
