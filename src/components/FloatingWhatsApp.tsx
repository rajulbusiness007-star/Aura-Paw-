import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance by 2 seconds after page load for a refined, non-intrusive entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Quick contact"
      className={`fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative">
        {isVisible && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#183D32]/40 -z-10 animate-subtle-ring pointer-events-none motion-reduce:hidden"
          />
        )}
        <a
          href={BUSINESS_INFO.whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat directly on WhatsApp with Aura &amp; Paw Salon Concierge"
          className={`group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 bg-[#183D32] hover:bg-[#112B23] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border border-[#235244] active:scale-95 motion-reduce:animate-none ${
            isVisible ? 'animate-subtle-breath' : ''
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#C5A46D] transition-transform group-hover:scale-110 duration-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
            WhatsApp Concierge
          </span>
        </a>
      </div>
    </aside>
  );
};
