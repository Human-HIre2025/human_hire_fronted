import api from './apiBackend'; // make sure this is your configured Axios instance

const getTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch testimonials' };
  }
};


const testimonialService = {
  getTestimonials,
};

export default testimonialService;
