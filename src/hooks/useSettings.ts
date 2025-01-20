import { useQuery } from '@tanstack/react-query';
import { SettingsService } from '@/api/services/settings';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: SettingsService.getSettings,
    staleTime: Infinity, // Veriyi sonsuza kadar taze tut
    gcTime: Infinity, // cacheTime yerine gcTime kullanılıyor artık
  });
} 