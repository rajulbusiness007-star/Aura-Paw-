import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/groomingData';
import { GroomingService } from '../types';
import { Check, Clock, Sparkles, ChevronRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<GroomingService | null>(null);

  const categories = ['All', 'Full Grooming', 'Haircuts', 'Bath & Spa', 'Specialty'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Tailored Pet Care</span>
            <span aria-hidden="true">·</span>
            <span>12 Bespoke Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
            Artisanal <span className="font-editorial italic font-normal text-[#C5A46D]">Grooming Menu</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            Every pet arrives as an individual. We match our botanical shampoos, water temperature, handling rhythm, and scissor profiles to your pet’s exact breed and emotional state.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center flex-wrap gap-2 mt-8 p-1.5 bg-[#FAF8F3] rounded-xl border border-[#E8E2D5] w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#183D32] text-white shadow-sm'
                    : 'text-[#405445] hover:text-[#183D32]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                service.featured
                  ? 'bg-[#FAF8F3] border-[#183D32]/30 ring-1 ring-[#183D32]/10'
                  : 'bg-white border-[#E8E2D5] hover:border-[#C5D4C5]'
              }`}
            >
              <div>
                {/* Card Header & Price */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#183D32] leading-snug">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-[#6A786E] block">From</span>
                    <span className="text-2xl font-extrabold text-[#183D32] tabular-nums font-mono">
                      ${service.startingPrice}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#516155] leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Pet Suitability */}
                <div className="mb-4 py-2 px-3 bg-[#EEF4EE] rounded-lg text-xs text-[#183D32] font-medium flex items-start gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#183D32] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold">Ideal For:</strong> {service.suitableFor}
                  </span>
                </div>

                {/* Treatment Includes */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block">
                    Treatment Includes:
                  </span>
                  <ul className="space-y-1.5">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#202923]">
                        <Check className="w-3.5 h-3.5 text-[#183D32] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#6A786E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> ~{service.durationMinutes} mins
                </span>
                <button
                  type="button"
                  onClick={() => onBookService(service.name)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#183D32] hover:bg-[#112B23] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <span>Book Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Difference: Basic vs Full vs Presidential Spa Comparison */}
        <div className="mt-20 pt-16 border-t border-[#E8E2D5]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#183D32] block mb-2">
              Transparent Service Tiers
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#183D32]">
              Which Grooming Experience is Right For Your Pet?
            </h3>
            <p className="text-sm text-[#516155] mt-2">
              Compare our core salon packages at a glance to ensure your pet receives exactly what their coat and temperament require.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#DCE8DC] bg-[#FAF8F3]">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#DCE8DC] bg-white">
                  <th className="p-4 sm:p-5 text-sm font-bold text-[#183D32]">Care Feature</th>
                  <th className="p-4 sm:p-5 text-sm font-bold text-[#183D32]">Essential Bath</th>
                  <th className="p-4 sm:p-5 text-sm font-bold text-[#183D32] bg-[#EEF4EE]">
                    Signature Full Groom (Popular)
                  </th>
                  <th className="p-4 sm:p-5 text-sm font-bold text-[#183D32]">Royal Atelier Spa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D5] text-xs sm:text-sm text-[#202923]">
                <tr>
                  <td className="p-4 font-medium">Warm Botanical Hydrobath & Conditioning</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold bg-[#EEF4EE]">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Hand Fluff Dry (100% Zero Cage Drying)</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold bg-[#EEF4EE]">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Nail Trim, Rotary Buffing & Paw Pad Balm</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold bg-[#EEF4EE]">Included</td>
                  <td className="p-4 text-emerald-800 font-semibold">Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Ear Hygiene Flush & Teeth Brushing</td>
                  <td className="p-4 text-[#6A786E]">Ear only</td>
                  <td className="p-4 text-emerald-800 font-semibold bg-[#EEF4EE]">Both Included</td>
                  <td className="p-4 text-emerald-800 font-semibold">Both Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Full Bespoke Hand-Scissored Haircut</td>
                  <td className="p-4 text-[#6A786E]">Sanitary tidy only</td>
                  <td className="p-4 text-emerald-800 font-semibold bg-[#EEF4EE]">Full Breed Styling</td>
                  <td className="p-4 text-emerald-800 font-semibold">Master Stylist Sculpting</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Dead Sea Mineral or Argan Moisture Mask</td>
                  <td className="p-4 text-[#6A786E]">—</td>
                  <td className="p-4 text-[#6A786E]">Available as Add-on</td>
                  <td className="p-4 text-emerald-800 font-semibold">Full 15-min Warm Wrap</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Starting Guide Price</td>
                  <td className="p-4 font-mono font-bold text-base text-[#183D32]">$55</td>
                  <td className="p-4 font-mono font-bold text-base text-[#183D32] bg-[#EEF4EE]">$85</td>
                  <td className="p-4 font-mono font-bold text-base text-[#183D32]">$125</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
