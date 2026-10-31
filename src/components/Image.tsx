import React, { useState, useEffect, useRef } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Optional class for the wrapping relative container */
  containerClassName?: string;
  /** Optional custom class for the loading skeleton / placeholder */
  placeholderClassName?: string;
  /** When true, expands absolute inset-0 to fill parent with object-cover */
  fill?: boolean;
  /** When true, marks image as above-the-fold priority: loading="eager" & fetchPriority="high" */
  priority?: boolean;
  /** Fallback image URL if primary src fails to load */
  fallbackSrc?: string;
  /** Whether to render the subtle shimmer light effect across the placeholder (default: true) */
  showShimmer?: boolean;
}

/**
 * Custom Image Component:
 * - Native browser lazy loading (loading="lazy" by default, decoding="async")
 * - Progressive placeholder blur-up effect on image load
 * - Immediate detection of cached images to prevent layout flicker
 * - Zero-broken-image policy with luxury brand-matched fallback
 * - Full accessibility compliance (prefers-reduced-motion, alt preservation)
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderClassName = '',
  fill = false,
  priority = false,
  loading,
  fallbackSrc,
  showShimmer = true,
  onLoad,
  onError,
  style,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Sync currentSrc if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    // If browser already has image cached in memory
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  // Check on initial mount for cached status
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoaded(true); // stop skeleton
    }
    if (onError) {
      onError(e);
    }
  };

  // Determine native loading strategy
  const resolvedLoading = priority ? 'eager' : (loading || 'lazy');
  const resolvedFetchPriority: 'high' | 'auto' = priority ? 'high' : 'auto';

  // Base positioning: if fill is requested, container must be absolute inset-0
  const containerBase = fill
    ? 'absolute inset-0 w-full h-full overflow-hidden'
    : 'relative overflow-hidden inline-block';

  return (
    <div className={`${containerBase} ${containerClassName}`}>
      {/* 1. Placeholder Skeleton with Blur & Shimmer (Active while !isLoaded) */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-0 bg-[#F4F1EA] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${placeholderClassName}`}
        >
          {/* Subtle warm ambient wash */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E8E2D5]/70 via-[#F4F1EA] to-[#EEF4EE]/60" />

          {/* Shimmer light sweep */}
          {showShimmer && (
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none motion-reduce:hidden" />
          )}

          {/* Subtle watermark brand icon */}
          <div className="relative text-[#183D32]/15 flex flex-col items-center gap-1.5 select-none pointer-events-none">
            <Sparkles className="w-6 h-6 animate-pulse motion-reduce:animate-none" />
          </div>
        </div>
      )}

      {/* 2. Error Fallback (Zero-Broken-Image Policy) */}
      {hasError ? (
        <div
          role="img"
          aria-label={alt || 'Image failed to load'}
          className={`w-full h-full min-h-[120px] bg-[#FAF8F3] border border-[#E8E2D5] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        >
          <div className="w-10 h-10 rounded-full bg-[#EEF4EE] text-[#183D32] flex items-center justify-center mb-2 shadow-xs">
            <ImageOff className="w-5 h-5 opacity-70" />
          </div>
          <span className="text-xs font-semibold text-[#183D32] block max-w-xs truncate">
            {alt || 'Pet Care Visual'}
          </span>
          <span className="text-[10px] text-[#6A786E] mt-0.5">
            Aura &amp; Paw Salon Atelier
          </span>
        </div>
      ) : (
        /* 3. The Real Image with Native Lazy-Loading & Blur Transition */
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={resolvedLoading}
          decoding="async"
          fetchPriority={resolvedFetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          style={style}
          className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
            isLoaded
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-md scale-[1.04]'
          } ${fill ? 'w-full h-full object-cover' : ''} ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};

export default Image;
