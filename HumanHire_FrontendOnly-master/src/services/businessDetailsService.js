import api from './apiBackend'; // your configured Axios instance



// POST /api/business-details
const createBusinessDetail = async (data) => {
  try {
    const response = await api.post('/business-details', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit business detail' };
  }
};


const businessDetailsService = {

  createBusinessDetail,
};

export default businessDetailsService;
