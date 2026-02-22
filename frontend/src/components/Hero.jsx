import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Hero() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-neutral-800 rounded-full filter blur-[120px] opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neutral-700 rounded-full filter blur-[100px] opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-8">
                Premium Electrical Solutions
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight mb-8 leading-[0.9]">
                Light
                <br />
                <span className="font-light text-neutral-400">Redefined</span>
              </h1>

              <div className="w-16 h-px bg-neutral-700 mb-8"></div>

              <p className="text-neutral-400 text-lg lg:text-xl font-light leading-relaxed max-w-lg mb-12">
                Exceptional electrical solutions for modern architecture.
                From ambient lighting to industrial power, we illuminate your vision.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/products')}
                  className="group px-10 py-5 bg-white text-neutral-900 text-sm uppercase tracking-[0.2em] font-medium hover:bg-neutral-100 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-3">
                    Explore Products
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-10 py-5 border border-neutral-700 text-neutral-300 text-sm uppercase tracking-[0.2em] font-light hover:border-neutral-500 hover:text-white transition-all duration-300"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="group p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-500">
                <div className="w-10 h-10 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-lg mb-2">Quality Certified</h3>
                <p className="text-neutral-500 text-sm font-light">ISO certified products with comprehensive warranty</p>
              </div>

              <div className="group p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-500 mt-8">
                <div className="w-10 h-10 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-lg mb-2">Extensive Range</h3>
                <p className="text-neutral-500 text-sm font-light">1000+ products across all categories</p>
              </div>

              <div className="group p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-500">
                <div className="w-10 h-10 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-lg mb-2">Fast Delivery</h3>
                <p className="text-neutral-500 text-sm font-light">Same-day dispatch on most orders</p>
              </div>

              <div className="group p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-500 mt-8">
                <div className="w-10 h-10 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-lg mb-2">Expert Support</h3>
                <p className="text-neutral-500 text-sm font-light">Technical assistance included</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <span className="text-neutral-600 text-xs uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-neutral-600 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Categories Section - Below fold */}
      <section className="relative z-10 bg-neutral-950 py-32 px-6 lg:px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-4">Categories</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Lighting', desc: 'Neekan Lites · Ledlum · Philips · OSRAM', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { name: 'Switches & Accessories', desc: 'Schneider · Norisys · Vihan · GreatWhite · GM · Legrand', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Fans', desc: 'Orient · Indo · Ecolink · Kuhl Fans', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
            ].map((category, index) => (
              <button
                key={category.name}
                onClick={() => navigate('/products')}
                className="group p-8 md:p-12 bg-neutral-900/30 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/50 transition-all duration-500"
              >
                <div className="w-12 h-12 mx-auto border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors duration-300">
                  <svg className="w-6 h-6 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={category.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-light text-lg tracking-wide mb-2">{category.name}</h3>
                <p className="text-neutral-500 text-xs font-light tracking-wide">{category.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-white py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '1000+', label: 'Products' },
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl md:text-6xl font-extralight text-neutral-900 mb-3">{stat.number}</p>
                <p className="text-neutral-500 text-sm uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-neutral-100 py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 tracking-tight mb-8 leading-tight">
            Ready to illuminate
            <br />
            your next project?
          </h2>
          <p className="text-neutral-500 text-lg font-light mb-12 max-w-2xl mx-auto">
            Get in touch with our team for personalized solutions and expert guidance on your electrical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-12 py-5 bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-12 py-5 border border-neutral-400 text-neutral-700 text-sm uppercase tracking-[0.2em] font-light hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300"
            >
              View Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
