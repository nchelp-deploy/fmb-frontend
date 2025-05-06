import React from 'react';

export default function FirstAlert() {
  const alerts = [
    { id: 1, date: '2025-04-10', message: 'Unusual login detected from new device.' },
    { id: 2, date: '2025-03-30', message: 'Your statement is ready to view.' },
    { id: 3, date: '2025-03-15', message: 'Scheduled maintenance on April 15.' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 animate-fade-in-up">
      <div className="card max-w-lg w-full rounded-2xl shadow-xl p-8 bg-white/90 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in">First Alert</h2>
        <ul className="space-y-4 animate-fade-in-up">
          {alerts.map(alert => (
            <li key={alert.id} className="p-4 rounded-xl bg-blue-50 shadow hover:bg-blue-100 transition-colors duration-150 animate-fade-in-up">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">{alert.date}</span>
              </div>
              <div className="text-gray-700 font-medium">{alert.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 