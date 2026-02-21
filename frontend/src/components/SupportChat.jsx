import { useState, useRef, useEffect } from 'react';

function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your Sobti Enterprises assistant. How can I help you today?",
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What products do you offer?",
    "How do I request a quote?",
    "What are your contact details?",
    "Where are you located?"
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Product related
    if (msg.includes('product') || msg.includes('offer') || msg.includes('sell') || msg.includes('catalog')) {
      return "We offer a wide range of electrical products including switches, sockets, wires, cables, and more. You can browse our full catalog on the Products page. Would you like me to help you find something specific?";
    }

    // Quote related
    if (msg.includes('quote') || msg.includes('price') || msg.includes('cost') || msg.includes('pricing')) {
      return "To request a quote:\n\n1. Fill out the contact form above\n2. Select the products you're interested in\n3. Add your requirements in the message\n4. Submit and we'll get back to you within 24 hours!\n\nYou'll receive a reference code to track your inquiry.";
    }

    // Contact details
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call')) {
      return "📞 Phone: +91 98120 52133\n📧 Email: sobtienterprises@gmail.com\n\n⏰ Business Hours:\nMon-Sat: 9:00 AM - 6:00 PM\n\nFeel free to call us during business hours or email anytime!";
    }

    // Location
    if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('visit')) {
      return "📍 We're located at:\n\n1944, Dholkot Area\nAmbala Cantt, Ambala\nHaryana 134007, India\n\nYou're welcome to visit us during business hours!";
    }

    // Delivery/Shipping
    if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('ship')) {
      return "We deliver across India! Delivery times and charges depend on your location and order size. Please request a quote and we'll include delivery details in our response.";
    }

    // Bulk/Wholesale
    if (msg.includes('bulk') || msg.includes('wholesale') || msg.includes('large order')) {
      return "Yes, we handle bulk and wholesale orders! We offer competitive pricing for large quantities. Please submit a quote request with your requirements and we'll provide special bulk pricing.";
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! 😊 Is there anything else I can help you with?";
    }

    // Greeting
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return "Hello! 👋 How can I assist you today? You can ask me about:\n\n• Our products\n• How to request a quote\n• Contact information\n• Our location";
    }

    // Help
    if (msg.includes('help')) {
      return "I'm here to help! Here's what I can assist you with:\n\n• 📦 Product information\n• 💰 Quote requests\n• 📞 Contact details\n• 📍 Location & directions\n• 🚚 Delivery information\n\nJust type your question!";
    }

    // Human support
    if (msg.includes('human') || msg.includes('person') || msg.includes('agent') || msg.includes('real')) {
      return "For direct human support, please:\n\n📞 Call: +91 98120 52133\n📧 Email: sobtienterprises@gmail.com\n\nOr fill out the contact form above and we'll get back to you within 24 hours!";
    }

    // Default response
    return "I'm not sure I understood that. Here's what I can help with:\n\n• Product information\n• Quote requests\n• Contact details\n• Location\n\nOr type 'help' for more options. For specific inquiries, please fill out the contact form above!";
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: text.trim(),
      time: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(text),
        time: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-neutral-900 p-4 text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Support Assistant</h3>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online • Instant replies
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-md'
                      : 'bg-white text-neutral-800 rounded-bl-md shadow-sm border border-neutral-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-neutral-400' : 'text-neutral-400'}`}>
                    {formatTime(msg.time)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-neutral-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-3 bg-white border-t border-neutral-100 flex-shrink-0">
              <p className="text-xs text-neutral-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(reply)}
                    className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-neutral-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-neutral-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="p-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-neutral-900 hover:bg-neutral-800 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-white"
        aria-label="Open support chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Notification Badge */}
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">1</span>
        </span>
      )}

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-neutral-900 animate-ping opacity-20 pointer-events-none"></span>
      )}
    </div>
  );
}

export default SupportChat;
