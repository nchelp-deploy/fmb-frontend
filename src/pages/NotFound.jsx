import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import FundMeBankLogo from '../components/FundMeBankLogo';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FundMeBankLogo />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-white/90 hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="btn-primary w-full"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default NotFound; 