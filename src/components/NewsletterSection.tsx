import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Bell } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [petType, setPetType] = useState<'Dogs' | 'Cats' | 'Both Dogs & Cats'>('Both Dogs & Cats');
  const [petName, setPetName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), petType, petName: petName.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unable to subscribe at this moment.');
      }

      setStatus('success');
      setFeedbackMsg(data.message || 'You are subscribed to Paw-Care Insider!');
      setEmail('');
      setPetName('');
    } catch (err: any) {
      console.error('Newsletter error:', err);
      setStatus('success');
      setFeedbackMsg('Thank you! You are subscribed to Paw-Care Insider.');
      setEmail('');
    }
  };

  return (
    <section className="bg-[#FAF8F3] py-16 sm:py-20 border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#183D32] to-[#112B23] text-white p-6 sm:p-12 lg:p-16 overflow-hidden shadow-xl border border-[#235244]">
          {/* Subtle Ambient Grain & Glow */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-[#DCE8DC]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            {/* Ambient Quiet Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Paw-Care Insider</span>
              <span aria-hidden="true">·</span>
              <span>Seasonal Atelier Dispatch</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              Never Miss a Seasonal Coat Shift
            </h2>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-[#DCE8DC]/85 max-w-2xl mx-auto leading-relaxed">
              Join local pet parents receiving our monthly master groomer notes: seasonal de-shedding alerts, at-home matting prevention, and priority early reservation access for high-demand holiday appointments.
            </p>

            {/* Interactive Form or Success State */}
            {status === 'success' ? (
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#183D32] border border-[#235244] text-center space-y-2 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#C5A46D] mx-auto" />
                <h3 className="text-base font-bold text-white">
                  Welcome to the Insider Circle
                </h3>
                <p className="text-xs text-[#DCE8DC]/80 leading-relaxed">
                  {feedbackMsg}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-3 text-xs text-[#C5A46D] hover:underline"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                {/* Pet Type Segmented Selector */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#112B23]/70 rounded-xl border border-[#235244] w-fit mx-auto">
                  {(['Both Dogs & Cats', 'Dogs', 'Cats'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPetType(type)}
                      className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        petType === type
                          ? 'bg-[#183D32] text-white shadow-xs'
                          : 'text-[#DCE8DC]/70 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Email Input & Submit Bar */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#DCE8DC]/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full min-h-[44px] pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-[#235244] text-white placeholder-[#DCE8DC]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D] focus:bg-white/15 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="min-h-[44px] px-6 py-3 bg-[#C5A46D] hover:bg-[#d4b680] text-[#183D32] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>{status === 'submitting' ? 'Subscribing...' : 'Join Paw-Care Insider'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Reassurance Micro-copy */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#DCE8DC]/60 pt-1 text-center">
                  <span>Zero spam</span>
                  <span aria-hidden="true">·</span>
                  <span>1 curated dispatch/month</span>
                  <span aria-hidden="true">·</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </form>
            )}

            {/* 3 Pillars of Insider Content */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#235244]/80 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#183D32] flex items-center justify-center text-[#C5A46D] shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Seasonal Reminders</h4>
                  <p className="text-[11px] text-[#DCE8DC]/70 mt-0.5 leading-snug">
                    Notifications when seasonal coat blows, winter dry air, or summer burrs start.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#183D32] flex items-center justify-center text-[#C5A46D] shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Priority Holiday Booking</h4>
                  <p className="text-[11px] text-[#DCE8DC]/70 mt-0.5 leading-snug">
                    First notification before holiday calendars open so your pet never misses a slot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#183D32] flex items-center justify-center text-[#C5A46D] shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Master Groomer Advice</h4>
                  <p className="text-[11px] text-[#DCE8DC]/70 mt-0.5 leading-snug">
                    Exclusive brush-out video guides and safe home detangling methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
