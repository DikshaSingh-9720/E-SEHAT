import axios from 'axios';

const API_BASE = '/api/auth';

const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      const { token, user } = res.data;

      // Store token securely (consider using HttpOnly cookies for production)
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed'
      };
    }
  },

  register: async ({ name, email, password, role }) => {
    try {
      const res = await axios.post(`${API_BASE}/register`, {
        name,
        email,
        password,
        role
      });
      return { success: true, user: res.data.user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed'
      };
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  }
};

export default authService;