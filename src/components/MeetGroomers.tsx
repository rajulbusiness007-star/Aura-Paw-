import React from 'react';
import { GROOMERS } from '../data/groomingData';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Image } from './Image';

export const MeetGroomers: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story & Philosophy (Split Editorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32]">
              <span>Our Atelier Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>The Aura &amp; Paw Story</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance leading-tight">
              Founded on the Belief That Grooming Should Nourish the Soul
            </h2>
            <p className="text-base sm:text-lg text-[#516155] leading-relaxed">
              We spent years observing standard commercial salons: blaring high-velocity driers in crammed spaces, pets stacked in metal cages for hours, and groomers pressured to rush four dogs at once. We knew pets and their owners deserved better.
            </p>
            <p className="text-sm sm:text-base text-[#516155] leading-relaxed">
              In 2019, Elena Vance created <strong>Aura &amp; Paw</strong> as a quiet sanctuary. We limit our bookings so that every dog or cat receives uninterrupted 1-on-1 devotion, hypoallergenic botanicals, zero cage drying, and positive reinforcement from the moment they step through our doors.
            </p>

            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-[#E8E2D5]">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono block">
                  100%
                </span>
                <span className="text-xs text-[#6A786E]">Cage-Free Salon</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono block">
                  1-on-1
                </span>
                <span className="text-xs text-[#6A786E]">Dedicated Groomer</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#183D32] font-mono block">
                  7+ Yrs
                </span>
                <span className="text-xs text-[#6A786E]">Avg Stylist Exp</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#DCE8DC] aspect-[4/3] bg-neutral-100">
              <Image
                src="/assets/images/groomer_artisan_1793371518503.jpg"
                alt="Founder and master stylist Elena Vance gently brushing a fluffy dog"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D] mb-1">
                    Elena Vance &middot; Founder &amp; Master Stylist
                  </p>
                  <p className="text-sm font-medium leading-relaxed max-w-md">
                    &ldquo;When a dog leans into your chest and sighs with relief while you brush them, you know you have honored their trust.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Master Groomers Profiles */}
        <div className="pt-12 border-t border-[#E8E2D5]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#183D32] block mb-2">
              Certified Craftsmanship
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#183D32]">
              Meet Our Certified Master Stylists
            </h3>
            <p className="text-sm text-[#516155] mt-2">
              Every groomer on our team holds verified national certifications and pet CPR credentials. You can request your preferred stylist during booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {GROOMERS.map((groomer) => (
              <div
                key={groomer.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-sm flex flex-col justify-between hover:border-[#C5D4C5] transition-all"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
                    <Image
                      src={groomer.imageUrl}
                      alt={groomer.name}
                      fill
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#183D32] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {groomer.experienceYears} Years Experience
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[#183D32] mb-1">
                      {groomer.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#C5A46D] mb-3">
                      {groomer.role}
                    </p>
                    <p className="text-xs sm:text-sm text-[#516155] leading-relaxed mb-4">
                      {groomer.bio}
                    </p>

                    <div className="py-2.5 px-3 bg-[#FAF8F3] rounded-xl border border-[#E8E2D5] text-xs text-[#202923] mb-4">
                      <strong className="text-[#183D32] block mb-0.5 font-semibold">Specialty:</strong>
                      <span>{groomer.specialty}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6A786E] block">
                        Verified Credentials:
                      </span>
                      {groomer.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#516155]">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};