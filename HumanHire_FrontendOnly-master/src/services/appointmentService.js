import api from './apiBackend'; // your configured Axios instance

// POST /api/appointments - Create new appointment
const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments/', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create appointment' };
  }
};



const appointmentService = {
  createAppointment,
};

export default appointmentService;
