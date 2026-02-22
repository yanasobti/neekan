import { useEffect, useState, useRef } from 'react'

const certifications = [
  {
    title: 'BIS Certified',
    subtitle: 'Bureau of Indian Standards',
    description: 'All our products meet the stringent quality standards set by BIS, ensuring safety and reliability.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management',
    description: 'We adhere to international quality management standards in all our operations and product handling.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'ISI Mark',
    subtitle: 'Indian Standards Institution',
    description: 'Products carry the ISI mark certifying compliance with Indian safety and performance standards.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Energy Star Rated',
    subtitle: 'Energy Efficiency',
    description: 'Our lighting and fan products are rated for energy efficiency, helping you save on electricity bills.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

function Certifications() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-neutral-950 py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-800 rounded-full filter blur-[150px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Since Year & Heritage */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-6">
              Our Heritage
            </p>

            {/* Since Year Badge */}
            <div className="relative mb-10">
              <div className="flex items-baseline gap-4">
                <span className="text-8xl md:text-9xl font-extralight text-white/10">
                  2014
                </span>
              </div>
              <div className="absolute bottom-2 left-0">
                <p className="text-white text-2xl md:text-3xl font-light tracking-wide">
                  Since <span className="text-neutral-400">2014</span>
                </p>
              </div>
            </div>

            <div className="w-16 h-px bg-neutral-700 mb-8"></div>

            <p className="text-neutral-400 text-lg font-light leading-relaxed mb-8 max-w-lg">
              For over <span className="text-white font-normal">a decade</span>, Sobti Enterprises has been
              Ambala's trusted name in premium electrical solutions. Our commitment to quality,
              authenticity, and customer satisfaction has made us the go-to destination for
              electrical needs across the region.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-300 text-sm font-light">Authorized Dealer</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-300 text-sm font-light">100% Genuine Products</span>
              </div>

            </div>
          </div>

          {/* Right - Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`group p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-600 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="text-neutral-500 group-hover:text-white transition-colors duration-500 mb-5">
                  {cert.icon}
                </div>
                <h3 className="text-white font-light text-lg mb-1">{cert.title}</h3>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">{cert.subtitle}</p>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications





