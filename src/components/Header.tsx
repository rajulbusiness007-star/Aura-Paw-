import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-20">
          {/* Zone 1: Brand wordmark (single element, display font, whitespace-nowrap) */}
          <a
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#183D32] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity font-serif"
          >
            <Sparkles className="w-5 h-5 text-[#C5A46D]" />
            <span>Aura &amp; Paw</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links with hover underlines */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#405445]">
            <a
              href="#services"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Services
            </a>
            <a
              href="#transformations"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Transformations
            </a>
            <a
              href="#safety"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Care &amp; Safety
            </a>
            <a
              href="#grooming-tips"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Coat Tips
            </a>
            <a
              href="#pricing"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              About
            </a>
            <a
              href="#faq"
              className="hover:text-[#183D32] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 primary action + phone quick link */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#183D32] hover:bg-[#EEF4EE] rounded-xl transition-colors whitespace-nowrap min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#183D32] hover:bg-[#112B23] rounded-xl transition-colors shadow-sm whitespace-nowrap shrink-0 items-center gap-2 min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-[#C5A46D]" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#183D32] rounded-xl hover:bg-[#EEF4EE] transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-white border-b border-[#E8E2D5] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-1 text-base font-medium text-[#202923]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Services Menu
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Before &amp; After Transformations
            </a>
            <a
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Comfort &amp; Safety Policies
            </a>
            <a
              href="#grooming-tips"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              At-Home Coat Tips
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Pricing &amp; Quote Estimator
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Meet Our Groomers
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Client Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors"
            >
              Location &amp; Hours
            </a>
          </nav>

          <div className="pt-4 border-t border-[#E8E2D5] space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full min-h-[44px] py-3 px-4 bg-[#EEF4EE] text-[#183D32] rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C5A46D]" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full min-h-[44px] py-3.5 px-4 bg-[#183D32] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#C5A46D]" />
              <span>Book Your Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
