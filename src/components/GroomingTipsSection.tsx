import React, { useState } from 'react';
import { GROOMING_TIPS } from '../data/groomingData';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
  BookOpen,
  Calendar,
  Heart,
  Droplets,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface GroomingTipsSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const GroomingTipsSection: React.FC<GroomingTipsSectionProps> = ({ onOpenBooking }) => {
  const [activeTipIndex, setActiveTipIndex] = useState<number>(0);
  const activeTip = GROOMING_TIPS[activeTipIndex] || GROOMING_TIPS[0];

  const quickRules = [
    {
      title: 'Always Detangle Before Water',
      description: 'Water acts like a felt shrinker on knots, binding them into painful corded mats.',
      icon: Droplets
    },
    {
      title: 'The Greyhound Comb Test',
      description: 'A slicker brush alone can glide over mats. A steel comb must slide smoothly to the skin.',
      icon: Scissors
    },
    {
      title: 'Never Shave Double Coats',
      description: 'Shaving ruins thermal regulation and exposes skin to severe sunburn and insect stings.',
      icon: ShieldAlert
    },
    {
      title: 'Daily Micro-Sessions (3–5 Min)',
      description: 'Short positive brushing sessions with treats prevent salon stress and maintain coat silkiness.',
      icon: Heart
    }
  ];

  return (
    <section id="grooming-tips" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Expert At-Home Care</span>
            <span aria-hidden="true">·</span>
            <span>Master Stylist Advice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance">
            Maintaining Your Pet’s Coat Between Grooming Visits
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            Professional grooming keeps the silhouette crisp, but what happens at home preserves comfort. Learn our master groomers’ exact routines to keep coats tangle-free, glossy, and comfortable.
          </p>
        </div>

        {/* 4 Golden Rules Quick Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {quickRules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#DCE8DC] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-[#EEF4EE] text-[#183D32] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[#183D32]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#183D32] mb-1 leading-snug">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-[#516155] leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Guide Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8DC] shadow-md">
          {/* Guide Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E8E2D5]">
            {GROOMING_TIPS.map((tip, idx) => (
              <button
                key={tip.id}
                type="button"
                onClick={() => setActiveTipIndex(idx)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  activeTipIndex === idx
                    ? 'bg-[#183D32] text-white shadow-sm'
                    : 'bg-[#FAF8F3] text-[#516155] hover:text-[#183D32] border border-[#E8E2D5]'
                }`}
              >
                <span>{tip.title}</span>
              </button>
            ))}
          </div>

          {/* Active Guide Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Step-by-Step Technique (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                    {activeTip.targetPet}
                  </span>
                  <span className="text-xs text-[#6A786E]">·</span>
                  <span className="text-xs text-[#6A786E] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#183D32]" /> Recommended: {activeTip.frequency}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#183D32] mb-3">
                  {activeTip.title}
                </h3>
                <p className="text-sm sm:text-base text-[#516155] leading-relaxed bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E2D5]">
                  {activeTip.summary}
                </p>
              </div>

              {/* Step Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6A786E]">
                  Master Stylist Execution Steps:
                </h4>
                <div className="space-y-2.5">
                  {activeTip.expertSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-start gap-3 text-xs sm:text-sm text-[#202923]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#183D32] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 font-mono">
                        {sIdx + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Caution Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Safety Notice:</strong>
                  <span>{activeTip.cautionNotice}</span>
                </div>
              </div>
            </div>

            {/* Right: Tools & Action Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#DCE8DC] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E8E2D5]">
                  <Wrench className="w-4 h-4 text-[#C5A46D]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#183D32]">
                    Essential Tool Recommendation
                  </h4>
                </div>

                <div>
                  <span className="text-xs text-[#6A786E] block mb-1">Used by our Stylists:</span>
                  <p className="text-sm font-bold text-[#183D32]">
                    {activeTip.recommendedTool}
                  </p>
                  <p className="text-xs text-[#516155] mt-2 leading-relaxed">
                    High-quality long pins with rounded tips penetrate thick dense coats without scratching sensitive dermal layers.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E2D5]">
                  <span className="text-xs text-[#6A786E] block mb-2">Need professional hands?</span>
                  <button
                    type="button"
                    onClick={() => onOpenBooking('Specialised Coat Care & Moisture Mask')}
                    className="w-full py-2.5 px-3 bg-[#183D32] hover:bg-[#112B23] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Book Coat Restoration Bath</span>
                  </button>
                </div>
              </div>

              {/* Free At-Home Consultation Note */}
              <div className="p-5 rounded-2xl border border-[#E8E2D5] bg-white space-y-2">
                <span className="text-xs font-bold text-[#183D32] block">
                  Got a tight knot you cannot loosen?
                </span>
                <p className="text-xs text-[#516155] leading-relaxed">
                  Never yank with a brush or cut with kitchen scissors. Bring your pet by for a quick 15-minute conditioning line-comb out.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183D32] hover:text-[#112B23] underline pt-1"
                >
                  <span>Ask a groomer for advice</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
