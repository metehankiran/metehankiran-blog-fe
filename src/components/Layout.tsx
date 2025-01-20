import { useSettings } from '@/hooks/useSettings';

export function Layout() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading) return null; // veya loading spinner

  return (
    <div>
      <title>{settings?.site_name}</title>
    </div>
  );
} 