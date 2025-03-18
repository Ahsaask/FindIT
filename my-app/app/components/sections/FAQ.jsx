export default function FAQ() {
    return (
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
    );
  }