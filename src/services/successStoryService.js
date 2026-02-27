import api from './apiBackend';

// Get all success story types
export const getAllSuccessStoryTypes = async () => {
  try {
    const response = await api.get('/success-stories');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch success story types' };
  }
};

// Get success stories by type (recruitment, marketing, healthcare)
export const getSuccessStoriesByType = async (type) => {
  try {
    const response = await api.get(`/success-stories/type/${type}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Failed to fetch stories for type ${type}` };
  }
};

