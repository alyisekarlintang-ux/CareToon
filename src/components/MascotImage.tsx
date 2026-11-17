import { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MascotImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackBg?: string;
}

export function MascotImage({
  src,
  alt,
  className = '',
  fallbackBg = 'bg-[#DCEBFA]',
}: MascotImageProps) {
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl p-6 text-center ${fallbackBg} ${className}`}
        role="img"
        aria-label={alt}
      >
        <HeartHandshake className="h-12 w-12 text-[#2F5FB3] mb-2" aria-hidden="true" />
        <span className="text-sm font-semibold text-[#1F3A70]">{t.mascotFallbackRole}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
