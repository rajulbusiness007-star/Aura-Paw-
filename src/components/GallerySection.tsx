import React, { useState } from 'react';
import { Instagram, Facebook, Maximize2, X, Heart } from 'lucide-react';
import { Image } from './Image';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Dogs' | 'Cats' | 'Salon & Staff';
  imageUrl: string;
}

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Fluffy Golden Doodle Portrait',
      subtitle: 'Teddy-bear scissor finish and silk leave-in',
      category: 'Dogs',
      imageUrl: '/assets/images/hero_groomed_dog_1793371516993.jpg'
    },
    {
      id: 'g-2',
      title: 'Cockapoo Teddy Bear Makeover',
      subtitle: 'Rounded cheeks, clear eye-trim and velvety ears',
      category: 'Dogs',
      imageUrl: '/assets/images/grooming_after_dog_1793371518089.jpg'
    },
    {
      id: 'g-3',
      title: 'Serene British Shorthair Groom',
      subtitle: 'Silk & chamomile calming wash in our private feline suite',
      category: 'Cats',
      imageUrl: '/assets/images/cat_grooming_after_1793371518507.jpg'
    },
    {
      id: 'g-4',
      title: 'Master Groomer at Work',
      subtitle: 'Elena gently brushing a calm terrier companion',
      category: 'Salon & Staff',
      imageUrl: '/assets/images/groomer_artisan_1793371518503.jpg'
    },
    {
      id: 'g-5',
      title: 'Gentle Hydrobath Relaxation',
      subtitle: 'Warm botanical lather with colloidal oatmeal',
      category: 'Dogs',
      imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g-6',
      title: 'Happy Post-Groom Moments',
      subtitle: 'Velvety trimmed paws and custom forest green bandanna',
      category: 'Dogs',
      imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filters = ['All', 'Dogs', 'Cats', 'Salon & Staff'];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
              <span>Atelier Moments</span>
              <span aria-hidden="true">·</span>
              <span>Visual Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance">
              Captured Moments of Joy &amp; Radiance
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#E8E2D5] text-xs font-semibold text-[#183D32] hover:bg-[#EEF4EE] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#C5A46D]" />
              <span>@aurapaw.atelier</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#E8E2D5] text-xs font-semibold text-[#183D32] hover:bg-[#EEF4EE] transition-colors"
            >
              <Facebook className="w-4 h-4 text-[#183D32]" />
              <span>Aura &amp; Paw SF</span>
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E8E2D5] w-fit mb-8">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeFilter === f
                  ? 'bg-[#183D32] text-white shadow-sm'
                  : 'text-[#405445] hover:text-[#183D32]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry / Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#DCE8DC] bg-white cursor-pointer aspect-[4/3]"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A46D] mb-1">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold leading-snug">{item.title}</h4>
                <p className="text-xs text-white/80 mt-1">{item.subtitle}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-white/90">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to expand photo
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-700">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-neutral-900 flex items-center justify-center p-2">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                priority
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-6 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#C5A46D] uppercase tracking-wider block">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-xl font-bold text-[#183D32]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#516155]">{selectedPhoto.subtitle}</p>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FAF8F3] hover:bg-[#EEF4EE] border border-[#E8E2D5] text-xs font-semibold text-[#183D32] rounded-xl flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#C5A46D]" />
                <span>View on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};