import React, { createContext, useContext, useEffect, useState } from 'react';
import siteSettingsService from '../services/siteSettingsService';

// Create context object
const SiteSettingsContext = createContext();

// Provider component to wrap your app
export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch site settings once on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await siteSettingsService.getSiteSettings();
        setSettings(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch site settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Context value with data + states
  const value = { settings, loading, error };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

// Custom hook to consume the context easily
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
