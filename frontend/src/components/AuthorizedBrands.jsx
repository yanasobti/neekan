import { useEffect, useState, useRef } from 'react'

const categories = [
  {
    title: 'Lighting Solutions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    brands: [
      { name: 'Neekan Lites', highlight: true },
      { name: 'Ledlum' },
      { name: 'Philips' },
      { name: 'OSRAM' },
    ],
  },
  {
    title: 'Switches & Accessories',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    brands: [
      { name: 'Schneider' },
      { name: 'Norisys' },
      { name: 'Vihan' },
      { name: 'GreatWhite' },
      { name: 'GM Modular' },
      { name: 'Legrand' },
    ],
  },
  {
    title: 'Premium Fans',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    brands: [
      { name: 'Orient Electric' },
      { name: 'Indo' },
      { name: 'Ecolink' },
      { name: 'Kuhl Fans' },
    ],
  },
]

function AuthorizedBrands() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white py-24 px-6 lg:px-8 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-neutral-300"></div>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.4em]">
              Trusted Partners
            </p>
            <div className="w-8 h-px bg-neutral-300"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-neutral-900 tracking-tight mb-4">
            Authorized Brand Dealer
          </h2>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
            We are proud authorized dealers of India's most trusted electrical brands,
            ensuring genuine products with full manufacturer warranty.
          </p>
        </div>

        {/* Categories with Brands */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((category, catIndex) => (
            <div
              key={category.title}
              className="group"
              style={{ transitionDelay: `${catIndex * 200}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-400">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-neutral-900 font-medium text-base tracking-wide">{category.title}</h3>
                  <p className="text-neutral-400 text-xs">{category.brands.length} brands</p>
                </div>
              </div>

              {/* Brand Cards */}
              <div className="grid grid-cols-2 gap-3">
                {category.brands.map((brand, brandIndex) => (
                  <div
                    key={brand.name}
                    className={`relative p-5 lg:p-6 border transition-all duration-500 flex items-center justify-center text-center ${
                      brand.highlight
                        ? 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
                        : 'bg-neutral-50 border-neutral-100 hover:border-neutral-300 hover:bg-white hover:shadow-lg'
                    }`}
                    style={{ transitionDelay: `${catIndex * 200 + brandIndex * 75}ms` }}
                  >
                    <div>
                      {/* Brand Name */}
                      <p className={`text-sm uppercase tracking-[0.15em] font-medium ${
                        brand.highlight ? 'text-white' : 'text-neutral-600'
                      }`}>
                        {brand.name}
                      </p>

                      {/* Own Brand Badge */}
                      {brand.highlight && (
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-[0.2em] text-amber-400 border border-amber-400/30 px-2 py-0.5">
                          Our Brand
                        </span>
                      )}
                    </div>

                    {/* Authorized checkmark */}
                    {!brand.highlight && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-14">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 py-4 px-8 bg-neutral-50 border border-neutral-100">
            <span className="flex items-center gap-2 text-neutral-500 text-sm font-light">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Genuine Products
            </span>
            <div className="w-px h-4 bg-neutral-200 hidden sm:block"></div>
            <span className="flex items-center gap-2 text-neutral-500 text-sm font-light">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Manufacturer Warranty
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorizedBrands



