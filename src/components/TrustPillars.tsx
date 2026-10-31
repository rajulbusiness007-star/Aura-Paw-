import React from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import {
  Award,
  ShieldCheck,
  Wind,
  Star,
  Sparkles,
  Calculator,
  Calendar,
  MessageSquare,
  ArrowRight,
  Check,
  Heart
} from 'lucide-react';
import { Image } from './Image';

interface TrustPillarsProps {
  onOpenBooking?: (service?: string) => void;
}

export const TrustPillars: React.FC<TrustPillarsProps> = ({ onOpenBooking }) => {
  const handleBookingClick = (service?: string) => {
    if (onOpenBooking) {
      onOpenBooking(service);
      return;
    }
    // Fallback: trigger click on header or sticky mobile booking button
    const bookingTrigger =
      (document.querySelector('.fixed.bottom-0 button') as HTMLButtonElement | null) ||
      (document.querySelector('header button') as HTMLButtonElement | null);
    if (bookingTrigger) {
      bookingTrigger.click();
    }
  };

  return (
    <section id="bento-showcase" className="py-20 sm:py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>The Atelier Standard</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
            Why Pet Owners Entrust Their <span className="font-editorial italic font-normal text-[#C5A46D]">Furry Family</span> To Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            Conventional pet salons prioritize volume and turnover. We built Aura &amp; Paw as an unhurried sanctuary where master styling, clinical sanitization, and fear-free touch guarantee your pet’s total well-being.
          </p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* CARD 1: Artisanal Scissor Profiling & Master Craft (Hero Anchor) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 lg:row-span-2 relative rounded-3xl overflow-hidden shadow-md border border-[#DCE8DC] group min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-8">
            <Image
              src="/assets/images/groomer_artisan_1793371518503.jpg"
              alt="Elena Vance gently scissoring a dog's coat"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
            
            <div className="relative z-10 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-white/95 backdrop-blur-xs text-[#183D32] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-[#C5A46D]" />
                  Certified Master Groomers
                </span>
                <span className="bg-[#183D32]/85 text-[#E5D5B8] px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold">
                  1-on-1 Unhurried Care
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Artisanal Scissor Profiling &amp; Stress-Free Styling
              </h3>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
                Executed with Japanese steel shears by certified master groomers. Every pet receives dedicated 1-on-1 attention with zero rushing, zero assembly lines, and continuous positive reinforcement.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookingClick('Signature Full Groom')}
                  className="min-h-[44px] min-w-[44px] px-5 py-2.5 bg-[#C5A46D] hover:bg-[#d4b680] text-[#183D32] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>Reserve Master Styling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#services"
                  className="min-h-[44px] min-w-[44px] px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-xs border border-white/30 transition-colors inline-flex items-center justify-center"
                >
                  Explore Menu
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2: Absolute Safety & Zero-Cage Drying Pledge */}
          <div className="col-span-1 md:col-span-1 lg:col-span-5 relative rounded-3xl p-6 sm:p-7 bg-[#183D32] text-white border border-[#235244] shadow-sm flex flex-col justify-between overflow-hidden min-h-[220px]">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#C5A46D]/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#112B23] text-[#C5A46D] flex items-center justify-center border border-[#235244]">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#C5A46D] font-mono tabular-nums">
                  100%
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                Absolute Zero Cage Drying Policy
              </h4>
              <p className="text-xs sm:text-sm text-[#DCE8DC]/85 leading-relaxed">
                Cage drying causes dangerous panic and overheating. 100% of our fluff drying is completed by hand with warm, temperature-regulated low-noise airflow and soothing Happy Hoodies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#235244] flex items-center gap-1.5 text-[11px] font-semibold text-[#E5D5B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Certified Low-Stress Animal Handling</span>
            </div>
          </div>

          {/* CARD 3: 4.96 ★ Google Social Proof & Verified Reviews */}
          <div className="col-span-1 md:col-span-1 lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-white text-[#202923] border border-[#E8E2D5] shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-[#183D32] font-mono tabular-nums">
                      4.96
                    </span>
                    <div className="flex items-center text-[#C5A46D]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#6A786E] font-medium block mt-0.5">
                    Based on 342 verified client reviews
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-[#EEF4EE] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Google Verified
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm text-[#516155] italic leading-relaxed bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E8E2D5]">
                &ldquo;Barnaby used to shake at our old salon. At Aura &amp; Paw, he greeted Elena with tail wags and came out looking like a showroom teddy bear.&rdquo;
              </blockquote>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#183D32]">
                Clara M. (Barnaby, Goldendoodle)
              </span>
              <a
                href="#reviews"
                className="min-h-[44px] min-w-[44px] inline-flex items-center font-semibold text-[#183D32] hover:underline"
              >
                Read all reviews →
              </a>
            </div>
          </div>

          {/* CARD 4: Dedicated Feline Quiet Suite */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl p-6 bg-[#FAF8F3] border border-[#E8E2D5] hover:border-[#C5D4C5] transition-all flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#183D32] bg-[#EEF4EE] px-2.5 py-1 rounded-md">
                  Feline Exclusive
                </span>
                <span className="text-xs font-mono font-bold text-[#C5A46D]">
                  From $75
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#183D32] mb-2 leading-snug">
                Private Feline Quiet Suite
              </h4>
              <p className="text-xs text-[#516155] leading-relaxed mb-3">
                Soundproof suite with Feliway calming pheromones, completely isolated from canine sights and scents. Led by Certified Feline Master Stylist Sophie Laurent.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E2D5] flex items-center gap-2 text-[11px] text-[#6A786E]">
              <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Zero Sedation · Pure Gentle Handling</span>
            </div>
          </div>

          {/* CARD 5: Puppy First-Step Academy */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl p-6 bg-[#EEF4EE]/70 border border-[#DCE8DC] hover:border-[#183D32]/30 transition-all flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-[#DCE8DC]">
                  Ages 12–24 Weeks
                </span>
                <span className="text-xs font-mono font-bold text-[#183D32]">
                  Intro $45
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#183D32] mb-2 leading-snug">
                Puppy First-Groom Academy
              </h4>
              <p className="text-xs text-[#516155] leading-relaxed mb-3">
                Positive sensory acclimation to warm micro-bubbles, clippers, and low-noise dryers. Includes graduation certificate, treat bag, and lifetime confidence.
              </p>
            </div>
            <div className="pt-3 border-t border-[#DCE8DC] flex items-center gap-1.5 text-[11px] text-[#183D32] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
              <span>Fear-Free Certified Early Introduction</span>
            </div>
          </div>

          {/* CARD 6: Guaranteed Upfront Pricing */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 rounded-3xl p-6 bg-white border border-[#E8E2D5] shadow-xs flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] text-[#183D32] flex items-center justify-center border border-[#E8E2D5]">
                  <Calculator className="w-4 h-4 text-[#183D32]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A786E]">
                  Transparent
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#183D32] mb-2 leading-snug">
                Zero Surprise Fees Guarantee
              </h4>
              <p className="text-xs text-[#516155] leading-relaxed mb-4">
                Crucial hygiene steps (nail buffing, ear cleansing, gland checks) are built into our base packages, never sold as unexpected line-item add-ons.
              </p>
            </div>
            <a
              href="#pricing"
              className="w-full min-h-[44px] min-w-[44px] py-2.5 px-3 bg-[#FAF8F3] hover:bg-[#EEF4EE] text-[#183D32] text-xs font-bold rounded-xl border border-[#DCE8DC] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Instant Quote Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* CARD 7: Hospital-Grade Autoclave & UV-C Disinfection */}
          <div className="col-span-1 md:col-span-1 lg:col-span-6 rounded-3xl p-6 sm:p-7 bg-[#FAF8F3] border border-[#E8E2D5] flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183D32] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#183D32]" />
                <span>Clinical Hygiene Protocols</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#183D32] mb-2 leading-snug">
                Hospital Autoclave &amp; UV-C Sterilization
              </h4>
              <p className="text-xs sm:text-sm text-[#516155] leading-relaxed">
                All shears, clipper blades, and grooming tables undergo hospital autoclave and UV-C germicidal sterilization between every individual appointment. Formulated with 100% hypoallergenic, organic botanical cleansers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D5] flex flex-wrap items-center gap-3 text-xs text-[#516155]">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                Zero cross-contamination
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                Affiliated SF Vet Partner (0.8 mi)
              </span>
            </div>
          </div>

          {/* CARD 8: Direct Concierge & Appointment Gateway */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#183D32] to-[#112B23] text-white border border-[#235244] shadow-md flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-[#112B23] px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Today · 8:00 AM – 6:00 PM
                </span>
                <span className="text-[11px] text-[#DCE8DC]/75 font-mono">
                  {BUSINESS_INFO.phone}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                Ready to Pamper Your Companion?
              </h4>
              <p className="text-xs sm:text-sm text-[#DCE8DC]/85 leading-relaxed">
                Book online in 60 seconds with instant confirmation, or message our concierge desk on WhatsApp for custom coat styling questions.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#235244] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleBookingClick()}
                className="flex-1 min-h-[44px] min-w-[44px] py-3 px-4 bg-[#C5A46D] hover:bg-[#d4b680] text-[#183D32] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#183D32]" />
                <span>Book Appointment Now</span>
              </button>

              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] py-3 px-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A46D]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};