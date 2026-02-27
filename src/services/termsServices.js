import api from './apiBackend'; // Your configured axios instance

// GET /api/terms
const getTerms = async () => {
  try {
    const response = await api.get('/terms');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch terms & conditions' };
  }
};



const termsService = {
  getTerms,
};

export default termsService;
