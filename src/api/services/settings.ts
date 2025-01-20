import { fetchApi } from '../config';

interface SettingItem {
  key: string;
  value: string;
}

export interface Settings {
  site_name: string;
  site_description: string;
  site_keywords: string;
  site_author: string;
  contact_email: string;
}

export const SettingsService = {
  getSettings: async () => {
    const response = await fetchApi<{ data: SettingItem[] }>('/settings');
    
    // Array'i object'e dönüştür
    const settings = response.data.reduce((acc, item) => ({
      ...acc,
      [item.key]: item.value
    }), {} as Settings);

    return settings;
  },
}; 