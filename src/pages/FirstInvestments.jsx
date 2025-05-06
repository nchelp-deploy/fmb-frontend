import React from 'react';

export default function FirstInvestments() {
  const investments = [
    { id: 1, product: 'Mutual Fund', amount: 3000, status: 'Active', since: '2023-09-01' },
    { id: 2, product: 'Stocks', amount: 1500, status: 'Active', since: '2024-01-15' },
    { id: 3, product: 'ETF', amount: 2000, status: 'Closed', since: '2022-05-10' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-2xl w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">First Investments</h2>
        <div className="overflow-x-auto animate-fade-in-up">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-light">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Since</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map(inv => (
                <tr key={inv.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700 animate-fade-in-up">{inv.product}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-right font-semibold animate-fade-in-up">${inv.amount.toLocaleString()}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-center font-semibold animate-fade-in-up ${inv.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{inv.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-center animate-fade-in-up">{inv.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 