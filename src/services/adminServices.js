// src/services/adminServices.js

import api from './apiBackend';

const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('/admin/register', adminData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

const logoutAdmin = async () => {
  try {
    const response = await api.get('/admin/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

const getAdminProfile = async () => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get admin profile' };
  }
};

// ✅ FIX: default export added
const adminService = {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
};

export default adminService;
