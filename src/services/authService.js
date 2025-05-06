import api from '../utils/axiosConfig';

const TOKEN_KEY = 'token';
const REMEMBERED_USERNAME_KEY = 'rememberedUsername';
const USER_DATA_KEY = 'userData';

export const login = async (username, password, rememberMe = false) => {
  try {
    console.log('Attempting login with:', { username, rememberMe });
    
    // Clear any existing data before attempting login
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    delete api.defaults.headers.common['Authorization'];

    console.log('Making login request to backend...');
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response received:', response.data);
    
    const { user, token } = response.data;
    
    if (!user || !token) {
      console.error('Invalid login response:', { user: !!user, token: !!token });
      throw new Error('Invalid login response: missing user or token');
    }
    
    // Validate token format
    if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
      console.error('Invalid token format:', token);
      throw new Error('Invalid token format');
    }
    
    // Store token and user data
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountBalance: user.accountBalance
    };
    
    console.log('Storing user data:', userData);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    
    if (rememberMe) {
      localStorage.setItem(REMEMBERED_USERNAME_KEY, username);
    } else {
      localStorage.removeItem(REMEMBERED_USERNAME_KEY);
    }
    
    // Update axios default headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Login successful, token stored and headers updated');
    
    return userData;
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Clear any stored data on login failure
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(REMEMBERED_USERNAME_KEY);
    delete api.defaults.headers.common['Authorization'];

    if (error.response) {
      throw new Error(error.response.data?.details || error.response.data?.error || 'Login failed');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'Login failed');
    }
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBERED_USERNAME_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  delete api.defaults.headers.common['Authorization'];
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    if (!response.data) {
      throw new Error('No data received from profile endpoint');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) {
      logout();
      return false;
    }
    
    return true;
  } catch (e) {
    logout();
    return false;
  }
};

export const isAdmin = () => {
  try {
    const userData = getUserData();
    return userData && (userData.role === 'admin' || userData.role === 'super_admin');
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const getRememberedUsername = () => {
  return localStorage.getItem(REMEMBERED_USERNAME_KEY);
};

export const getUserData = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const authService = {
  login,
  logout,
  getUserProfile,
  isAuthenticated,
  isAdmin,
  getRememberedUsername,
  getUserData
};
export default authService; 