import React from 'react';

function FundMeBankLogo({ className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800">
        <span className="text-white font-bold text-xl">FMB</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-800">FundMeBank</span>
        <span className="text-xs text-gray-500">Secure Banking</span>
      </div>
    </div>
  );
}

export default FundMeBankLogo; 