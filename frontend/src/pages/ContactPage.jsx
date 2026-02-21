import CallToAction from '../components/CallToAction'
import SupportChat from '../components/SupportChat'

function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-6">
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Questions, inquiries, or partnership opportunities — we're here to help
          </p>
        </div>
      </section>
      <CallToAction />
      <SupportChat />
    </div>
  )
}

export default ContactPage
