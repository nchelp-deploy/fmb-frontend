import React from 'react';

export default function CheckingStatement() {
  const transactions = [
    { id: 1, date: '2025-04-05', description: 'POS Purchase', amount: -120.00, type: 'debit' },
    { id: 2, date: '2025-03-28', description: 'Deposit', amount: 2000.00, type: 'credit' },
    { id: 3, date: '2025-03-20', description: 'ATM Withdrawal', amount: -300.00, type: 'debit' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-2xl w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">Checking Statement</h2>
        <div className="mb-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Account Number:</span>
            <span className="font-mono text-primary">**** 0602</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Current Balance:</span>
            <span className="font-bold text-green-600">$1,580.00</span>
          </div>
        </div>
        <div className="overflow-x-auto animate-fade-in-up">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-light">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 animate-fade-in-up">{tx.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700 animate-fade-in-up">{tx.description}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-right font-semibold animate-fade-in-up ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>{tx.type === 'credit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 