import { useState } from 'react';
import { useTheme } from '@/components/theme-provider';

interface PostImageProps {
  src: string;
  alt: string;
  height?: 'default' | 'large';
}

// Yardımcı fonksiyon
function generatePlaceholderImage(title: string, height: 'default' | 'large', theme: string) {
  const colors = {
    light: [
      'bg-slate-100 text-slate-600',
      'bg-zinc-100 text-zinc-600',
      'bg-neutral-100 text-neutral-600',
      'bg-stone-100 text-stone-600',
    ],
    dark: [
      'bg-slate-800 text-slate-200',
      'bg-zinc-800 text-zinc-200',
      'bg-neutral-800 text-neutral-200',
      'bg-stone-800 text-stone-200',
    ],
  };

  const colorSet = theme === 'dark' ? colors.dark : colors.light;
  const randomColor = colorSet[Math.floor(Math.random() * colorSet.length)];
  const [bgColor, textColor] = randomColor.split(' ');

  return (
    <div className={`w-full ${height === 'large' ? 'h-[400px]' : 'h-48'} ${bgColor} flex items-center justify-center p-4 transition-colors duration-200`}>
      <p className={`${textColor} text-center font-medium line-clamp-3 ${height === 'large' ? 'text-2xl' : 'text-lg'}`}>
        {title} 
      </p>
    </div>
  );
}

export function PostImage({ src, alt, height = 'default' }: PostImageProps) {
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  return hasError ? (
    generatePlaceholderImage(alt, height, theme || 'light')
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={`w-full ${height === 'large' ? 'h-[400px]' : 'h-48'} object-cover ${height === 'large' ? 'rounded-lg' : ''}`}
      onError={() => setHasError(true)}
    />
  );
} 