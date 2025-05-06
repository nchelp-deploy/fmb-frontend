import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import Loading from '../components/Loading';
import FundMeBankLogo from '../components/FundMeBankLogo';
import { UserGroupIcon, ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import AuthService from '../services/authService';

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    suspendedUsers: 0
  });
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          navigate('/admin/login');
          return;
        }

        if (!AuthService.isAdmin()) {
          AuthService.logout();
          navigate('/admin/login');
          return;
        }

        const fetchData = async () => {
          try {
            setIsLoading(true);
            setError(null);
            const [adminResponse, statsResponse, alertsResponse, usersResponse] = await Promise.all([
              api.get('/admin/profile'),
              api.get('/admin/stats'),
              api.get('/admin/security-alerts'),
              api.get('/admin/users')
            ]);
            
            setAdminData(adminResponse.data);
            setUserStats(statsResponse.data);
            setSecurityAlerts(alertsResponse.data || []);
            setAllUsers(usersResponse.data?.users || []);
          } catch (err) {
            console.error('Admin dashboard error:', err);
            if (err.response?.status === 401) {
              AuthService.logout();
              navigate('/admin/login');
              return;
            }
            setError(err.response?.data?.message || 'Failed to fetch admin data');
          } finally {
            setIsLoading(false);
          }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
      } catch (err) {
        console.error('Auth check error:', err);
        AuthService.logout();
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/admin/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const filteredUsers = (allUsers || []).filter(user => 
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search for user');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    if (!selectedUser || !newBalance) return;

    try {
      await api.patch(`/admin/users/${selectedUser._id}/balance`, {
        newBalance: parseFloat(newBalance)
      });
      
      // Refresh user data
      const response = await api.get('/admin/users');
      setAllUsers(response.data.users || []);
      setSelectedUser(null);
      setNewBalance('');
      
      // Show success message
      alert('Balance updated successfully');
    } catch (err) {
      console.error('Balance update error:', err);
      alert(err.response?.data?.message || 'Failed to update balance');
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-light flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
          <button onClick={handleLogout} className="btn-primary w-full">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-2 sm:gap-0">
            <div className="flex items-center">
              <FundMeBankLogo className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full">
                {adminData?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{userStats.totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{userStats.activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">New Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{userStats.newUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Suspended Users</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{userStats.suspendedUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-white rounded-lg shadow mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by username or email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  disabled={isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* User List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(searchResults.length > 0 ? searchResults : (allUsers || [])).map((user) => (
                    <tr key={user._id}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{user.username || 'N/A'}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{user.email || 'N/A'}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">${(user.balance || 0).toFixed(2)}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm"
                        >
                          Update Balance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Update Balance Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 sm:p-8 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Update Balance for {selectedUser.username}</h3>
              <form onSubmit={handleUpdateBalance}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Balance
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter new balance"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setNewBalance('');
                    }}
                    className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Security Alerts */}
        {securityAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Security Alerts</h2>
              <div className="space-y-3">
                {securityAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-red-50 rounded-lg"
                  >
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{alert.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-red-700">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard; 