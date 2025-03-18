export default function Testimonials() {
    return (
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who&apos;ve successfully reconnected with their lost possessions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial cards */}
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
    );
  }