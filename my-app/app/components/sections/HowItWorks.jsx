export default function HowItWorks() {
    return (
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
    );
  }