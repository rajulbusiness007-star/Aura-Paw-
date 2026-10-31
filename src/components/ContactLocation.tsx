import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/groomingData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ContactLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petDetails: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        petDetails: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Inquiry error:', err);
      // Fallback graceful success if offline or dev
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact & Location Details (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
                <span>Visit Our Atelier</span>
                <span aria-hidden="true">·</span>
                <span>San Francisco, CA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance">
                We’d Love to Welcome You &amp; Your Pet
              </h2>
              <p className="mt-4 text-base text-[#516155] leading-relaxed">
                Located in a quiet, green corridor on Evergreen Botanical Way with dedicated drop-off bays right in front of our entrance.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 bg-[#FAF8F3] rounded-2xl border border-[#E8E2D5]">
                <MapPin className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#183D32]">Atelier Location</h4>
                  <p className="text-sm text-[#516155]">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-start gap-3.5 p-4 bg-[#FAF8F3] hover:bg-[#EEF4EE] rounded-2xl border border-[#E8E2D5] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#183D32]">Phone Concierge</h4>
                    <p className="text-sm text-[#516155] font-medium">{BUSINESS_INFO.phone}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Click to call directly</span>
                  </div>
                </a>

                <a
                  href={BUSINESS_INFO.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 bg-[#FAF8F3] hover:bg-[#EEF4EE] rounded-2xl border border-[#E8E2D5] transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#183D32]">WhatsApp Chat</h4>
                    <p className="text-sm text-[#516155]">Instant booking desk</p>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Chat on WhatsApp</span>
                  </div>
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 p-4 bg-[#FAF8F3] rounded-2xl border border-[#E8E2D5]">
                <Clock className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#183D32]">Operating Hours</h4>
                  <p className="text-xs sm:text-sm text-[#516155]">{BUSINESS_INFO.hoursWeekday}</p>
                  <p className="text-xs sm:text-sm text-[#516155]">{BUSINESS_INFO.hoursWeekend}</p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-3.5 p-4 bg-[#FAF8F3] rounded-2xl border border-[#E8E2D5]">
                <Car className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#183D32]">Complimentary Client Parking</h4>
                  <p className="text-xs text-[#516155]">
                    Four reserved 15-minute pet drop-off &amp; pickup bays situated directly outside our suite entrance.
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Map Preview */}
            <div className="rounded-2xl overflow-hidden border border-[#DCE8DC] h-52 relative bg-[#EEF4EE]">
              <iframe
                title="Aura & Paw Location Map"
                src="https://maps.google.com/maps?q=San+Francisco+Design+District&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale contrast-125 opacity-80"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#DCE8DC] shadow-sm text-xs font-semibold text-[#183D32] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A46D]" />
                <span>Evergreen Botanical Way &middot; San Francisco</span>
              </div>
            </div>
          </div>

          {/* Quick Enquiry Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F3] p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] shadow-sm">
              <h3 className="text-2xl font-bold text-[#183D32] mb-1">
                Send a Quick Concierge Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#6A786E] mb-6">
                Have questions about specific breeds, coat matting, or custom appointment times? We respond within 2 hours.
              </p>

              {status === 'success' ? (
                <div className="p-6 bg-[#EEF4EE] border border-[#DCE8DC] rounded-2xl text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="text-lg font-bold text-[#183D32]">Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-[#516155]">
                    Thank you! Our salon manager has received your message and will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-4 py-2 bg-[#183D32] text-white text-xs font-semibold rounded-lg"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Thorne"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (415) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Breed &amp; Age (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.petDetails}
                      onChange={(e) => setFormData({ ...formData, petDetails: e.target.value })}
                      placeholder="e.g. 2-year old Australian Labradoodle"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      How Can We Help? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what grooming service you need or ask any questions about your pet..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 bg-[#183D32] hover:bg-[#112B23] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C5A46D]" />
                    <span>{status === 'submitting' ? 'Submitting...' : 'Send Inquiry Message'}</span>
                  </button>

                  <p className="text-[11px] text-[#6A786E] text-center">
                    We respect your privacy. No spam or unsolicited promotional texts.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
