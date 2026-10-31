/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesSection } from './components/ServicesSection';
import { ComfortSafetySection } from './components/ComfortSafetySection';
import { TrustPillars } from './components/TrustPillars';
import { HowItWorks } from './components/HowItWorks';
import { PricingCalculator } from './components/PricingCalculator';
import { MeetGroomers } from './components/MeetGroomers';
import { ReviewsSection } from './components/ReviewsSection';
import { GroomingTipsSection } from './components/GroomingTipsSection';
import { FaqSection } from './components/FaqSection';
import { GallerySection } from './components/GallerySection';
import { ContactLocation } from './components/ContactLocation';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedEstimate, setSelectedEstimate] = useState<string>('');

  const handleOpenBooking = (service?: string, estimate?: string) => {
    if (service) setSelectedService(service);
    if (estimate) setSelectedEstimate(estimate);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#202923] w-full max-w-full overflow-x-clip">
      {/* 1. Top Bar Contract Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Interactive Before & After Slider */}
        <BeforeAfterSlider onSelectService={(service) => handleOpenBooking(service)} />

        {/* 4. Artisanal Services Menu */}
        <ServicesSection onBookService={(service) => handleOpenBooking(service)} />

        {/* 5. Pet Owner Pain Points & Comfort Solutions */}
        <ComfortSafetySection onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Why Pet Owners Trust Us Bento */}
        <TrustPillars />

        {/* 7. How It Works (4-Step Booking Journey) */}
        <HowItWorks onOpenBooking={() => handleOpenBooking()} />

        {/* 8. Pricing & Packages + Interactive Quote Estimator */}
        <PricingCalculator
          onSelectPackageForBooking={(pkg, est) => handleOpenBooking(pkg, est)}
        />

        {/* 9. Meet Our Groomers & Brand Story */}
        <MeetGroomers />

        {/* 10. Expert Between-Visit Coat Maintenance Guide */}
        <GroomingTipsSection onOpenBooking={(service) => handleOpenBooking(service)} />

        {/* 11. Verified Reviews & Testimonials */}
        <ReviewsSection />

        {/* 12. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 12. Visual Gallery & Social */}
        <GallerySection />

        {/* 13. Location, Maps & Concierge Inquiry Form */}
        <ContactLocation />

        {/* 14. Discreet Paw-Care Insider Newsletter & Seasonal Reminders */}
        <NewsletterSection />
      </main>

      {/* 15. Luxury Quiet Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 15. Mobile Sticky Booking Bar (< 15% mobile viewport cap) */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* 16. Floating WhatsApp Direct Concierge */}
      <FloatingWhatsApp />

      {/* 17. Interactive Appointment Booking & Lookup Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedService}
        preselectedEstimate={selectedEstimate}
      />
    </div>
  );
}
