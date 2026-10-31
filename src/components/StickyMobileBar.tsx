import React from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import { Phone, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D5] px-4 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] sm:hidden shadow-lg">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex-1 min-h-[44px] py-2.5 px-3 bg-[#EEF4EE] hover:bg-[#dce8dc] text-[#183D32] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>Call Salon</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-[2] min-h-[44px] py-2.5 px-4 bg-[#183D32] hover:bg-[#112B23] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
};
