import { apiClient } from '../config';

export interface Settings {
  general: {
    language: string;
    theme: string;
    notifications: boolean;
    autoStart: boolean;
    soundEffects: boolean;
    animations: boolean;
  };
  advanced: {
    debug: boolean;
    experimental: boolean;
    api: {
      endpoint: string;
      key: string;
    };
    performance: string;
    logging: string;
    cache: {
      enabled: boolean;
      maxSize: number;
    };
  };
  voice: {
    speed: number;
    pitch: number;
    volume: number;
    model: string;
    language: string;
    accent: string;
  };
  display: {
    fontSize: number;
    contrast: number;
    colorScheme: string;
    layout: string;
    animations: boolean;
    accessibility: {
      highContrast: boolean;
      reducedMotion: boolean;
      screenReader: boolean;
    };
  };
}

export const settingsApi = {
  // General settings
  getSettings: async () => {
    return apiClient.get<Settings>('/settings');
  },

  updateSettings: async (settings: Partial<Settings>) => {
    return apiClient.post('/settings/update', settings);
  },

  // Theme settings
  getThemes: async () => {
    return apiClient.get('/settings/themes');
  },

  updateTheme: async (theme: string) => {
    return apiClient.post('/settings/theme', { theme });
  },

  // Language settings
  getLanguages: async () => {
    return apiClient.get('/settings/languages');
  },

  updateLanguage: async (language: string) => {
    return apiClient.post('/settings/language', { language });
  },

  // Voice settings
  getVoiceSettings: async () => {
    return apiClient.get<Settings['voice']>('/settings/voice');
  },

  updateVoiceSettings: async (settings: Partial<Settings['voice']>) => {
    return apiClient.post('/settings/voice', settings);
  },

  // Display settings
  getDisplaySettings: async () => {
    return apiClient.get<Settings['display']>('/settings/display');
  },

  updateDisplaySettings: async (settings: Partial<Settings['display']>) => {
    return apiClient.post('/settings/display', settings);
  },

  // Advanced settings
  getAdvancedSettings: async () => {
    return apiClient.get<Settings['advanced']>('/settings/advanced');
  },

  updateAdvancedSettings: async (settings: Partial<Settings['advanced']>) => {
    return apiClient.post('/settings/advanced', settings);
  },

  // Cache management
  clearCache: async () => {
    return apiClient.post('/settings/cache/clear');
  },

  getCacheSize: async () => {
    return apiClient.get('/settings/cache/size');
  },

  // Reset settings
  resetToDefault: async () => {
    return apiClient.post('/settings/reset');
  },
};
