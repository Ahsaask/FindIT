'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "Is the service free to use?",
      answer: "Yes, our basic service is completely free. We offer premium features for users who want enhanced visibility for their lost items."
    },
    {
      question: "How does the matching system work?",
      answer: "Our AI-powered system matches lost and found reports based on item descriptions, locations, timing, and other relevant factors."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We only share your contact information with matched users, and only after both parties agree to connect."
    },
    {
      question: "What if the item I found is valuable?",
      answer: "For valuable items, we recommend using our secure handover process, which provides verification of the rightful owner before the exchange."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Have questions? We&apos;ve got answers.
          </p>
        </div>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <h3 
                className="font-semibold text-lg mb-2 flex justify-between items-center cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.question}
                <svg 
                  className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <div 
                className={`text-gray-600 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}