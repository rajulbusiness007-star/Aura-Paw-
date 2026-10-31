import React, { useState, useEffect } from 'react';
import { BookingFormData, ConfirmedBooking, PetType, PetSize } from '../types';
import { SERVICES_LIST, GROOMERS, BUSINESS_INFO } from '../data/groomingData';
import { COMMON_BREEDS, BreedOption } from '../data/breedData';
import {
  X,
  Calendar,
  Clock,
  PawPrint,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  Phone,
  ShieldCheck,
  User,
  Heart,
  Plus,
  Check,
  Search,
  Tag
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedEstimate?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedEstimate
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Initial default breed
  const initialBreed = COMMON_BREEDS.find((b) => b.name.includes('Goldendoodle')) || COMMON_BREEDS[0];
  const [selectedBreedOption, setSelectedBreedOption] = useState<BreedOption | null>(initialBreed);
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number }[]>([]);
  const [isCustomBreed, setIsCustomBreed] = useState<boolean>(false);
  const [breedSearch, setBreedSearch] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    phone: '',
    email: '',
    petName: '',
    petType: 'Dog',
    breed: initialBreed ? initialBreed.name : 'Goldendoodle',
    petSize: initialBreed ? initialBreed.info.defaultSize : 'Medium (25 - 50 lbs)',
    petAge: '',
    service: preselectedService || SERVICES_LIST[0].name,
    preferredDate: '',
    preferredTime: '10:00 AM',
    specialInstructions: '',
    groomerPreference: 'Any Master Stylist',
    privacyConsent: true,
    honeypot: ''
  });

  // Lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [isLookupMode, setIsLookupMode] = useState(false);
  const [lookupResult, setLookupResult] = useState<ConfirmedBooking | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Sync preselected
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const timeSlots = [
    '08:30 AM',
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM'
  ];

  const handleSpeciesChange = (newSpecies: PetType) => {
    const targetSpecies = newSpecies === 'Cat' ? 'Cat' : 'Dog';
    const filtered = COMMON_BREEDS.filter((b) => b.species === targetSpecies);
    const firstBreed = filtered[0] || null;
    setSelectedBreedOption(firstBreed);
    setSelectedAddons([]);
    setIsCustomBreed(false);
    setFormData((prev) => ({
      ...prev,
      petType: newSpecies,
      breed: firstBreed ? firstBreed.name : '',
      petSize: firstBreed ? firstBreed.info.defaultSize : (newSpecies === 'Cat' ? 'Cat (All Sizes)' : 'Medium (25 - 50 lbs)')
    }));
  };

  const handleBreedSelectChange = (breedName: string) => {
    if (breedName === '__custom__') {
      setIsCustomBreed(true);
      setSelectedBreedOption(null);
      setFormData((prev) => ({ ...prev, breed: '' }));
      return;
    }
    setIsCustomBreed(false);
    const found = COMMON_BREEDS.find((b) => b.name === breedName);
    if (found) {
      setSelectedBreedOption(found);
      setFormData((prev) => ({
        ...prev,
        breed: found.name,
        petSize: found.info.defaultSize
      }));
    }
  };

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const addonsTotalPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;
    setLookupError('');
    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(lookupCode.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLookupError(data.message || 'No reservation found matching this code or phone number.');
        setLookupResult(null);
      } else {
        setLookupResult(data.booking);
      }
    } catch {
      setLookupError('Unable to connect to reservation service.');
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeStep === 1) {
      // Validate Step 1: Pet & Service
      if (!formData.petName.trim() || !formData.service) {
        setErrorMsg('Please enter your pet name and select a service.');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Validate Step 2: Date & Time
      if (!formData.preferredDate) {
        setErrorMsg('Please select your preferred appointment date.');
        return;
      }
      setActiveStep(3);
    } else if (activeStep === 3) {
      // Submit form
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (formData.honeypot) {
      // Bot detected
      return;
    }

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill in your name, phone number, and email.');
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMsg('Please accept the salon hygiene & appointment policy.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const baseMin = preselectedEstimate ? parseInt(preselectedEstimate.replace(/\D/g, ''), 10) || 85 : 85;
    const finalEstimateString = addonsTotalPrice > 0
      ? `$${baseMin + addonsTotalPrice} – $${baseMin + addonsTotalPrice + 30} (incl. $${addonsTotalPrice} in add-ons)`
      : preselectedEstimate || '$85 – $110';

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedAddons,
          estimatedCost: finalEstimateString
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit booking reservation.');
      }

      setConfirmedBooking(result.booking);
      setActiveStep(4); // Success step
    } catch (err: any) {
      console.error('Booking submission error:', err);
      // Fallback local booking for offline preview
      const fallbackBooking: ConfirmedBooking = {
        ...formData,
        selectedAddons,
        id: `bk_${Date.now()}`,
        confirmationCode: `AP-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        estimatedCost: finalEstimateString
      };
      setConfirmedBooking(fallbackBooking);
      setActiveStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate calendar .ics file for download
  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const dateFormatted = confirmedBooking.preferredDate.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aura and Paw//Pet Grooming Atelier//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Pet Grooming: ${confirmedBooking.petName} at Aura & Paw`,
      `DESCRIPTION:Appointment for ${confirmedBooking.petName} (${confirmedBooking.service}). Code: ${confirmedBooking.confirmationCode}. Tel: +18005557297`,
      `LOCATION:${BUSINESS_INFO.address}`,
      `DTSTART:${dateFormatted}T100000Z`,
      `DTEND:${dateFormatted}T113000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AuraPaw-Appointment-${confirmedBooking.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareToWhatsApp = () => {
    if (!confirmedBooking) return;
    const text = encodeURIComponent(
      `Hi Aura & Paw, I just booked an appointment for my pet ${confirmedBooking.petName} (${confirmedBooking.service}) on ${confirmedBooking.preferredDate} at ${confirmedBooking.preferredTime}. Confirmation code: ${confirmedBooking.confirmationCode}.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 border border-[#DCE8DC] shadow-2xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#6A786E] hover:text-[#202923] p-1.5 rounded-full hover:bg-[#FAF8F3]"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Lockup */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D5] mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
                Concierge Booking Desk
              </span>
              <span className="text-xs text-[#6A786E]">·</span>
              <button
                type="button"
                onClick={() => setIsLookupMode(!isLookupMode)}
                className="min-h-[44px] inline-flex items-center text-xs text-[#183D32] underline font-medium hover:text-[#112B23]"
              >
                {isLookupMode ? 'Back to New Booking' : 'Find Existing Booking'}
              </button>
            </div>
            <h3 className="text-2xl font-bold text-[#183D32] mt-0.5">
              {isLookupMode ? 'Check Your Appointment' : 'Reserve Pet Grooming Session'}
            </h3>
          </div>
        </div>

        {/* LOOKUP EXISTING BOOKING MODE */}
        {isLookupMode ? (
          <div className="space-y-6">
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                  Confirmation Code or Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={lookupCode}
                    onChange={(e) => setLookupCode(e.target.value)}
                    placeholder="e.g. AP-84920 or +1 800-555-7297"
                    className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2.5 bg-[#183D32] hover:bg-[#112B23] text-white text-xs font-semibold rounded-xl flex items-center justify-center"
                  >
                    Lookup
                  </button>
                </div>
              </div>

              {lookupError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}
            </form>

            {lookupResult && (
              <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#DCE8DC] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                  <div>
                    <span className="text-xs text-[#6A786E]">Booking Reference</span>
                    <h4 className="text-lg font-bold text-[#183D32] font-mono">
                      {lookupResult.confirmationCode}
                    </h4>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
                    {lookupResult.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#202923]">
                  <div>
                    <span className="text-[#6A786E] block">Pet:</span>
                    <strong>{lookupResult.petName}</strong> ({lookupResult.breed})
                  </div>
                  <div>
                    <span className="text-[#6A786E] block">Owner:</span>
                    <strong>{lookupResult.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-[#6A786E] block">Service:</span>
                    <strong>{lookupResult.service}</strong>
                  </div>
                  <div>
                    <span className="text-[#6A786E] block">Date &amp; Time:</span>
                    <strong>{lookupResult.preferredDate} at {lookupResult.preferredTime}</strong>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E8E2D5] flex gap-2">
                  <a
                    href="tel:+18005557297"
                    className="flex-1 min-h-[44px] py-2 px-3 bg-[#183D32] text-white text-xs font-semibold rounded-lg text-center flex items-center justify-center"
                  >
                    Call To Modify or Reschedule
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* STANDARD BOOKING FORM FLOW */
          <div>
            {/* Step Indicators */}
            {activeStep < 4 && (
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: 1, label: 'Pet & Service' },
                  { step: 2, label: 'Date & Stylist' },
                  { step: 3, label: 'Owner Details' }
                ].map((s) => (
                  <div key={s.step} className="flex-1 flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          activeStep === s.step
                            ? 'bg-[#183D32] text-white'
                            : activeStep > s.step
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#EEF4EE] text-[#6A786E]'
                        }`}
                      >
                        {activeStep > s.step ? '✓' : s.step}
                      </div>
                      <span className="text-xs font-medium hidden sm:inline text-[#202923]">
                        {s.label}
                      </span>
                    </div>
                    {s.step < 3 && (
                      <div className="flex-1 h-0.5 bg-[#E8E2D5] mx-2 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: PET & SERVICE */}
            {activeStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      placeholder="e.g. Milo, Bella, Winston"
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Species *
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => handleSpeciesChange(e.target.value as PetType)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    >
                      <option value="Dog">Dog (Canine Care)</option>
                      <option value="Cat">Cat (Private Feline Suite)</option>
                      <option value="Other">Other Small Companion</option>
                    </select>
                  </div>
                </div>

                {/* Breed Dropdown & Size auto-assignment */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E]">
                          Select Breed (Auto-Filters Add-ons) *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomBreed(!isCustomBreed);
                            if (!isCustomBreed) {
                              setSelectedBreedOption(null);
                            }
                          }}
                          className="text-[11px] text-[#183D32] underline hover:text-[#112B23]"
                        >
                          {isCustomBreed ? 'Choose from Common Breeds' : 'Can’t find breed? Write-in'}
                        </button>
                      </div>

                      {isCustomBreed ? (
                        <input
                          type="text"
                          required
                          value={formData.breed}
                          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                          placeholder="Type breed name (e.g. Aussiedoodle, Ragamuffin)..."
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                        />
                      ) : (
                        <select
                          value={formData.breed}
                          onChange={(e) => handleBreedSelectChange(e.target.value)}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                        >
                          <option value="">-- Select your pet's breed --</option>
                          {Array.from(new Set(
                            COMMON_BREEDS.filter((b) => b.species === (formData.petType === 'Cat' ? 'Cat' : 'Dog')).map((b) => b.group)
                          )).map((groupName) => (
                            <optgroup key={groupName} label={groupName}>
                              {COMMON_BREEDS.filter(
                                (b) => b.species === (formData.petType === 'Cat' ? 'Cat' : 'Dog') && b.group === groupName
                              ).map((b) => (
                                <option key={b.name} value={b.name}>
                                  {b.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="__custom__">+ Other / Custom Mix...</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E]">
                          Approximate Size / Weight
                        </label>
                        {selectedBreedOption && (
                          <span className="text-[10px] text-emerald-800 bg-[#EEF4EE] px-2 py-0.5 rounded font-medium">
                            Auto-matched to breed
                          </span>
                        )}
                      </div>
                      <select
                        value={formData.petSize}
                        onChange={(e) => setFormData({ ...formData, petSize: e.target.value as PetSize })}
                        className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                      >
                        <option value="Toy (< 10 lbs)">Toy (&lt; 10 lbs)</option>
                        <option value="Small (10 - 25 lbs)">Small (10 - 25 lbs)</option>
                        <option value="Medium (25 - 50 lbs)">Medium (25 - 50 lbs)</option>
                        <option value="Large (50 - 80 lbs)">Large (50 - 80 lbs)</option>
                        <option value="Giant (80+ lbs)">Giant (80+ lbs)</option>
                        <option value="Cat (All Sizes)">Cat (All Sizes)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contextual Breed Recommendations & Suggested Add-on Services */}
                  {selectedBreedOption && selectedBreedOption.info.suggestedAddons.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#DCE8DC] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#E8E2D5]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                          <span className="text-xs font-bold text-[#183D32]">
                            Stylist Add-on Recommendations for {selectedBreedOption.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6A786E]">
                          Coat: <strong>{selectedBreedOption.info.coatType}</strong>
                        </span>
                      </div>

                      <p className="text-xs text-[#516155] italic bg-white p-2.5 rounded-xl border border-[#E8E2D5]">
                        &ldquo;{selectedBreedOption.info.groomerTip}&rdquo;
                      </p>

                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A786E] block">
                          Suggested Add-on Care:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedBreedOption.info.suggestedAddons.map((addon) => {
                            const isAdded = selectedAddons.some((a) => a.id === addon.id);
                            return (
                              <div
                                key={addon.id}
                                className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                                  isAdded
                                    ? 'bg-[#EEF4EE] border-[#183D32] ring-1 ring-[#183D32]/10 shadow-xs'
                                    : 'bg-white border-[#E8E2D5] hover:border-[#C5D4C5]'
                                }`}\n                              >
                                <div className="mb-2">
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="text-xs font-bold text-[#183D32] leading-tight">
                                      {addon.name}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-[#183D32] shrink-0">
                                      +${addon.price}
                                    </span>
                                  </div>
                                  <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-[#EEF4EE] px-1.5 py-0.5 rounded mb-1">
                                    {addon.tag}
                                  </span>
                                  <p className="text-[11px] text-[#6A786E] leading-relaxed line-clamp-2">
                                    {addon.description}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => toggleAddon(addon)}
                                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                                    isAdded
                                      ? 'bg-[#183D32] text-white'
                                      : 'bg-[#FAF8F3] hover:bg-[#EEF4EE] text-[#183D32] border border-[#DCE8DC]'
                                  }`}
                                >
                                  {isAdded ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-[#C5A46D]" />
                                      <span>Added to Visit</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Add Service (+${addon.price})</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Requested Grooming Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} (from ${s.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Special Grooming Notes or Concerns
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    placeholder="e.g. Anxious with dryers, allergic to aloe, senior pet with arthritis..."
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-[#183D32] hover:bg-[#112B23] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center"
                  >
                    Continue to Date &amp; Stylist →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: DATE & STYLIST */}
            {activeStep === 2 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Preferred Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                  <span className="text-[11px] text-[#6A786E] mt-1 block">
                    We accept appointments 7 days a week (Mon–Sat 8am–6pm, Sun 9am–4pm).
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-2">
                    Select Convenient Time Slot *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`min-h-[44px] p-2.5 text-xs font-medium rounded-xl border transition-all flex items-center justify-center text-center ${
                          formData.preferredTime === slot
                            ? 'bg-[#183D32] text-white border-[#183D32]'
                            : 'bg-[#FAF8F3] text-[#202923] border-[#E8E2D5] hover:border-[#C5D4C5]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Master Stylist Preference
                  </label>
                  <select
                    value={formData.groomerPreference}
                    onChange={(e) => setFormData({ ...formData, groomerPreference: e.target.value })}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  >
                    <option value="Any Available Master Stylist">First Available Certified Stylist</option>
                    {GROOMERS.map((g) => (
                      <option key={g.id} value={g.name}>
                        {g.name} — {g.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="min-h-[44px] px-4 py-2 flex items-center text-xs font-semibold text-[#6A786E] hover:text-[#183D32]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-3 bg-[#183D32] hover:bg-[#112B23] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center"
                  >
                    Continue to Contact Info →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: CONTACT INFO & CONFIRMATION */}
            {activeStep === 3 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                {/* Honeypot spam field hidden from real humans */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Catherine Hall"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Phone Number (for SMS pickup notice) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (415) 000-0000"
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Email Address (for calendar pass) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="catherine@example.com"
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E2D5] space-y-2.5 text-xs text-[#202923]">
                  <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-2">
                    <h4 className="font-bold text-[#183D32] text-sm">Reservation Summary</h4>
                    <span className="text-[11px] font-semibold text-[#183D32] bg-[#EEF4EE] px-2 py-0.5 rounded">
                      {formData.petType} · {formData.petSize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A786E]">Pet &amp; Breed:</span>
                    <span className="font-semibold">{formData.petName} ({formData.breed})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A786E]">Primary Service:</span>
                    <span className="font-semibold">{formData.service}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-[#E8E2D5] space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A786E] block">
                        Selected Add-ons ({selectedAddons.length}):
                      </span>
                      {selectedAddons.map((addon) => (
                        <div key={addon.id} className="flex justify-between text-[#183D32] pl-2 border-l-2 border-[#C5A46D]">
                          <span>{addon.name}</span>
                          <span className="font-mono font-semibold">+${addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#6A786E]">Date &amp; Time:</span>
                    <span>{formData.preferredDate} at {formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A786E]">Stylist:</span>
                    <span>{formData.groomerPreference}</span>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D5] flex justify-between items-baseline font-bold text-[#183D32]">
                    <span className="text-xs text-[#6A786E]">Estimated Total:</span>
                    <span className="text-sm font-mono">
                      {addonsTotalPrice > 0
                        ? `${preselectedEstimate || '$85 – $110'} + $${addonsTotalPrice} add-ons`
                        : preselectedEstimate || '$85 – $110'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-[#E8E2D5] text-[#183D32] focus:ring-[#183D32]"
                  />
                  <label htmlFor="privacyConsent" className="text-xs text-[#516155] leading-relaxed">
                    I confirm my pet is in good general health and up to date on required core vaccinations (Rabies &amp; DHPP). I accept the 24-hour rescheduling courtesy policy.
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="min-h-[44px] px-4 py-2 flex items-center text-xs font-semibold text-[#6A786E] hover:text-[#183D32]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[44px] px-8 py-3.5 bg-[#183D32] hover:bg-[#112B23] text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                    <span>{isSubmitting ? 'Confirming Reservation...' : 'Complete Appointment Booking'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS & CONFIRMATION PASS */}
            {activeStep === 4 && confirmedBooking && (
              <div className="text-center space-y-6 py-2">
                <div className="w-16 h-16 rounded-full bg-[#EEF4EE] text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-700" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#183D32]">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-sm text-[#516155] mt-1">
                    We look forward to giving <strong>{confirmedBooking.petName}</strong> a royal, fear-free grooming experience.
                  </p>
                </div>

                {/* Digital Appointment Pass */}
                <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#DCE8DC] text-left space-y-4 shadow-sm max-w-md mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A786E] block">
                        Confirmation Code
                      </span>
                      <span className="text-xl font-extrabold text-[#183D32] font-mono tracking-wider">
                        {confirmedBooking.confirmationCode}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-[#EEF4EE] text-emerald-800 text-xs font-bold rounded-full">
                      Reserved &middot; 1-on-1 Suite
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#202923]">
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Pet &amp; Breed:</span>
                      <strong>{confirmedBooking.petName} ({confirmedBooking.breed})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Service:</span>
                      <strong className="text-right">{confirmedBooking.service}</strong>
                    </div>

                    {confirmedBooking.selectedAddons && confirmedBooking.selectedAddons.length > 0 && (
                      <div className="py-1.5 border-t border-b border-[#E8E2D5]/70 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A786E]">
                          Booked Add-ons:
                        </span>
                        {confirmedBooking.selectedAddons.map((addon) => (
                          <div key={addon.id} className="flex justify-between text-[#183D32]">
                            <span>{addon.name}</span>
                            <span className="font-mono font-bold">+${addon.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Date:</span>
                      <strong>{confirmedBooking.preferredDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Check-in Time:</span>
                      <strong>{confirmedBooking.preferredTime}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A786E]">Location:</span>
                      <span className="text-right text-[#516155]">742 Evergreen Way, SF</span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={downloadCalendarFile}
                    className="min-h-[44px] py-2.5 px-4 bg-white hover:bg-[#FAF8F3] text-[#183D32] border border-[#DCE8DC] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#C5A46D]" />
                    <span>Add to Calendar (.ics)</span>
                  </button>

                  <button
                    type="button"
                    onClick={shareToWhatsApp}
                    className="min-h-[44px] py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send to WhatsApp</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] px-6 py-2.5 bg-[#183D32] text-white text-xs font-semibold rounded-xl flex items-center justify-center mx-auto"
                  >
                    Done &middot; Return to Website
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
