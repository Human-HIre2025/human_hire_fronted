import api from './apiBackend';

export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard/dashboard');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
    throw new Error(
      error?.response?.data?.message || 'Failed to fetch dashboard data'
    );
  }
};

export const refreshDashboardCalculations = async () => {
  try {
    const response = await api.post('/dashboard/refresh');
    return response.data;
  } catch (error) {
    console.error('Failed to refresh dashboard calculations', error);
    throw new Error(
      error?.response?.data?.message || 'Failed to refresh dashboard calculations'
    );
  }
};
