import api from './apiBackend';

// Media Service for interacting with Media API endpoints
const mediaService = {
  // Get all media data
  getMedia: async () => {
    try {
      const response = await api.get('media');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Meta Data Operations
  createOrUpdateMetaData: async (metaData) => {
    try {
      const response = await api.post('media/meta', metaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteMetaData: async () => {
    try {
      const response = await api.delete('media/meta');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Hero Section Operations
  createOrUpdateHero: async (heroData) => {
    try {
      const response = await api.post('media/hero', heroData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteHero: async () => {
    try {
      const response = await api.delete('media/hero');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Articles Section Operations
  createOrUpdateArticles: async (articlesData, imageFiles) => {
    try {
      const formData = new FormData();
      formData.append('heading', articlesData.heading || '');
      formData.append('description', articlesData.description || '');
      
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });
      }

      const response = await api.post('media/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteArticles: async () => {
    try {
      const response = await api.delete('media/articles');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Banner Section Operations
  createOrUpdateBanner: async (bannerData, bgImageFile) => {
    try {
      const formData = new FormData();
      formData.append('heading', bannerData.heading || '');
      formData.append('text', bannerData.text || '');
      
      if (bgImageFile) {
        formData.append('bgImage', bgImageFile);
      }

      const response = await api.post('media/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteBanner: async () => {
    try {
      const response = await api.delete('media/banner');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default mediaService;