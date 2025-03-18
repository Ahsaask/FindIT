import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Navbar - Glass effect */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Find<span className="text-blue-500">It</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">Testimonials</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">FAQ</a>
          </div>
          <div>
            <button className="px-4 py-2 text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:border-blue-600">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with animation */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 slide-in-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Lost something? <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-700">Found something?</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find It connects people who&apos;ve lost items with those who&apos;ve found them. 
                Our platform makes the process simple, secure, and successful.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:shadow-blue-200 hover:scale-105 transition-all duration-300">
                  Report Lost Item
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-xl hover:shadow-green-200 hover:scale-105 transition-all duration-300">
                  Report Found Item
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center slide-in-right">
              <div className="relative w-full max-w-md h-96">
                {/* Glass cards */}
                <div className="absolute top-0 right-0 bg-blue-400 bg-opacity-10 backdrop-blur-lg rounded-2xl w-64 h-64 border border-white/20 shadow-xl"></div>
                <div className="absolute bottom-0 left-0 bg-green-400 bg-opacity-10 backdrop-blur-lg rounded-2xl w-64 h-64 border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 m-auto backdrop-blur-md bg-white/60 rounded-2xl w-72 h-72 border border-white/20 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-500">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Easy to Use</h3>
                    <p className="text-gray-600">Report items in minutes and get connected instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes reconnecting lost items with their owners simple and efficient.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 - Glass card */}
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Report</h3>
              <p className="text-gray-600">
                Provide details about the lost or found item, including location, date, and description.
              </p>
            </div>
            {/* Step 2 - Glass card */}
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in animation-delay-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Match</h3>
              <p className="text-gray-600">
                Our system matches lost and found items based on descriptions, locations, and timing.
              </p>
            </div>
            {/* Step 3 - Glass card */}
            <div className="backdrop-blur-md bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in animation-delay-600">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Reconnect</h3>
              <p className="text-gray-600">
                Get connected through our secure platform and arrange to get your items back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Glassmorphism */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Overlapping circles for depth */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 count-up">
              <div className="text-5xl font-bold mb-2 text-white">10k+</div>
              <div className="text-blue-100">Items Found</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 count-up animation-delay-200">
              <div className="text-5xl font-bold mb-2 text-white">8k+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 count-up animation-delay-400">
              <div className="text-5xl font-bold mb-2 text-white">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 count-up animation-delay-600">
              <div className="text-5xl font-bold mb-2 text-white">24h</div>
              <div className="text-blue-100">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Glass cards */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who&apos;ve successfully reconnected with their lost possessions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Glass card */}
            <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in-up">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  SJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Lost Wallet</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;I was devastated when I lost my wallet with all my IDs. Within 48 hours of posting on Find It, I was contacted by the person who found it. Amazing service!&quot;
              </p>
            </div>
            {/* Testimonial 2 - Glass card */}
            <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in-up animation-delay-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">Michael Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Found Keys</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;I found a set of keys at the park and wasn&apos;t sure what to do. Posted them on Find It and was able to return them to the owner the same day. So easy to use!&quot;
              </p>
            </div>
            {/* Testimonial 3 - Glass card */}
            <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 fade-in-up animation-delay-600">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  EC
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">Emily Chen</h4>
                  <p className="text-gray-600 text-sm">Lost Laptop</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;I left my laptop on a train and thought it was gone forever. Thanks to Find It, I was able to get it back in less than a week. I can&apos;t recommend this service enough!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with expanding cards */}
      <section id="faq" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Have questions? We&apos;ve got answers.
            </p>
          </div>
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer">
                Is the service free to use?
                <svg className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <p className="text-gray-600">
                Yes, our basic service is completely free. We offer premium features for users who want enhanced visibility for their lost items.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer">
                How does the matching system work?
                <svg className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <p className="text-gray-600">
                Our AI-powered system matches lost and found reports based on item descriptions, locations, timing, and other relevant factors.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer">
                Is my personal information secure?
                <svg className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <p className="text-gray-600">
                Absolutely. We only share your contact information with matched users, and only after both parties agree to connect.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer">
                What if the item I found is valuable?
                <svg className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <p className="text-gray-600">
                For valuable items, we recommend using our secure handover process, which provides verification of the rightful owner before the exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with glass effect */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="backdrop-blur-md bg-white/10 p-10 rounded-2xl border border-white/20 shadow-2xl fade-in-up">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to find what you&apos;ve lost?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who&apos;ve successfully reconnected with their lost possessions through our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-4 bg-white text-blue-700 rounded-full shadow-xl hover:shadow-blue-300/50 hover:scale-105 transition-all duration-300 font-semibold">
                Report Lost Item
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-xl hover:shadow-green-300/50 hover:scale-105 transition-all duration-300 font-semibold">
                Report Found Item
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with glass effect */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">Find It</h3>
              <p className="text-gray-400">
                Connecting lost items with their owners since 2023.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white transition-colors duration-300">hello@findit.com</li>
                <li className="text-gray-400 hover:text-white transition-colors duration-300">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Find It. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);
} 