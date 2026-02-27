import api from './apiBackend'; // Your configured Axios instance

// GET /api/favicons
const getFavicons = async () => {
  try {
    const response = await api.get('/favicons');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch favicons' };
  }
};



const faviconsService = {
  getFavicons
};

export default faviconsService;
