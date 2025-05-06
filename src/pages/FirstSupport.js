import React from 'react';

export default function FirstSupport() {
  const faqs = [
    { q: 'How do I reset my password?', a: 'Click on "Forgot password" at login and follow the instructions.' },
    { q: 'How do I contact support?', a: 'Fill the form below or email support@fundmebank.com.' },
    { q: 'How do I add a beneficiary?', a: 'Go to Quick Actions > Add Beneficiary and fill in the details.' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-2xl w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">First Support</h2>
        <form className="space-y-4 mb-8 animate-fade-in-up">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email</label>
            <input className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-primary focus:border-primary transition-all duration-200" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-primary focus:border-primary transition-all duration-200" placeholder="How can we help you?" rows={3} />
          </div>
          <button type="submit" className="w-full btn-primary mt-4 transition-transform duration-150 hover:scale-105 active:scale-95">Send Message</button>
        </form>
        <div className="mb-4 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-primary mb-2">Frequently Asked Questions</h3>
          <ul className="space-y-3">
            {faqs.map((faq, idx) => (
              <li key={idx} className="bg-blue-50 rounded-lg p-3 shadow animate-fade-in-up">
                <div className="font-semibold text-gray-700 mb-1">Q: {faq.q}</div>
                <div className="text-gray-600">A: {faq.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 