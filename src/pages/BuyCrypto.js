import React from 'react';

export default function BuyCrypto() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-md w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">Buy Crypto</h2>
        <form className="space-y-4 animate-fade-in-up">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cryptocurrency</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-primary focus:border-primary transition-all duration-200">
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>USDT (Tether)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (USD)</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-primary focus:border-primary transition-all duration-200" placeholder="$0.00" />
          </div>
          <button type="submit" className="w-full btn-primary mt-4 transition-transform duration-150 hover:scale-105 active:scale-95">Buy Crypto</button>
        </form>
      </div>
    </div>
  );
} 