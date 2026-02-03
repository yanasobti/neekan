function CallToAction() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4">
              Reach Out
            </p>
            <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 tracking-tight mb-8">
              Let's Connect
            </h2>

            <div className="w-12 h-px bg-neutral-300 mb-8"></div>

            <p className="text-neutral-600 text-lg font-light leading-relaxed mb-12">
              Have questions about our products or need assistance with your project?
              Our team of experts is ready to help you find the perfect solution.
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Phone</h3>
                  <p className="text-neutral-900 text-lg font-light">+91 98765 43210</p>
                  <p className="text-neutral-500 text-sm font-light mt-1">Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Email</h3>
                  <p className="text-neutral-900 text-lg font-light">info@sobtienterprises.com</p>
                  <p className="text-neutral-500 text-sm font-light mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Location</h3>
                  <p className="text-neutral-900 text-lg font-light">Industrial Area, Phase II</p>
                  <p className="text-neutral-600 font-light">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white p-8 lg:p-12 border border-neutral-200">
            <h3 className="text-2xl font-light text-neutral-900 mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light resize-none"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-5 bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
