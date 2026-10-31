import React, { useState } from 'react';
import { FAQS } from '../data/groomingData';
import { ChevronDown, Search, HelpCircle, PhoneCall, Sparkles, BookOpen } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-15'); // Open a grooming tip by default or faq-1
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Grooming Tips & Coat Care',
    'Booking & Visits',
    'Care & Safety',
    'Pricing & Policies'
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Clear Answers &amp; Pro Advice</span>
            <span aria-hidden="true">·</span>
            <span>Everything You Need to Know</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
            Frequently Asked Questions &amp; <span className="font-editorial italic font-normal text-[#C5A46D]">Coat Care</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            From our fear-free salon protocols to master groomer advice on keeping your pet’s coat silky and tangle-free between appointments.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#6A786E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. brushing, mats, puppies, vaccines)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F3] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  categoryFilter === cat
                    ? 'bg-[#183D32] text-white shadow-xs'
                    : 'bg-[#FAF8F3] text-[#516155] hover:text-[#183D32] border border-[#E8E2D5]'
                }`}
              >
                {cat === 'Grooming Tips & Coat Care' && (
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner when Grooming Tips is selected */}
        {categoryFilter === 'Grooming Tips & Coat Care' && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-[#EEF4EE] border border-[#DCE8DC] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#183D32] shrink-0" />
              <p className="text-xs sm:text-sm text-[#183D32] font-medium">
                <strong>Master Stylist Rule:</strong> Never bathe a pet before 100% detangling. Water tightens loose knots into felted mats.
              </p>
            </div>
            <a
              href="#grooming-tips"
              className="text-xs font-bold text-[#183D32] underline hover:text-[#112B23] shrink-0 whitespace-nowrap"
            >
              See Illustrated Guide ↓
            </a>
          </div>
        )}

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#6A786E] bg-[#FAF8F3] rounded-2xl border border-[#E8E2D5]">
              No questions found matching &ldquo;{searchQuery}&rdquo;. Call our concierge at +1 (800) 555-PAWS and we will answer right away!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const isGroomingTip = faq.category === 'Grooming Tips & Coat Care';
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isGroomingTip
                      ? 'border-[#C5D4C5] bg-[#FAF8F3] ring-1 ring-[#183D32]/5'
                      : 'border-[#E8E2D5] bg-[#FAF8F3]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      {isGroomingTip && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#183D32] bg-[#EEF4EE] px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                          Coat Tip
                        </span>
                      )}
                      <span className="text-base sm:text-lg font-bold text-[#183D32]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6A786E] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#183D32]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#516155] leading-relaxed border-t border-[#E8E2D5]/60 pt-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 max-w-xl mx-auto p-6 bg-[#EEF4EE] rounded-2xl border border-[#DCE8DC] text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-[#183D32] mx-auto" />
          <h4 className="text-lg font-bold text-[#183D32]">
            Still have a specific question about your pet?
          </h4>
          <p className="text-xs sm:text-sm text-[#516155]">
            Our concierge team is available Monday to Saturday to answer any health, coat, or special handling questions.
          </p>
          <div className="pt-2">
            <a
              href="tel:+18005557297"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#183D32] hover:bg-[#112B23] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A46D]" />
              <span>Call +1 (800) 555-PAWS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
