import React from 'react';
import { Calendar, PawPrint, Sparkles, Smile, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Service',
      description: 'Select from our full styling menu or interactive pricing calculator based on your pet’s coat, breed, and grooming needs.',
      icon: Sparkles
    },
    {
      number: '02',
      title: 'Share Your Pet’s Profile',
      description: 'Tell us their name, breed, age, and any sensitivities, fears, or behavioral notes so we can prepare their customized suite.',
      icon: PawPrint
    },
    {
      number: '03',
      title: 'Select Date & Stylist',
      description: 'Pick your preferred date and time slot with instant calendar reservation and direct SMS/email confirmation.',
      icon: Calendar
    },
    {
      number: '04',
      title: 'Visit Us & Enjoy',
      description: 'Drop off at our calm atelier on Evergreen Way. Return to pick up a silky, beautifully scented, and radiant happy pet.',
      icon: Smile
    }
  ];

  return (
    <section className="py-24 bg-[#183D32] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A46D] mb-3">
            <span>Seamless Booking Journey</span>
            <span aria-hidden="true">·</span>
            <span>Simple 4 Steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-[#FAF8F3]">
            How Effortless Pet Grooming Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DCE8DC]/85 leading-relaxed">
            We designed our booking and drop-off flow to be stress-free for both you and your pet. No confusing pricing, no waiting on endless holds.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 sm:p-7 rounded-2xl bg-[#112B23] border border-[#235244] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-bold text-[#C5A46D]">
                      Step {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#183D32] flex items-center justify-center text-[#C5A46D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DCE8DC]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTA */}
        <div className="text-center pt-6 border-t border-[#235244] flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A46D] hover:bg-[#d4b680] text-[#183D32] text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Book Your Pet’s Grooming Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="tel:+18005557297"
            className="text-xs sm:text-sm text-[#DCE8DC] hover:text-white underline underline-offset-4"
          >
            Prefer to call? +1 (800) 555-PAWS
          </a>
        </div>
      </div>
    </section>
  );
};
