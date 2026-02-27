import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token to authenticated requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post('/admin/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  login: async (credentials) => {
    try {
        // console.log('credentials', credentials)
      const response = await apiClient.post('/admin/login', credentials);
    //   console.log('response', response)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  editUser: async (userId, userData, image = null) => {
    try {
      // If there's an image, use FormData to handle file upload
      if (image) {
        const formData = new FormData();
        
        // Add text fields to formData
        Object.keys(userData).forEach(key => {
          if (userData[key] !== undefined && userData[key] !== null) {
            formData.append(key, userData[key]);
          }
        });
        
        // Add image file
        formData.append('image', image);
        
        const response = await apiClient.put(`/admin/edit/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Update stored user data if successful
        if (response.data.success && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
      } else {
        // Regular JSON request without file
        const response = await apiClient.put(`/admin/edit/${userId}`, userData);
        
        // Update stored user data if successful
        if (response.data.success && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
      }
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  getUserDetails: async (userId) => {
    try {
      const response = await apiClient.get(`/admin/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;