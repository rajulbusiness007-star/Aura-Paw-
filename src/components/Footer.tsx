import React from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import { Sparkles, Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#112B23] text-[#FAF8F3] pt-16 pb-24 sm:pb-16 border-t border-[#183D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#235244]">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white font-serif"
            >
              <Sparkles className="w-5 h-5 text-[#C5A46D]" />
              <span>Aura &amp; Paw</span>
            </a>
            <p className="text-xs sm:text-sm text-[#DCE8DC]/80 leading-relaxed max-w-sm">
              San Francisco’s sanctuary for gentle, fear-free pet styling. We provide 100% cage-free hand care, botanical shampoos, and loving 1-on-1 attention for dogs and cats.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#183D32] hover:bg-[#235244] flex items-center justify-center text-[#C5A46D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#183D32] hover:bg-[#235244] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DCE8DC]/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Grooming Services
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">
                  Before &amp; After Gallery
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white transition-colors">
                  Comfort &amp; Safety
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing &amp; Calculator
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Meet Our Groomers
                </a>
              </li>
              <li>
                <a href="#grooming-tips" className="hover:text-white transition-colors">
                  Coat Care Guide
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services Quicklist (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Care Programs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DCE8DC]/80">
              <li>Full-Service Breed Styling</li>
              <li>Puppy First-Groom Intro</li>
              <li>Private Feline Grooming Suite</li>
              <li>Undercoat Hydro-De-Shedding</li>
              <li>Organic Paw Pad &amp; Nail Therapy</li>
              <li>Enzymatic Dental Hygiene</li>
            </ul>
          </div>

          {/* Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Atelier Concierge
            </h4>
            <div className="space-y-2 text-xs text-[#DCE8DC]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-[#235244]">
                <Clock className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p>{BUSINESS_INFO.hoursWeekday}</p>
                  <p>{BUSINESS_INFO.hoursWeekend}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full min-h-[44px] py-3 px-4 bg-[#C5A46D] hover:bg-[#d4b680] text-[#183D32] text-xs font-bold rounded-xl transition-colors flex items-center justify-center"
              >
                Book Appointment Online
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE8DC]/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Aura &amp; Paw Grooming Studio LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-center sm:text-right">
            <span>24-Hour Rescheduling Courtesy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Pet CPR &amp; Fear-Free Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
