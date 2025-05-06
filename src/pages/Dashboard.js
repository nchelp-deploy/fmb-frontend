import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCardIcon, 
  ChatBubbleLeftRightIcon, 
  UserCircleIcon, 
  WalletIcon,
  BanknotesIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Loading from '../components/Loading';
import BottomNav from '../components/BottomNav';
import AuthService from '../services/authService';
import { motion } from 'framer-motion';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCard, setActiveCard] = useState('total');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        if (AuthService.isAdmin()) {
          navigate('/admin');
          return;
        }

        const fetchUserData = async () => {
          try {
            setIsLoading(true);
            setError(null);
            const response = await AuthService.getUserProfile();
            if (response && response.user) {
              setUserData(response.user);
            } else {
              throw new Error('Invalid user data received');
            }
          } catch (error) {
            console.error('Dashboard error:', error);
            if (error.response?.status === 401) {
              AuthService.logout();
              navigate('/login');
              return;
            }
            setError('Failed to load user data');
          } finally {
            setIsLoading(false);
          }
        };

        fetchUserData();
      } catch (err) {
        console.error('Auth check error:', err);
        AuthService.logout();
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const quickActions = [
    { 
      name: 'Send Money', 
      icon: <ArrowUpTrayIcon className="h-6 w-6" />, 
      color: 'from-blue-600 to-blue-400',
      route: '/wire-transfer',
      description: 'Transfer funds'
    },
    { 
      name: 'Receive', 
      icon: <ArrowDownTrayIcon className="h-6 w-6" />, 
      color: 'from-purple-600 to-purple-400',
      route: '/receive',
      description: 'Get paid'
    },
    { 
      name: 'Pay Bills', 
      icon: <DocumentTextIcon className="h-6 w-6" />, 
      color: 'from-pink-600 to-pink-400',
      route: '/pay-bills',
      description: 'Utility & more'
    },
    { 
      name: 'Investments', 
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />, 
      color: 'from-green-600 to-green-400',
      route: '/investments',
      description: 'Grow wealth'
    },
    { 
      name: 'Add Beneficiary', 
      icon: <UserPlusIcon className="h-6 w-6" />, 
      color: 'from-yellow-600 to-yellow-400',
      route: '/add-beneficiary',
      description: 'New recipients'
    },
    { 
      name: 'Card Deposit', 
      icon: <CreditCardIcon className="h-6 w-6" />, 
      color: 'from-indigo-600 to-indigo-400',
      route: '/card-deposit',
      description: 'Add funds'
    },
    { 
      name: 'Statements', 
      icon: <DocumentTextIcon className="h-6 w-6" />, 
      color: 'from-cyan-600 to-cyan-400',
      route: '/statements',
      description: 'View reports'
    },
    { 
      name: 'Security', 
      icon: <ShieldCheckIcon className="h-6 w-6" />, 
      color: 'from-red-600 to-red-400',
      route: '/security',
      description: 'Stay safe'
    }
  ];

  const handleActionClick = (action) => {
    navigate(action.route);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-lg sm:text-xl font-bold">FundMeBank</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <h1 className="text-lg sm:text-xl font-bold">{userData?.username}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Balance Cards Section */}
        <div className="relative mb-6 sm:mb-8">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {/* Total Balance Card */}
            <motion.div 
              className={`flex-shrink-0 w-[280px] sm:w-72 snap-start ${
                activeCard === 'total' ? 'scale-100' : 'scale-95 opacity-80'
              }`}
              onClick={() => setActiveCard('total')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 sm:p-6 rounded-2xl shadow-lg text-white h-44 sm:h-48">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div>
                    <p className="text-sm opacity-80">Total Balance</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">
                      {formatBalance(userData?.accountBalance)}
                    </p>
                  </div>
                  <WalletIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs sm:text-sm opacity-80">**** **** **** 4289</p>
                  <CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
              </div>
            </motion.div>

            {/* Savings Card */}
            <motion.div 
              className={`flex-shrink-0 w-[280px] sm:w-72 snap-start ${
                activeCard === 'savings' ? 'scale-100' : 'scale-95 opacity-80'
              }`}
              onClick={() => setActiveCard('savings')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 sm:p-6 rounded-2xl shadow-lg text-white h-44 sm:h-48">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div>
                    <p className="text-sm opacity-80">Savings Account</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">
                      {formatBalance(userData?.accountBalance * 0.4)}
                    </p>
                  </div>
                  <BuildingOfficeIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs sm:text-sm opacity-80">**** **** **** 3391</p>
                  <CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
              </div>
            </motion.div>

            {/* Checking Card */}
            <motion.div 
              className={`flex-shrink-0 w-[280px] sm:w-72 snap-start ${
                activeCard === 'checking' ? 'scale-100' : 'scale-95 opacity-80'
              }`}
              onClick={() => setActiveCard('checking')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-5 sm:p-6 rounded-2xl shadow-lg text-white h-44 sm:h-48">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div>
                    <p className="text-sm opacity-80">Checking Account</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">
                      {formatBalance(userData?.accountBalance * 0.6)}
                    </p>
                  </div>
                  <BanknotesIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs sm:text-sm opacity-80">**** **** **** 8854</p>
                  <CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => handleActionClick(action)}
                className={`bg-gradient-to-br ${action.color} p-4 rounded-xl shadow-sm text-white`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 p-2 sm:p-3 rounded-full mb-2 sm:mb-3">
                    {action.icon}
                  </div>
                  <span className="text-sm sm:text-base font-medium">{action.name}</span>
                  <span className="text-xs opacity-80 mt-0.5 sm:mt-1">{action.description}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <button 
              onClick={() => navigate('/transactions')}
              className="text-blue-600 flex items-center text-xs sm:text-sm font-medium"
            >
              View All
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm">
            {/* Empty State */}
            <div className="p-4 sm:p-6 text-center">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 sm:mb-4">
                <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              </div>
              <h3 className="text-sm sm:text-base text-gray-900 font-medium mb-1">No Recent Transactions</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">Your recent transactions will appear here</p>
              
              {/* Transaction Headers */}
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-500">
                  <div className="text-left">Date</div>
                  <div className="text-left">Time</div>
                  <div className="text-left">Transaction ID</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-gray-400">
                  ── No transactions to display ──
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default Dashboard;
