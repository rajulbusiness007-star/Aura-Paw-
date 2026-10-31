import React, { useState } from 'react';
import {
  ShieldAlert,
  Heart,
  Wind,
  Bath,
  Sparkles,
  Award,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ComfortSafetySectionProps {
  onOpenBooking: () => void;
}

export const ComfortSafetySection: React.FC<ComfortSafetySectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'concerns' | 'process'>('concerns');
  const [expandedConcern, setExpandedConcern] = useState<number | null>(0);

  const painPointSolutions = [
    {
      question: 'Is my pet truly safe and monitored during grooming?',
      answer: 'Yes, with zero compromises. We maintain a strict 1-on-1 handler-to-pet protocol. Pets are never left unattended on tables or in tubs. All grooming equipment features safety loop harnesses with panic-release clips, non-slip rubberized traction mats, and hydraulic low-step tables so senior pets never have to jump.'
    },
    {
      question: 'What if my pet is deeply anxious, vocal, or frightened by dryers?',
      answer: 'We never force or rush a frightened animal. We use lavender and chamomile aromatherapy, specialized ear protection "Happy Hoodies" that muffle 70% of velocity dryer pitch, low-frequency variable dryers, and lick-mats with organic peanut butter. If a pet reaches their sensory limit, we pause for play and calm cuddles.'
    },
    {
      question: 'Do you ever use cage or box dryers?',
      answer: 'Never. Cage dryers pose severe thermal regulation risks and cause acute panic. Aura & Paw has an absolute zero-cage-drying policy. 100% of our fluff drying is completed by hand with warm, temperature-regulated airflow by your pet’s dedicated groomer.'
    },
    {
      question: 'What if my pet has sensitive skin, allergies, or chronic hotspots?',
      answer: 'We carry pharmaceutical-grade hypoallergenic oat washes, antimicrobial tea tree rinses, and aloe-soothing botanical formulations. Before touching water, we inspect the skin for abrasions, ticks, hotspots, and dry patches to tailor the restorative shampoo formula.'
    },
    {
      question: 'Do you accept very large dog breeds or shy cats?',
      answer: 'Yes. Our salon was custom-engineered with oversized walk-in hydrobaths that accommodate breeds up to 130 lbs (Newfoundlands, Bernese Mountain Dogs, Great Danes). For felines, we maintain a dedicated soundproof suite with Feliway pheromones where no canine noises or scents can intrude.'
    },
    {
      question: 'Are there hidden fees or surprise add-ons on pickup?',
      answer: 'No. Our pricing is completely upfront and transparent. Crucial hygienic essentials like nail filing, ear cleaning, and gland checks are already integrated into our base service tiers rather than sold as gouging line-item extras.'
    }
  ];

  const fiveStepJourney = [
    {
      step: '01',
      title: 'Gentle Nose-to-Tail Intake & Consultation',
      description: 'Your stylist sits down at eye level with your pet, offers a welcoming treat, and checks coat density, skin health, and your preferred styling aesthetic.'
    },
    {
      step: '02',
      title: 'Botanical Hydrotherapy Bath',
      description: 'Relaxing hydro-massage bath using warm, pH-balanced organic shampoos. We cleanse paws, gently flush ears, and nourish skin without harsh sulfates.'
    },
    {
      step: '03',
      title: 'Low-Stress Hand Warm-Air Fluff Dry',
      description: 'Wearing sound-dampening Happy Hoodies, your pet is dried with low-frequency hand dryers. Mats are gently separated with botanical detanglers.'
    },
    {
      step: '04',
      title: 'Artisanal Scissoring & Breed Styling',
      description: 'Master styling executed with Japanese steel shears to achieve balanced proportions, rounded paws, neat sanitary lines, and velvety ears.'
    },
    {
      step: '05',
      title: 'Paw Balm, Organic Treat & Happy Reunion',
      description: 'We seal paw pads with organic shea butter balm, mist with light botanical coat conditioner, and call you 15 minutes before your pet is ready for pickup.'
    }
  ];

  return (
    <section id="safety" className="py-24 bg-[#FAF8F3] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#183D32] mb-3">
            <span>Your Pet’s Comfort Comes First</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Safety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D32] tracking-tight text-balance">
            Designed to Dissolve Anxiety, Engineered for Total Well-Being
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#516155] leading-relaxed">
            We understand the worry of handing your beloved four-legged family member to someone else. Here is how our standards guarantee calm, safety, and respect at every moment.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-[#EEF4EE] rounded-xl max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('concerns')}
              className={`min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center flex-1 ${
                activeTab === 'concerns'
                  ? 'bg-[#183D32] text-white shadow-sm'
                  : 'text-[#405445] hover:text-[#183D32]'
              }`}
            >
              Owner Concerns Answered
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('process')}
              className={`min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center flex-1 ${
                activeTab === 'process'
                  ? 'bg-[#183D32] text-white shadow-sm'
                  : 'text-[#405445] hover:text-[#183D32]'
              }`}
            >
              Our 5-Step Process
            </button>
          </div>
        </div>

        {/* Tab 1: Owner Concerns Accordion */}
        {activeTab === 'concerns' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {painPointSolutions.map((item, index) => {
              const isExpanded = expandedConcern === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#DCE8DC] shadow-sm transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedConcern(isExpanded ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF4EE] text-[#183D32] flex items-center justify-center shrink-0 font-bold text-xs">
                        {index + 1}
                      </div>
                      <span className="text-base sm:text-lg font-bold text-[#183D32]">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6A786E] transition-transform duration-200 shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#183D32]' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-[#516155] leading-relaxed border-t border-[#FAF8F3]">
                      <div className="flex items-start gap-3 bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E2D5]">
                        <CheckCircle2 className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: 5-Step Process */}
        {activeTab === 'process' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fiveStepJourney.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 rounded-2xl border border-[#DCE8DC] flex flex-col justify-between shadow-sm relative"
              >
                <div>
                  <span className="text-3xl font-extrabold text-[#C5A46D] font-mono block mb-3">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-[#183D32] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#516155] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-14 max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-[#DCE8DC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EEF4EE] text-[#183D32] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-[#183D32]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#183D32]">
                Have a pet with medical, skin or behavioral needs?
              </h4>
              <p className="text-xs text-[#6A786E]">
                We conduct free phone pre-consultations to customize equipment and styling steps.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-[#183D32] hover:bg-[#112B23] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap flex items-center justify-center"
          >
            Speak With A Master Groomer
          </button>
        </div>
      </div>
    </section>
  );
};
