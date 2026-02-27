import api from './apiBackend';

const getPrivacy = async () => {
  try {
    const response = await api.get('/privacy');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch privacy policy' };
  }
};

const updatePrivacy = async (data) => {
  try {

    const formData = new FormData();
    formData.append('heading', data.heading);
    formData.append('content', data.content);

    const response = await api.put('/privacy', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update privacy policy' };
  }
};

const privacyService = {
  getPrivacy,
  updatePrivacy,
};

export default privacyService;
