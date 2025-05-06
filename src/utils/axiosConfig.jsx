import axios from 'axios';
import AuthService from '../services/authService';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      try {
        // Validate token before using
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }

        const payload = JSON.parse(atob(parts[1]));
        if (!payload || !payload.role || !payload.exp) {
          throw new Error('Invalid token payload');
        }

        // For admin routes, ensure the token has admin role
        if (config.url.includes('/admin/') && 
            payload.role !== 'admin' && 
            payload.role !== 'super_admin') {
          throw new Error('Invalid admin token');
        }

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Token validation error:', error);
        AuthService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = AuthService.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          'http://localhost:4000/api/auth/refresh',
          { refreshToken }
        );

        if (response.data.accessToken && response.data.refreshToken) {
          AuthService.setTokens(response.data.accessToken, response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        AuthService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 