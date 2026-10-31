import React, { useState } from 'react';
import { PRICING_PACKAGES } from '../data/groomingData';
import { Check, Sparkles, Calculator, Info, ArrowRight } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectPackageForBooking: (packageName: string, estimatedCost: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectPackageForBooking }) => {
  // Calculator state
  const [petCategory, setPetCategory] = useState<'dog' | 'cat'>('dog');
  const [petWeight, setPetWeight] = useState<'toy' | 'small' | 'medium' | 'large' | 'giant'>('medium');
  const [coatType, setCoatType] = useState<'short' | 'medium' | 'double' | 'curly'>('curly');
  const [selectedTier, setSelectedTier] = useState<'essential' | 'signature' | 'presidential'>('signature');
  const [addons, setAddons] = useState<string[]>(['teeth']);

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pricing formula
  const calculateEstimate = () => {
    let base = 55;
    let duration = 60;

    if (petCategory === 'cat') {
      base = 75;
      duration = 60;
      if (selectedTier === 'signature') { base += 25; duration += 30; }
      if (selectedTier === 'presidential') { base += 50; duration += 45; }
    } else {
      // Dog base
      if (selectedTier === 'essential') base = 55;
      if (selectedTier === 'signature') base = 85;
      if (selectedTier === 'presidential') base = 125;

      // Weight multiplier
      if (petWeight === 'toy') { base -= 10; duration -= 15; }
      else if (petWeight === 'small') { base += 0; duration += 0; }
      else if (petWeight === 'medium') { base += 15; duration += 15; }
      else if (petWeight === 'large') { base += 35; duration += 30; }
      else if (petWeight === 'giant') { base += 60; duration += 45; }

      // Coat multiplier
      if (coatType === 'double') { base += 20; duration += 20; }
      if (coatType === 'curly') { base += 25; duration += 30; }
    }

    // Addons
    if (addons.includes('teeth')) base += 18;
    if (addons.includes('deshed')) { base += 30; duration += 25; }
    if (addons.includes('pawbalm')) base += 15;
    if (addons.includes('flea')) base += 25;

    const minPrice = base;
    const maxPrice = Math.round(base * 1.18);

    return { minPrice, maxPrice, duration };
  };

  const estimate = calculateEstimate();
  const estimateString = `$${estimate.minPrice} – $${estimate.maxPrice}`;

  return (
    <section id="pricing" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Honest & Upfront</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
            Transparent Pricing &amp; <span className="font-editorial italic font-normal text-[#C5A46D]">Tailored Packages</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            Every quote is clearly itemized before grooming begins. Use our instant estimate tool below or choose from our signature packages.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between border transition-all ${
                pkg.popular
                  ? 'bg-white border-[#183D32] ring-2 ring-[#183D32]/10 shadow-lg relative'
                  : 'bg-white border-[#E8E2D5] hover:border-[#C5D4C5]'
              }`}
            >
              <div>
                {pkg.popular && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#183D32] text-white px-2.5 py-1 rounded-full mb-3">
                    Most Requested
                  </span>
                )}
                <span className="text-xs font-semibold text-[#6A786E] block mb-1">
                  {pkg.tier}
                </span>
                <h3 className="text-xl font-bold text-[#183D32] mb-3 leading-snug">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="text-xs text-[#6A786E]">From </span>
                  <span className="text-3xl font-extrabold text-[#183D32] font-mono tabular-nums">
                    ${pkg.startingPrice}
                  </span>
                  <span className="text-xs text-[#6A786E] block mt-1">
                    Final price based on size &amp; coat
                  </span>
                </div>

                <p className="text-xs text-[#516155] mb-5 italic bg-[#FAF8F3] p-2.5 rounded-lg border border-[#E8E2D5]">
                  {pkg.idealFor}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#202923]">
                        <Check className="w-3.5 h-3.5 text-[#183D32] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D5]">
                <button
                  type="button"
                  onClick={() => onSelectPackageForBooking(pkg.name, `From $${pkg.startingPrice}`)}
                  className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    pkg.popular
                      ? 'bg-[#183D32] hover:bg-[#112B23] text-white shadow-sm'
                      : 'bg-[#FAF8F3] hover:bg-[#EEF4EE] text-[#183D32] border border-[#DCE8DC]'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Grooming Quote Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8DC] shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E8E2D5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4EE] text-[#183D32] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#183D32]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#183D32]">
                  Interactive Pet Grooming Quote Estimator
                </h3>
                <p className="text-xs sm:text-sm text-[#6A786E]">
                  Calculate your custom estimate based on pet breed, coat type, and desired care tier.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#516155] bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E8E2D5]">
              <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Quotes confirmed in person prior to service</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Calculator Controls (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Pet Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#6A786E] block mb-2">
                  1. Pet Species
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPetCategory('dog')}
                    className={`min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center ${
                      petCategory === 'dog'
                        ? 'bg-[#183D32] text-white border-[#183D32]'
                        : 'bg-white text-[#202923] border-[#E8E2D5] hover:border-[#183D32]'
                    }`}
                  >
                    Dog
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetCategory('cat')}
                    className={`min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center ${
                      petCategory === 'cat'
                        ? 'bg-[#183D32] text-white border-[#183D32]'
                        : 'bg-white text-[#202923] border-[#E8E2D5] hover:border-[#183D32]'
                    }`}
                  >
                    Cat (Feline Suite)
                  </button>
                </div>
              </div>

              {/* Dog Weight (if dog) */}
              {petCategory === 'dog' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6A786E] block mb-2">
                    2. Dog Weight Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'toy', label: 'Toy (< 10 lbs)' },
                      { id: 'small', label: 'Small (10-25 lbs)' },
                      { id: 'medium', label: 'Med (25-50 lbs)' },
                      { id: 'large', label: 'Large (50-80 lbs)' },
                      { id: 'giant', label: 'Giant (80+ lbs)' }
                    ].map((w) => (\n                      <button\n                        key={w.id}\n                        type="button"\n                        onClick={() => setPetWeight(w.id as any)}\n                        className={`min-h-[44px] p-2.5 text-xs font-medium rounded-xl border flex items-center justify-center text-center transition-all ${\n                          petWeight === w.id\n                            ? 'bg-[#183D32] text-white border-[#183D32]'\n                            : 'bg-white text-[#202923] border-[#E8E2D5] hover:border-[#C5D4C5]'\n                        }`}\n                      >\n                        {w.label}\n                      </button>\n                    ))}
                  </div>
                </div>
              )}

              {/* Coat Type */}
              {petCategory === 'dog' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6A786E] block mb-2">
                    3. Coat Type &amp; Texture
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'short', label: 'Short / Smooth' },
                      { id: 'medium', label: 'Medium Coat' },
                      { id: 'double', label: 'Double / Shedding' },
                      { id: 'curly', label: 'Curly / Doodle' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCoatType(c.id as any)}
                        className={`min-h-[44px] p-2.5 text-xs font-medium rounded-xl border flex items-center justify-center text-center transition-all ${
                          coatType === c.id
                            ? 'bg-[#183D32] text-white border-[#183D32]'
                            : 'bg-white text-[#202923] border-[#E8E2D5] hover:border-[#C5D4C5]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Care Tier */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#6A786E] block mb-2">
                  {petCategory === 'dog' ? '4. Grooming Care Tier' : '2. Grooming Care Tier'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'essential', label: 'Essential Bath & Care' },
                    { id: 'signature', label: 'Signature Full Groom' },
                    { id: 'presidential', label: 'Royal Atelier Spa' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTier(t.id as any)}
                      className={`min-h-[44px] p-3 text-xs sm:text-sm font-semibold rounded-xl border flex items-center justify-center text-center transition-all ${
                        selectedTier === t.id
                          ? 'bg-[#183D32] text-white border-[#183D32]'
                          : 'bg-white text-[#202923] border-[#E8E2D5] hover:border-[#C5D4C5]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#6A786E] block mb-2">
                  Optional Wellness Add-ons
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'teeth', label: 'Teeth Brushing (+$18)' },
                    { id: 'deshed', label: 'Deep De-Shed (+$30)' },
                    { id: 'pawbalm', label: 'Paw Butter Spa (+$15)' },
                    { id: 'flea', label: 'Botanical Flea Wash (+$25)' }
                  ].map((addon) => {
                    const active = addons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`min-h-[44px] p-2.5 text-xs font-medium rounded-xl border flex items-center justify-center text-center transition-all ${
                          active
                            ? 'bg-[#EEF4EE] text-[#183D32] border-[#183D32] font-semibold'
                            : 'bg-white text-[#6A786E] border-[#E8E2D5]'
                        }`}
                      >
                        {addon.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quote Summary Box (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#FAF8F3] p-6 sm:p-7 rounded-2xl border border-[#DCE8DC] sticky top-28 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Estimated Atelier Quote
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#183D32] font-mono tabular-nums mb-2">
                    {estimateString}
                  </div>
                  <p className="text-xs text-[#516155] leading-relaxed mb-6">
                    Estimated service session: <strong>~{estimate.duration} minutes</strong>. Includes zero cage drying, botanical products, and 1-on-1 private attention.
                  </p>

                  <div className="space-y-2 py-4 border-t border-b border-[#E8E2D5] text-xs text-[#202923]">
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Selected Tier:</span>
                      <span className="font-semibold capitalize">{selectedTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Pet Profile:</span>
                      <span className="font-semibold capitalize">
                        {petCategory === 'cat' ? 'Cat (Private Suite)' : `${petWeight} · ${coatType} coat`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Add-ons Selected:</span>
                      <span className="font-semibold">{addons.length} treatments</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectPackageForBooking(
                        `${selectedTier.toUpperCase()} Package (${petCategory.toUpperCase()})`,
                        estimateString
                      )
                    }
                    className="w-full min-h-[44px] py-3 px-4 bg-[#183D32] hover:bg-[#112B23] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                    <span>Reserve With This Estimate</span>
                  </button>
                  <p className="text-[11px] text-[#6A786E] text-center mt-2">
                    No upfront payment required to book
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
