import { useState, useEffect } from 'react';
import { sendContactMessage, getProducts } from '../services/api';

function CallToAction({ preSelectedProducts = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedProducts, setSelectedProducts] = useState(preSelectedProducts);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '', referenceCode: '' });
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch products for selection
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  useEffect(() => {
    // Update selected products if preSelectedProducts changes
    if (preSelectedProducts.length > 0) {
      setSelectedProducts(preSelectedProducts);
    }
  }, [preSelectedProducts]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const showToastMessage = (type, message, referenceCode = '') => {
    setToast({ show: true, type, message, referenceCode });
    if (type === 'error') {
      setTimeout(() => {
        setToast({ show: false, type: '', message: '', referenceCode: '' });
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        productIds: selectedProducts.length > 0 ? selectedProducts : null
      });

      showToastMessage('success', 'Quote request submitted successfully!', response.referenceCode);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedProducts([]);
    } catch (error) {
      showToastMessage('error', error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedProductNames = () => {
    return products.filter(p => selectedProducts.includes(p.id)).map(p => p.name);
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-neutral-50 relative">
      {/* Success Modal with Reference Code */}
      {toast.show && toast.type === 'success' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-neutral-900 mb-2">Quote Request Submitted!</h3>
            <p className="text-neutral-600 mb-6">Thank you for your inquiry. We'll get back to you shortly.</p>

            <div className="bg-neutral-100 rounded-lg p-4 mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Your Reference Code</p>
              <p className="text-2xl font-mono font-bold text-neutral-900">{toast.referenceCode}</p>
              <p className="text-xs text-neutral-500 mt-2">Save this code for future reference</p>
            </div>

            <p className="text-sm text-neutral-600 mb-6">
              A confirmation email has been sent to your inbox with the quote details.
            </p>

            <button
              onClick={() => setToast({ show: false, type: '', message: '', referenceCode: '' })}
              className="w-full px-6 py-3 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {toast.show && toast.type === 'error' && (
        <div className="fixed top-6 right-6 z-50 max-w-md px-6 py-4 rounded-lg shadow-lg bg-red-600 text-white">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="font-medium">{toast.message}</p>
            <button onClick={() => setToast({ show: false, type: '', message: '', referenceCode: '' })} className="ml-auto hover:opacity-75">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Product Selector Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-light text-neutral-900">Select Products for Quote</h3>
              <p className="text-sm text-neutral-500 mt-1">Search and select the products you're interested in</p>

              {/* Search Input */}
              <div className="mt-4 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:ring-0 outline-none"
                />
              </div>

              {/* Category Filter */}
              {categories.length > 2 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full transition-colors ${
                        selectedCategory === cat
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 max-h-[40vh] overflow-y-auto">
              {/* Selected Count */}
              {selectedProducts.length > 0 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <span className="text-green-800 text-sm font-medium">{selectedProducts.length} product(s) selected</span>
                  <button
                    onClick={() => setSelectedProducts([])}
                    className="text-green-600 text-sm hover:text-green-800"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map(product => (
                  <label
                    key={product.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedProducts.includes(product.id) ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{product.name}</p>
                      {product.category && <p className="text-xs text-neutral-500">{product.category}</p>}
                    </div>
                  </label>
                ))}
              </div>

              {filteredProducts.length === 0 && productSearch && (
                <p className="text-center text-neutral-500 py-8">No products found matching "{productSearch}"</p>
              )}
              {products.length === 0 && <p className="text-center text-neutral-500 py-8">Loading products...</p>}
            </div>

            <div className="p-6 border-t border-neutral-200 flex gap-4">
              <button
                onClick={() => {
                  setShowProductSelector(false);
                  setProductSearch('');
                  setSelectedCategory('all');
                }}
                className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 text-sm uppercase tracking-widest hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowProductSelector(false);
                  setProductSearch('');
                  setSelectedCategory('all');
                }}
                className="flex-1 px-6 py-3 bg-neutral-900 text-white text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                Done ({selectedProducts.length} selected)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4">Reach Out</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 tracking-tight mb-8">Let's Connect</h2>
            <div className="w-12 h-px bg-neutral-300 mb-8"></div>
            <p className="text-neutral-600 text-lg font-light leading-relaxed mb-12">
              Have questions about our products or need assistance with your project? Our team of experts is ready to help you find the perfect solution.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Phone</h3>
                  <p className="text-neutral-900 text-lg font-light">+91 98120 52133</p>
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
                  <p className="text-neutral-900 text-lg font-light">sobtienterprises@gmail.com</p>
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
                  <p className="text-neutral-900 text-lg font-light">1944, Dholkot Area</p>
                  <p className="text-neutral-600 font-light">Ambala Cantt, Ambala, Haryana 134007</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white p-8 lg:p-12 border border-neutral-200">
            <h3 className="text-2xl font-light text-neutral-900 mb-2">Request a Quote</h3>
            <p className="text-neutral-500 text-sm mb-8">Fill out the form below and we'll send you a detailed quote</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Products Display */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Products Interested In</label>
                <button
                  type="button"
                  onClick={() => setShowProductSelector(true)}
                  className="w-full px-4 py-3 border border-dashed border-neutral-300 rounded-lg text-left hover:border-neutral-400 transition-colors"
                >
                  {selectedProducts.length > 0 ? (
                    <div>
                      <p className="text-neutral-900 font-medium">{selectedProducts.length} product(s) selected</p>
                      <p className="text-sm text-neutral-500 truncate">{getSelectedProductNames().join(', ')}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-neutral-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Click to select products (optional)</span>
                    </div>
                  )}
                </button>
                {selectedProducts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getSelectedProductNames().map((name, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-700">
                        {name}
                        <button type="button" onClick={() => toggleProduct(selectedProducts[idx])} className="hover:text-red-500">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isLoading}
                  className={`w-full px-0 py-3 border-0 border-b ${errors.name ? 'border-red-500' : 'border-neutral-300'} focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Your name" />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isLoading}
                  className={`w-full px-0 py-3 border-0 border-b ${errors.email ? 'border-red-500' : 'border-neutral-300'} focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="your@email.com" />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isLoading}
                  className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="+91 98765 43210" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Message <span className="text-red-500">*</span></label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} disabled={isLoading}
                  className={`w-full px-0 py-3 border-0 border-b ${errors.message ? 'border-red-500' : 'border-neutral-300'} focus:border-neutral-900 focus:ring-0 outline-none transition-colors bg-transparent text-neutral-900 font-light resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Tell us about your requirements, quantity needed, etc..."></textarea>
                {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isLoading}
                  className="w-full px-8 py-5 bg-neutral-900 text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    'Request Quote'
                  )}
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
