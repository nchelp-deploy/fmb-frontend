import React from 'react';

export default function FirstLoans() {
  const loans = [
    { id: 1, type: 'Personal Loan', amount: 5000, status: 'Active', due: '2025-12-01' },
    { id: 2, type: 'Auto Loan', amount: 12000, status: 'Paid', due: '2024-08-15' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-2xl w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">First Loans</h2>
        <div className="overflow-x-auto animate-fade-in-up">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-light">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loans.map(loan => (
                <tr key={loan.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700 animate-fade-in-up">{loan.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-right font-semibold animate-fade-in-up">${loan.amount.toLocaleString()}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-center font-semibold animate-fade-in-up ${loan.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{loan.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-center animate-fade-in-up">{loan.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 