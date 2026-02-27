// services/contactService.js
import api from './apiBackend'; // your axios instance with baseURL set


// Create new contact submission (public)
export const createContactSubmission = async (payload) => {
  try {
    const response = await api.post('/contact', payload);
    return response.data; // { success, data: {...}, message }
  } catch (error) {
    throw error.response?.data || error;
  }
};
