import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function useImageLoad(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = (e) => setError(new Error('Failed to load image'));
  }, [src]);

  return { isLoaded, error };
}

export function getImageUrl(src: string, width?: number, quality: number = 75) {
  if (src.startsWith('data:') || src.startsWith('blob:')) return src;
  
  // Handle different image sources
  if (src.includes('ui-avatars.com')) {
    return src;
  }
  
  if (src.includes('placeholder.com')) {
    return src;
  }

  // Add width and quality parameters for optimization
  const url = new URL(src);
  if (width) url.searchParams.set('w', width.toString());
  url.searchParams.set('q', quality.toString());
  
  return url.toString();
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
}: OptimizedImageProps) {
  const { isLoaded, error } = useImageLoad(src);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`image-${src}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [src, priority]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div
      id={`image-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      {isVisible && (
        <img
          src={getImageUrl(src, width, quality)}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          width={width}
          height={height}
        />
      )}
    </div>
  );
} 