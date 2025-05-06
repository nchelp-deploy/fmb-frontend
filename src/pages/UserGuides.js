import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const UserGuides = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using FundMeBank',
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Security Guide',
      description: 'Keep your account safe and secure',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Transfer Guide',
      description: 'Learn how to transfer money',
      icon: <BanknotesIcon className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Card Management',
      description: 'Manage your cards and payments',
      icon: <CreditCardIcon className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/support')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">User Guides</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="grid gap-6">
              {guides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {/* TODO: Navigate to specific guide */}}
                >
                  <div className={`p-3 rounded-full ${guide.color}`}>
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {guide.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {guide.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default UserGuides; 