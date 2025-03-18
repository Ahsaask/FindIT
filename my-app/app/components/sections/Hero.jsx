export default function Hero() {
    return (
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
    );
  }