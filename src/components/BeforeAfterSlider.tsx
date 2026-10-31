import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BEFORE_AFTER_GALLERY } from '../data/groomingData';
import { TransformationItem } from '../types';
import { Sparkles, Scissors, Clock, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';
import { Image } from './Image';

interface BeforeAfterSliderProps {
  onSelectService?: (serviceName: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<TransformationItem>(BEFORE_AFTER_GALLERY[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Haircuts', 'Dogs', 'Cats'];

  const filteredItems = selectedCategory === 'All'
    ? BEFORE_AFTER_GALLERY
    : BEFORE_AFTER_GALLERY.filter((item) => item.category === selectedCategory);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section id="transformations" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Genuine Transformations</span>
            <span aria-hidden="true">·</span>
            <span>Unretouched Pet Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
            Witness the Gentle Art of <span className="font-editorial italic font-normal text-[#C5A46D]">Pet Transformation</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            Drag the divider to reveal how patient care, botanical nourishment, and master scissoring revive your pet’s radiance and comfort.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-8 p-1.5 bg-[#EEF4EE] rounded-xl max-w-md mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#183D32] text-white shadow-sm'
                    : 'text-[#405445] hover:text-[#183D32]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Comparison Slider (8 cols) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-label="Before and after grooming image comparison"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#DCE8DC] select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#183D32]"
            >
              {/* AFTER Image (Background) */}
              <img
                src={activeItem.afterImage}
                alt={`${activeItem.petName} after grooming`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* BEFORE Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.beforeImage}
                  alt={`${activeItem.petName} before grooming`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%'
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-md tracking-wider">
                BEFORE GROOMING
              </div>
              <div className="absolute top-4 right-4 z-10 bg-[#183D32]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-md tracking-wider">
                AFTER ATELIER GROOM
              </div>

              {/* Divider Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#183D32] flex items-center justify-center text-[#183D32]">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Instruction Hint */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
                <span className="bg-black/50 backdrop-blur-sm text-white/90 text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3 h-3" /> Drag divider left or right
                </span>
              </div>
            </div>
          </div>

          {/* Transformation Details & Case Story (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE8DC] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
                <div>
                  <h3 className="text-2xl font-bold text-[#183D32]">{activeItem.petName}</h3>
                  <p className="text-sm text-[#6A786E] font-medium">{activeItem.petBreed}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-[#6A786E] block">Duration</span>
                  <span className="text-sm font-semibold text-[#183D32] flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> {activeItem.sessionDuration}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Scissors className="w-4 h-4 text-[#C5A46D] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block">
                      Treatment Performed
                    </span>
                    <p className="text-sm font-medium text-[#202923]">
                      {activeItem.serviceRendered}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Stylist Grooming Notes
                  </span>
                  <p className="text-xs sm:text-sm text-[#516155] leading-relaxed italic bg-[#FAF8F3] p-3 rounded-lg border border-[#E8E2D5]">
                    &ldquo;{activeItem.stylistNote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectService && onSelectService(activeItem.serviceRendered)}
                  className="w-full py-3 px-4 bg-[#183D32] hover:bg-[#112B23] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                  Book This Transformation
                </button>
              </div>
            </div>

            {/* Quick Case Thumbnails */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] px-1">
                Select Case Study:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveItem(item);
                      setSliderPosition(50);
                    }}
                    className={`relative p-1 rounded-xl border-2 transition-all text-left overflow-hidden ${
                      activeItem.id === item.id
                        ? 'border-[#183D32] ring-2 ring-[#183D32]/20 bg-white'
                        : 'border-[#E8E2D5] bg-white hover:border-[#C5D4C5]'
                    }`}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-neutral-100 relative">
                      <Image
                        src={item.afterImage}
                        alt={item.petName}
                        fill
                      />
                    </div>
                    <p className="text-xs font-bold text-[#183D32] truncate px-1">{item.petName}</p>
                    <p className="text-[10px] text-[#6A786E] truncate px-1">{item.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
