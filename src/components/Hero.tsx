import React from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, Star, CheckCircle } from 'lucide-react';
import { Image } from './Image';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative bg-[#FAF8F3] pt-6 pb-16 sm:pb-24 border-b border-[#E8E2D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Editorial Copy & High-Res Dog Photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines & Primary Conversion CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Ambient Quiet Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32]">
              <span>San Francisco’s Premier Pet Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Fear-Free &amp; 100% Cage-Free</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#183D32] tracking-tight leading-[1.12] text-balance font-serif">
              Because Every Pet Deserves to <span className="font-editorial italic font-normal text-[#C5A46D]">Look &amp; Feel</span> Their Best.
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#516155] leading-relaxed max-w-2xl">
              Step into an unhurried sanctuary where master pet stylists, organic botanical hydro-baths, and fear-free touch transform grooming from a stressful chore into pure canine and feline joy.
            </p>

            {/* Primary & Secondary CTAs (Visible Above the Fold) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#183D32] hover:bg-[#112B23] text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#C5A46D]" />
                <span>Book Your Grooming Appointment</span>
              </button>

              <a
                href="#services"
                className="px-6 py-4 bg-white hover:bg-[#EEF4EE] text-[#183D32] border border-[#DCE8DC] text-sm sm:text-base font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#516155]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Certified Fear-Free Handlers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>1-on-1 Private Attention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero Cage Drying Ever</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Photograph with Floating Glass Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DCE8DC] bg-white aspect-[4/3] sm:aspect-square lg:aspect-[4/5]">
              <Image
                src="/assets/images/hero_groomed_dog_1793371516993.jpg"
                alt="Radiant, freshly groomed Golden Doodle dog smiling happily in luxury pet salon"
                fill
                priority
              />

              {/* Subtle Gradient Scrim at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Verified Appointment Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#DCE8DC] shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#183D32] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#183D32]">Oliver’s Royal Atelier Finish</h4>
                      <p className="text-[10px] text-[#6A786E]">Golden Doodle · 1-on-1 Groom Session</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-[#EEF4EE] px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-[11px] text-[#516155] italic leading-tight">
                  &ldquo;Oliver hopped straight into our car smiling, silky soft and calm. Best groomer in the Bay.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof & KPI Strip Below the Hero Split */}
        <div className="mt-14 pt-10 border-t border-[#E8E2D5] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]/70 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono tabular-nums block mb-1">
              100%
            </span>
            <span className="text-xs font-semibold text-[#183D32] block">Cage-Free Drying</span>
            <span className="text-[11px] text-[#6A786E] block mt-0.5">Warm gentle hand airflow</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]/70 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono tabular-nums block mb-1">
              4.96 ★
            </span>
            <span className="text-xs font-semibold text-[#183D32] block">Google Verified Rating</span>
            <span className="text-[11px] text-[#6A786E] block mt-0.5">342 local pet owners</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]/70 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono tabular-nums block mb-1">
              1-on-1
            </span>
            <span className="text-xs font-semibold text-[#183D32] block">Private Suite Care</span>
            <span className="text-[11px] text-[#6A786E] block mt-0.5">Continuous stylist devotion</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]/70 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono tabular-nums block mb-1">
              100%
            </span>
            <span className="text-xs font-semibold text-[#183D32] block">Organic Botanicals</span>
            <span className="text-[11px] text-[#6A786E] block mt-0.5">Sulfate &amp; paraben free</span>
          </div>
        </div>
      </div>
    </section>
  );
};