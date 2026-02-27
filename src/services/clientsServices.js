import api from './apiBackend';

const getClients = async () => {
  try {
    const response = await api.get('/clients');
    return response.data; // { success, data: [clients] }
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch clients' };
  }
};


const clientService = {
  getClients,

};

export default clientService;
