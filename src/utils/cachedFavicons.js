// utils/cachedFavicons.js

import api from '../services/apiBackend';

const CACHE_KEY = 'cached_favicons';
const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export const getCachedFavicons = async () => {
  const cachedRaw = localStorage.getItem(CACHE_KEY);
  if (cachedRaw) {
    try {
      const cached = JSON.parse(cachedRaw);
      const now = Date.now();

      if (now - cached.timestamp < CACHE_EXPIRATION_MS) {
        return cached.data; // Return cached favicons
      }
    } catch {
      // ignore parsing errors
    }
  }

  // Fetch fresh favicons from backend
  const response = await api.get('/favicons');
  if (response.data && response.data.success) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: response.data.data, timestamp: Date.now() })
    );
    return response.data.data;
  }
  return null;
};
