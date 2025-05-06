import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Loading from '../../components/Loading';
import api from '../../utils/axiosConfig';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 30,
    twoFactorAuth: false,
    ipWhitelist: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
        navigate('/admin/login');
        return;
      }

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/security-settings');
      setSettings(response.data);
    } catch (err) {
        setError('Failed to fetch security settings');
      console.error('Error fetching security settings:', err);
    } finally {
        setLoading(false);
    }
  };

    fetchSettings();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.put('/admin/security-settings', settings);
      setSuccess('Security settings updated successfully');
    } catch (err) {
      setError('Failed to update security settings');
      console.error('Error updating security settings:', err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
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
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Password Policy</h2>
            <div className="space-y-4">
              <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireUppercase}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireUppercase: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Require uppercase letters
              </label>
              </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireLowercase}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireLowercase: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Require lowercase letters
                </label>
              </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireNumbers}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireNumbers: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Require numbers
                </label>
              </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireSpecialChars}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireSpecialChars: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Require special characters
                </label>
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                Minimum password length
                </label>
                <input
                  type="number"
                value={settings.passwordPolicy.minLength}
                onChange={(e) => setSettings({
                  ...settings,
                  passwordPolicy: {
                    ...settings.passwordPolicy,
                    minLength: parseInt(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="6"
                />
              </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
              Session timeout (minutes)
                </label>
                <input
                  type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                sessionTimeout: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min="5"
                />
              </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
          <div>
            <label className="flex items-center">
                <input
                  type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({
                  ...settings,
                  twoFactorAuth: e.target.checked
                })}
                className="mr-2"
                />
              Enable two-factor authentication
                </label>
            </div>
          </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">IP Whitelist</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
              IP Addresses (one per line)
                </label>
            <textarea
              value={settings.ipWhitelist.join('\n')}
              onChange={(e) => setSettings({
                ...settings,
                ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="4"
                />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
    </div>
  );
};

export default SecuritySettings; 