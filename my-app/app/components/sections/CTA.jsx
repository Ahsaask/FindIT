export default function CTA() {
    return (
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
    );
  }