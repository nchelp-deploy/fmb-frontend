import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  XMarkIcon,
  HomeIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  UserPlusIcon,
  ChartBarIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import AuthService from '../services/authService';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();
  const isAdmin = AuthService.isAdmin();

  const menuItems = [
    { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" />, path: '/dashboard' },
    { name: 'Transactions', icon: <ArrowPathIcon className="h-6 w-6" />, path: '/transactions' },
    { name: 'Wire Transfer', icon: <ArrowUpTrayIcon className="h-6 w-6" />, path: '/wire-transfer' },
    { name: 'Local Transfer', icon: <ArrowPathIcon className="h-6 w-6" />, path: '/local-transfer' },
    { name: 'Internal Transfer', icon: <ArrowDownTrayIcon className="h-6 w-6" />, path: '/internal-transfer' },
    { name: 'Buy Crypto', icon: <CurrencyDollarIcon className="h-6 w-6" />, path: '/buy-crypto' },
    { name: 'Pay Bills', icon: <DocumentTextIcon className="h-6 w-6" />, path: '/pay-bills' },
    { name: 'Add Beneficiary', icon: <UserPlusIcon className="h-6 w-6" />, path: '/add-beneficiary' },
    { name: 'Card Deposit', icon: <CreditCardIcon className="h-6 w-6" />, path: '/card-deposit' },
    { name: 'Savings Statement', icon: <ChartBarIcon className="h-6 w-6" />, path: '/savings-statement' },
    { name: 'Checking Statement', icon: <ChartBarIcon className="h-6 w-6" />, path: '/checking-statement' },
    { name: 'First Alert', icon: <BellAlertIcon className="h-6 w-6" />, path: '/first-alert' },
    { name: 'First Support', icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />, path: '/first-support' },
  ];

  const adminMenuItems = [
    { name: 'Admin Dashboard', icon: <Cog6ToothIcon className="h-6 w-6" />, path: '/admin' },
    { name: 'User Management', icon: <UserCircleIcon className="h-6 w-6" />, path: '/admin/users' },
    { name: 'Security Settings', icon: <Cog6ToothIcon className="h-6 w-6" />, path: '/admin/security' },
    { name: 'Audit Logs', icon: <DocumentTextIcon className="h-6 w-6" />, path: '/admin/audit' },
  ];

  const handleLogout = () => {
    AuthService.logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={onClose}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}

                    {isAdmin && (
                      <div className="mt-6">
                        <h3 className="px-3 py-2 text-sm font-medium text-gray-500">Admin</h3>
                        {adminMenuItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              location.pathname === item.path
                                ? 'bg-blue-50 text-blue-600'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={onClose}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <XMarkIcon className="h-6 w-6" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <UserCircleIcon className="h-6 w-6" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <UserPlusIcon className="h-6 w-6" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 