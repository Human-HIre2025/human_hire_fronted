import api from './apiBackend'; // your axios instance

// GET /api/site-settings
const getSiteSettings = async () => {
  try {
    const response = await api.get('/site-settings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch site settings' };
  }
};

const siteSettingsService = {
  getSiteSettings
};

export default siteSettingsService;
