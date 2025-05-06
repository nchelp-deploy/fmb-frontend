import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import Loading from '../components/Loading';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import api from '../utils/axiosConfig';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in as admin
    if (AuthService.isAuthenticated() && AuthService.isAdmin()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Clear any existing tokens
      AuthService.clearTokens();

      // Attempt admin login
      const response = await api.post('/auth/login', {
        username: formData.username,
        password: formData.password
      });

      if (!response.data.accessToken || !response.data.refreshToken) {
        throw new Error('Invalid response from server');
      }

      // Store tokens
      AuthService.setTokens(response.data.accessToken, response.data.refreshToken);
      
      // Handle remember me
      if (formData.rememberMe) {
        AuthService.setRememberedUsername(formData.username);
      } else {
        AuthService.clearRememberedUsername();
      }

      // Verify admin role
      const role = AuthService.getUserRole();
      if (role !== 'admin' && role !== 'super_admin') {
        AuthService.logout();
        setError('Access denied. Admin credentials required.');
        return;
      }

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      AuthService.logout();
      if (err.response?.data?.error === 'Authentication failed') {
        setError('Invalid admin credentials');
      } else if (err.response?.data?.error === 'Missing credentials') {
        setError('Please enter both username and password');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="card bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in-up border border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheckIcon className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Admin Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Regular user?{' '}
              <a href="/" className="text-blue-400 hover:underline">
                Go to user login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin; 