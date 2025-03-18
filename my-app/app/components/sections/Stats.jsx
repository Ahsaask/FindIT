export default function Stats() {
    return (
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
    );
  }