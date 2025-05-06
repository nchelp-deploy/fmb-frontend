import React, { useState } from 'react';
import { 
  BellIcon,
  ShieldExclamationIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from your device',
      timestamp: '2 hours ago',
      icon: <ShieldExclamationIcon className="h-6 w-6" />,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 2,
      type: 'transaction',
      title: 'Transaction Completed',
      message: 'Successfully transferred $500 to John Doe',
      timestamp: '5 hours ago',
      icon: <BanknotesIcon className="h-6 w-6" />,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'card',
      title: 'Card Update',
      message: 'Your card will expire in 30 days',
      timestamp: '1 day ago',
      icon: <CreditCardIcon className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-100'
    }
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            )}
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
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${notification.color}`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {notification.message}
                      </p>
                      <p className="text-gray-400 text-xs mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BellIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">
                No New Notifications
              </h3>
              <p className="text-gray-500 text-sm">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Notifications; 