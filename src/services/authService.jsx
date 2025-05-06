import api from '../utils/axiosConfig';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const REMEMBERED_USERNAME_KEY = 'rememberedUsername';

class AuthService {
  static getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setTokens(accessToken, refreshToken) {
    if (!accessToken || !refreshToken) {
      this.clearTokens();
      return;
    }

    try {
      // Validate token format before storing
      const parts = accessToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      // Validate token payload
      const payload = JSON.parse(atob(parts[1]));
      if (!payload || !payload.userId || !payload.role || !payload.exp) {
        throw new Error('Invalid token payload');
      }

      // Validate role
      if (!['user', 'admin', 'super_admin'].includes(payload.role)) {
        throw new Error('Invalid user role');
      }

      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Token validation error:', error);
      this.clearTokens();
      throw error;
    }
  }

  static clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  static getRememberedUsername() {
    return localStorage.getItem(REMEMBERED_USERNAME_KEY);
  }

  static setRememberedUsername(username) {
    if (username) {
      localStorage.setItem(REMEMBERED_USERNAME_KEY, username);
    } else {
      this.clearRememberedUsername();
    }
  }

  static clearRememberedUsername() {
    localStorage.removeItem(REMEMBERED_USERNAME_KEY);
  }

  static async login(username, password, rememberMe) {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      if (!response.data.accessToken || !response.data.refreshToken) {
        throw new Error('Invalid response from server');
      }

      // Validate and store tokens
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      
      if (rememberMe) {
        this.setRememberedUsername(username);
      } else {
        this.clearRememberedUsername();
      }

      // Get user role from token
      const token = response.data.accessToken;
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));

      console.log('Login successful. User role:', payload.role); // Debug log
      return payload.role;
    } catch (error) {
      console.error('Login error:', error);
      this.clearTokens();
      throw error;
    }
  }

  static async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      if (!response.data.accessToken || !response.data.refreshToken) {
        throw new Error('Invalid response from server');
      }

      this.setTokens(response.data.accessToken, response.data.refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return false;
    }
  }

  static getUserRole() {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) return null;

      const payload = JSON.parse(atob(tokenParts[1]));
      return payload?.role || null;
    } catch (error) {
      return null;
    }
  }

  static isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      return payload && payload.exp && payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  static isAdmin() {
    const role = this.getUserRole();
    return role === 'admin' || role === 'super_admin';
  }

  static async logout() {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
      this.clearRememberedUsername();
    }
  }
}

export default AuthService; 