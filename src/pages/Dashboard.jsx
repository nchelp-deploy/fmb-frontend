import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowPathIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, CurrencyDollarIcon, CreditCardIcon, DocumentTextIcon, UserPlusIcon, BanknotesIcon, ChartBarIcon, BellAlertIcon, ChatBubbleLeftRightIcon, UserCircleIcon, Cog6ToothIcon, BellIcon, HomeIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Loading from '../components/Loading';
import api from '../utils/axiosConfig';
import { format } from 'date-fns';
import FundMeBankLogo from '../components/FundMeBankLogo';
import authService from '../services/authService';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [bonus, setBonus] = useState(50.00);
  // Placeholder dates from January 2025 to August 2025, no transactions
  const placeholderDates = [
    '2025-01-15', '2025-02-15', '2025-03-15', '2025-04-15',
    '2025-05-15', '2025-06-15', '2025-07-15', '2025-08-15'
  ];
  const [recentTransactions, setRecentTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        const data = await authService.getCurrentUser();
        setUserData(data);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-light flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
          <button
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              navigate('/');
            }}
            className="btn-primary w-full"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Get welcome message based on role
  const getWelcomeMessage = () => {
    return `Welcome, ${userData?.username || 'User'}`;
  };

  // Quick actions with icons and navigation
  const quickActions = [
    { name: 'Wire Transfer', icon: <ArrowUpTrayIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/wire-transfer' },
    { name: 'Local Transfer', icon: <ArrowPathIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/local-transfer' },
    { name: 'Internal Transfer', icon: <ArrowDownTrayIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/internal-transfer' },
    { name: 'Buy Crypto', icon: <CurrencyDollarIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/buy-crypto' },
    { name: 'Pay Bills', icon: <DocumentTextIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/pay-bills' },
    { name: 'Add Beneficiary', icon: <UserPlusIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/add-beneficiary' },
    { name: 'Card Deposit', icon: <CreditCardIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/card-deposit' },
    { name: 'Crypto Deposit', icon: <BanknotesIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/crypto-deposit' },
    { name: 'Savings Statement', icon: <ChartBarIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/transactions', isTransaction: true, label: 'Savings' },
    { name: 'Checking Statement', icon: <ChartBarIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/transactions', isTransaction: true, label: 'Checking' },
    { name: 'First Alert', icon: <BellAlertIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/first-alert' },
    { name: 'First Loans', icon: <CurrencyDollarIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/first-loans' },
    { name: 'First Investments', icon: <ChartBarIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/first-investments' },
    { name: 'First Support', icon: <ChatBubbleLeftRightIcon className="h-7 w-7 mx-auto" />, color: 'bg-primary', route: '/support' },
  ];

  const handleActionClick = (action) => {
    if (action.isTransaction) {
      navigate(action.route, { state: { highlight: action.label } });
    } else {
      navigate(action.route);
    }
  };

  // Bottom navigation actions
  const bottomNav = [
    { name: 'Settings', icon: <Cog6ToothIcon className="h-6 w-6 mx-auto" />, route: '/settings' },
    { name: 'Notifications', icon: <BellIcon className="h-6 w-6 mx-auto" />, route: '/notifications' },
    { name: 'Home', icon: <HomeIcon className="h-6 w-6 mx-auto" />, route: '/dashboard' },
    { name: 'Support', icon: <ChatBubbleLeftRightIcon className="h-6 w-6 mx-auto" />, route: '/support' },
    { name: 'Logout', icon: <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 mx-auto" />, action: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 pb-24 sm:pb-0 animate-fade-in">
      {/* Header */}
      <header className="bg-white/80 shadow-lg rounded-b-2xl px-2 sm:px-0 py-4 mb-2 animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center mb-2 sm:mb-0">
            <FundMeBankLogo />
            <h1 className="text-xl sm:text-2xl font-bold text-primary ml-1 tracking-tight">Fund Me Bank</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 bg-blue-50 rounded-full px-3 py-1 shadow transition-all duration-200">
            <UserCircleIcon className="h-8 w-8 text-primary" />
            <span className="text-gray-700 text-sm sm:text-base font-semibold">{getWelcomeMessage()}</span>
            <button 
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/');
              }}
              className="btn-primary bg-red-500 hover:bg-red-600 text-sm sm:text-base transition-transform duration-150 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in-up">
        {/* Account Summary */}
        <div className="card bg-gradient-to-br from-primary via-blue-700 to-primary-dark text-white mb-8 rounded-2xl shadow-xl animate-fade-in-up">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">Account Summary</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm opacity-80">Available Balance</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight animate-fade-in">${userData?.accountBalance?.toFixed(2) || '0.00'}</p>
              <p className="text-xs mt-1 text-accent font-semibold animate-fade-in">Bonus: ${bonus.toFixed(2)}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm opacity-80">Account Number</p>
              <p className="font-mono text-lg sm:text-xl">**** **** **** 0602</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className={`${action.color} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {action.icon}
              <span className="text-xs sm:text-sm mt-2 block">{action.name}</span>
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="card rounded-2xl shadow-lg p-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Recent Transactions</h2>
            <Link to="/transactions" className="text-primary hover:underline text-xs sm:text-sm font-semibold">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-secondary-light">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userData?.transactions?.slice(0, 3).map((transaction, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 animate-fade-in-up">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-400 italic animate-fade-in-up">{transaction.description}</td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-right text-gray-400 animate-fade-in-up">${Math.abs(transaction.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg sm:hidden">
        <div className="flex justify-around items-center p-2">
          {bottomNav.map((item, index) => (
            <button
              key={index}
              onClick={() => item.action ? item.action() : navigate(item.route)}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
