import React, { useState } from 'react';
import { REVIEWS, BUSINESS_INFO } from '../data/groomingData';
import { ReviewItem } from '../types';
import { Star, CheckCircle, MessageSquarePlus, ExternalLink, X, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Review submission form state
  const [formData, setFormData] = useState({
    author: '',
    petName: '',
    petBreed: '',
    petType: 'Dog' as 'Dog' | 'Cat' | 'Puppy',
    rating: 5,
    text: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filters = ['All', 'Dog', 'Cat', 'Puppy'];

  const filteredReviews = selectedFilter === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.petType === selectedFilter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.text) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: formData.author,
      petName: formData.petName || 'My Pet',
      petBreed: formData.petBreed || 'Loved Companion',
      petType: formData.petType,
      rating: formData.rating,
      date: 'Just now',
      text: formData.text,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setFormData({
        author: '',
        petName: '',
        petBreed: '',
        petType: 'Dog',
        rating: 5,
        text: ''
      });
    }, 1800);
  };

  return (
    <section id="reviews" className="py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Reviews Metric */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
              <span>Verified Pet Owners</span>
              <span aria-hidden="true">·</span>
              <span>Genuine Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance font-serif">
              Loved by San Francisco Pets &amp; Their <span className="font-editorial italic font-normal text-[#C5A46D]">Humans</span>
            </h2>
          </div>

          {/* Google Score Banner */}
          <div className="flex items-center gap-4 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E2D5] shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#183D32] text-[#C5A46D] flex items-center justify-center font-bold text-xl font-mono">
              4.96
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#C5A46D] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#516155]">
                Based on <strong>342 verified client reviews</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-[#FAF8F3] rounded-xl border border-[#E8E2D5] w-fit">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center ${
                  selectedFilter === f
                    ? 'bg-[#183D32] text-white shadow-sm'
                    : 'text-[#405445] hover:text-[#183D32]'
                }`}
              >
                {f === 'All' ? 'All Reviews' : `${f}s`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#183D32] bg-[#EEF4EE] hover:bg-[#dce8dc] rounded-xl transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#183D32]" />
            <span>Leave a Verified Review</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#E8E2D5] flex flex-col justify-between hover:border-[#C5D4C5] transition-all"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C5A46D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6A786E]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#202923] leading-relaxed mb-6 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & Pet */}
              <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#183D32] flex items-center gap-1.5">
                    {rev.author}
                    {rev.verified && (
                      <span title="Verified Customer">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#6A786E]">
                    Pet: <strong>{rev.petName}</strong> ({rev.petBreed})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Reviews Link */}
        <div className="mt-12 text-center">
          <a
            href="https://google.com/search?q=Aura+and+Paw+Pet+Grooming+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#183D32] hover:text-[#112B23] underline underline-offset-4"
          >
            <span>Read all 340+ reviews on Google Places</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DCE8DC] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#6A786E] hover:text-[#202923] p-1.5 rounded-full hover:bg-[#FAF8F3]"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#183D32] mb-1">
              Share Your Pet’s Experience
            </h3>
            <p className="text-xs text-[#6A786E] mb-6">
              Your feedback helps other pet parents make confident care choices.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-[#EEF4EE] text-emerald-900 rounded-2xl text-center space-y-2">
                <Heart className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold">Thank You For Your Review!</h4>
                <p className="text-xs">Your kind words have been published to our community wall.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Jessica Sterling"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Name
                    </label>
                    <input
                      type="text"
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      placeholder="e.g. Charlie"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Breed
                    </label>
                    <input
                      type="text"
                      value={formData.petBreed}
                      onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                      placeholder="e.g. Mini Bernedoodle"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Pet Category
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value as any })}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Puppy">Puppy</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl transition-transform hover:scale-110 ${star <= formData.rating ? 'text-[#C5A46D]' : 'text-gray-300'}`}
                          aria-label={`${star} star rating`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">
                    Your Grooming Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Tell us about the groomer, your pet's mood, and the haircut quality..."
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-3 bg-[#183D32] hover:bg-[#112B23] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center"
                >
                  Publish Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
