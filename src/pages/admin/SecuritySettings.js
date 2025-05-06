import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import Loading from '../../components/Loading';
import AuthService from '../../services/authService';

function SecuritySettings() {
  const [settings, setSettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    loginPolicy: {
      maxAttempts: 5,
      lockoutDuration: 30,
      require2FA: false
    },
    sessionPolicy: {
      sessionTimeout: 15,
      maxConcurrentSessions: 3
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
        navigate('/admin/login');
        return;
      }
      fetchSettings();
    };

    checkAuth();
  }, [navigate]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/security-settings');
      setSettings(response.data);
    } catch (err) {
      console.error('Error fetching security settings:', err);
      setError(err.response?.data?.message || 'Failed to fetch security settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      await api.patch('/admin/security-settings', settings);
      setSuccess('Security settings updated successfully');
    } catch (err) {
      console.error('Error updating security settings:', err);
      setError(err.response?.data?.message || 'Failed to update security settings');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-8">Security Settings</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Password Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Password Policy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Password Length
                </label>
                <input
                  type="number"
                  value={settings.passwordPolicy.minLength}
                  onChange={(e) => handleChange('passwordPolicy', 'minLength', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  min="8"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireUppercase}
                  onChange={(e) => handleChange('passwordPolicy', 'requireUppercase', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Require Uppercase Letters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireNumbers}
                  onChange={(e) => handleChange('passwordPolicy', 'requireNumbers', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Require Numbers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireSpecialChars}
                  onChange={(e) => handleChange('passwordPolicy', 'requireSpecialChars', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Require Special Characters
                </label>
              </div>
            </div>
          </div>

          {/* Login Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Login Policy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.loginPolicy.maxAttempts}
                  onChange={(e) => handleChange('loginPolicy', 'maxAttempts', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  min="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lockout Duration (minutes)
                </label>
                <input
                  type="number"
                  value={settings.loginPolicy.lockoutDuration}
                  onChange={(e) => handleChange('loginPolicy', 'lockoutDuration', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  min="15"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.loginPolicy.require2FA}
                  onChange={(e) => handleChange('loginPolicy', 'require2FA', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Require Two-Factor Authentication
                </label>
              </div>
            </div>
          </div>

          {/* Session Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Session Policy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionPolicy.sessionTimeout}
                  onChange={(e) => handleChange('sessionPolicy', 'sessionTimeout', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  min="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Concurrent Sessions
                </label>
                <input
                  type="number"
                  value={settings.sessionPolicy.maxConcurrentSessions}
                  onChange={(e) => handleChange('sessionPolicy', 'maxConcurrentSessions', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecuritySettings; 