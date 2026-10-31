import {
  GroomingService,
  TransformationItem,
  ReviewItem,
  GroomerProfile,
  FaqItem,
  GroomingTip
} from '../types';

export const BUSINESS_INFO = {
  name: 'Aura & Paw Grooming Studio',
  tagline: 'Because Every Pet Deserves to Look and Feel Their Best.',
  phone: '+1 (800) 555-PAWS',
  phoneRaw: '+18005557297',
  email: 'concierge@aurapaw.com',
  address: '742 Evergreen Botanical Way, Suite 104, San Francisco, CA 94107',
  hoursWeekday: 'Monday – Saturday: 8:00 AM – 6:00 PM',
  hoursWeekend: 'Sunday: 9:00 AM – 4:00 PM',
  whatsAppNumber: '18005557297',
  whatsAppLink: 'https://wa.me/18005557297?text=Hi%20Aura%20%26%20Paw%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20grooming%20appointment%20for%20my%20pet.',
  googleRating: 4.96,
  reviewCount: 342,
  emergencyPolicy: 'Affiliated 24/7 with SF Veterinary Specialists (0.8 miles away)'
};

export const SERVICES_LIST: GroomingService[] = [
  {
    id: 'full-service',
    name: 'Full-Service Pet Grooming',
    category: 'Full Grooming',
    shortDescription: 'The quintessential head-to-tail grooming journey tailored to your pet’s unique coat and anatomical structure.',
    suitableFor: 'All dogs of every breed and coat condition needing complete styling & wellness.',
    includes: [
      'Warm botanical hydromassage bath',
      'Hypoallergenic conditioning treatment',
      'Gentle hand warm-air fluff blow-dry (zero cage drying)',
      'Full bespoke scissor haircut & breed styling',
      'Nail clip, edge buffing & paw pad balm',
      'Ear cleaning & natural breath freshener'
    ],
    durationMinutes: 90,
    startingPrice: 85,
    featured: true
  },
  {
    id: 'dog-haircuts',
    name: 'Dog Haircuts & Breed Styling',
    category: 'Haircuts',
    shortDescription: 'Artisanal hand-scissored haircuts by certified breed stylists honoring classic standards or modern teddy-bear aesthetics.',
    suitableFor: 'Doodles, Poodles, Shih Tzus, Terriers, Spaniels & coated breeds.',
    includes: [
      'One-on-one styling consultation with your groomer',
      'Precision face, chin, and ear sculpting',
      'Sanitary hygienic contour trimming',
      'Silky leave-in coat protector finish'
    ],
    durationMinutes: 75,
    startingPrice: 70
  },
  {
    id: 'bath-blowdry',
    name: 'Bath and Blow-Dry',
    category: 'Bath & Spa',
    shortDescription: 'Restorative deep-cleansing hydrobath using organic botanicals, followed by gentle low-noise warm air fluff drying.',
    suitableFor: 'Short, smooth, wire, and double-coated dogs seeking pure refreshment.',
    includes: [
      'Two-step deep lather botanical wash',
      'De-greasing and sebum balancing rinse',
      'High-velocity undercoat moisture expulsion',
      'Gentle hand blow-dry and full coat brushing'
    ],
    durationMinutes: 45,
    startingPrice: 50
  },
  {
    id: 'breed-specific',
    name: 'Breed-Specific Haircuts',
    category: 'Haircuts',
    shortDescription: 'Meticulous breed-standard profiling for show or companion presentation, executed with Japanese steel shears.',
    suitableFor: 'Schnauzers, Westies, Bichons, Poodles, Airedales & Cocker Spaniels.',
    includes: [
      'Hand stripping or precision breed pattern clipper/scissor work',
      'Head, beard, brow and tail sculpting to standard',
      'Symmetry check and posture alignment check'
    ],
    durationMinutes: 90,
    startingPrice: 95,
    featured: true
  },
  {
    id: 'nail-paw-care',
    name: 'Nail Trimming & Paw Care',
    category: 'Specialty',
    shortDescription: 'Stress-free nail trimming, diamond-grit filing to smooth edges, and deep organic shea butter paw pad massage.',
    suitableFor: 'All dogs and cats with overgrown nails, rough or cracked paw pads.',
    includes: [
      'Quick-safe nail clipping',
      'Diamond rotary buffer edge smoothing',
      'Paw pad hair clearing for slip prevention',
      'Nourishing organic beeswax & shea paw balm application'
    ],
    durationMinutes: 20,
    startingPrice: 25
  },
  {
    id: 'ear-cleaning',
    name: 'Ear Cleaning & Hygiene',
    category: 'Specialty',
    shortDescription: 'Gentle pH-balanced ear canal flushing, debris dissolution, and non-invasive ear canal hygiene inspection.',
    suitableFor: 'All breeds, especially floppy-eared breeds prone to moisture retention.',
    includes: [
      'Natural witch hazel and aloe flush',
      'Gentle wipe of outer ear flap and canal entry',
      'Excess canal hair trimming (upon veterinary approval only)'
    ],
    durationMinutes: 15,
    startingPrice: 20
  },
  {
    id: 'teeth-brushing',
    name: 'Teeth Brushing & Oral Hygiene',
    category: 'Specialty',
    shortDescription: 'Plaque-reducing enzymatic dental gel brushing with soft-bristle silicone brush followed by chlorophyll mint breath spray.',
    suitableFor: 'All dogs and receptive cats for daily tartar maintenance.',
    includes: [
      'Enzymatic natural poultry or vanilla toothpaste application',
      'Gumline gentle micro-massage',
      'Fresh breath botanical mist',
      'Plaque check report for owner'
    ],
    durationMinutes: 15,
    startingPrice: 18
  },
  {
    id: 'de-shedding',
    name: 'De-shedding Treatment & Undercoat Sweep',
    category: 'Specialty',
    shortDescription: 'Proprietary 4-step undercoat release treatment reducing household pet hair shedding by up to 85%.',
    suitableFor: 'Golden Retrievers, Huskies, German Shepherds, Corgis, Labs, and dense double-coated breeds.',
    includes: [
      'Undercoat release shampoo & omega-rich conditioning soak',
      'High-velocity pore-opening warm air blow-out',
      'Carding and rake de-shedding by hand',
      'Anti-shedding coat finishing serum'
    ],
    durationMinutes: 75,
    startingPrice: 65,
    featured: true
  },
  {
    id: 'puppy-first-groom',
    name: 'Puppy First-Groom Experience',
    category: 'Full Grooming',
    shortDescription: 'A positive, fear-free introduction to salon sounds, water sensations, clippers, and gentle handling for lifelong confidence.',
    suitableFor: 'Puppies aged 12 to 24 weeks with completed initial vaccinations.',
    includes: [
      'Gentle room acclimation & positive reinforcement play',
      'Lukewarm micro-bubble bath with tearless oatmeal shampoo',
      'Low-noise velocity dryer gentle introduction',
      'Paw, eye-fringe, and sanitary tidy',
      'Puppy graduation certificate & treat bag'
    ],
    durationMinutes: 45,
    startingPrice: 45,
    featured: true
  },
  {
    id: 'cat-grooming',
    name: 'Cat Grooming & Lion / Teddy Cuts',
    category: 'Specialty',
    shortDescription: 'Quiet, feline-exclusive handling sessions in our private cat salon suite away from canine sights and scents.',
    suitableFor: 'Long-hair & short-hair cats (Persian, Ragdoll, Maine Coon, Domestic).',
    includes: [
      'Feline pheromone (Feliway) calming environment',
      'Dry foam or waterless bath / warm bath if tolerated',
      'Mat removal, comb-out, sanitary or lion cut styling',
      'Cat nail caps or nail trim'
    ],
    durationMinutes: 60,
    startingPrice: 75
  },
  {
    id: 'flea-tick',
    name: 'Flea & Tick Botanical Treatment',
    category: 'Bath & Spa',
    shortDescription: 'Natural cedarwood, rosemary, and peppermint treatment to safely eliminate pests without harsh neurotoxins.',
    suitableFor: 'Dogs with active parasite exposure (subject to salon intake triage).',
    includes: [
      '15-minute botanical contact soak',
      'Thorough fine-tooth pest comb-out',
      'Deep soothing aloe and chamomile skin recovery rinse',
      'Sanitization protocol for equipment'
    ],
    durationMinutes: 60,
    startingPrice: 55
  },
  {
    id: 'specialized-coat-care',
    name: 'Specialised Coat Care & Moisture Mask',
    category: 'Specialty',
    shortDescription: 'Deep hydration keratin, argan, or dead sea mineral mask designed to heal dry coats, relieve itchiness, and restore silkiness.',
    suitableFor: 'Brittle, sun-bleached, itchy, dry, or damaged canine & feline coats.',
    includes: [
      'Warm towel wrap conditioning therapy',
      'Collagen & silk peptide coat infusion',
      'Hot oil or restorative botanical mask application',
      'Ultra-gloss anti-static brushing'
    ],
    durationMinutes: 45,
    startingPrice: 40
  }
];

export const BEFORE_AFTER_GALLERY: TransformationItem[] = [
  {
    id: 'cockapoo-milo',
    petName: 'Milo',
    petBreed: 'Cockapoo (3 Years Old)',
    category: 'Haircuts',
    beforeImage: '/src/assets/images/grooming_before_dog_1793371517543.jpg',
    afterImage: '/src/assets/images/grooming_after_dog_1793371518089.jpg',
    serviceRendered: 'Signature Full Groom & Asian Fusion Teddy Bear Cut',
    stylistNote: 'Milo arrived with 4 months of overgrown, dense curly coat covering his vision. We performed a gentle detangling soak, precision scissoring around the eyes, rounded velvety cheeks, and a symmetrical hand-scissored body contour.',
    sessionDuration: '1 hour 45 mins'
  },
  {
    id: 'cat-penelope',
    petName: 'Penelope',
    petBreed: 'British Shorthair Lilac',
    category: 'Cats',
    beforeImage: '/src/assets/images/cat_grooming_after_1793371518507.jpg',
    afterImage: '/src/assets/images/cat_grooming_after_1793371518507.jpg',
    serviceRendered: 'Cat Luxury De-Shed & Botanical Silk Bath',
    stylistNote: 'Penelope was experiencing dense seasonal undercoat shedding. In our quiet feline suite with lavender pheromones, we performed an undercoat rake, gentle warm foam wash, and full comb out.',
    sessionDuration: '55 mins'
  },
  {
    id: 'doodle-oliver',
    petName: 'Oliver',
    petBreed: 'Golden Doodle (2 Years Old)',
    category: 'Dogs',
    beforeImage: '/src/assets/images/hero_groomed_dog_1793371516993.jpg',
    afterImage: '/src/assets/images/hero_groomed_dog_1793371516993.jpg',
    serviceRendered: 'Atelier Royal Spa & Fluff Scissor Silhouette',
    stylistNote: 'Oliver is active outdoors. We treated his coat with our argan moisture pack, scissor-shaped his ears and muzzle, and finished with a paw pad deep butter conditioning.',
    sessionDuration: '2 hours'
  }
];

export const TRUST_PILLARS = [
  {
    number: '01',
    title: 'Certified Fear-Free Handlers',
    description: 'Every stylist is formally trained in low-stress canine body language, gentle desensitization, and positive reinforcement reward protocols.'
  },
  {
    number: '02',
    title: 'Medical-Grade Sanitization',
    description: 'All blades, grooming tables, shears, and towels undergo hospital-grade hospital autoclave & UV-C sterilization between every individual appointment.'
  },
  {
    number: '03',
    title: 'Zero Cage Drying Ever',
    description: 'We believe cage drying is dangerous and stressful. 100% of our drying is done by hand with warm, temperature-regulated low-noise airflow.'
  },
  {
    number: '04',
    title: '1-on-1 Dedicated Stylist Attention',
    description: 'Your pet works with one groomer from intake to pickup. No assembly lines, no multi-dog chaos, and no waiting in crates for hours.'
  },
  {
    number: '05',
    title: 'Pure Organic Botanical Shampoos',
    description: 'We exclusively use biodegradable, sulfate-free, and paraben-free cleansers made with colloidal oatmeal, aloe vera, and natural essential oils.'
  },
  {
    number: '06',
    title: 'Transparent Guaranteed Pricing',
    description: 'Upfront estimate before any service starts. No surprise hidden charges for basic nail trimming, ear cleaning, or gentle handling.'
  }
];

export const GROOMERS: GroomerProfile[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Founder & Master Stylist',
    experienceYears: 11,
    certifications: ['National Certified Master Groomer (NCMG)', 'Fear-Free Certified Professional', 'Pet First Aid & CPR'],
    specialty: 'Doodles, Poodles, Asian Fusion Scissoring & Anxious Pets',
    imageUrl: '/src/assets/images/groomer_artisan_1793371518503.jpg',
    bio: 'With over a decade of dedicated styling in high-end European and Californian salons, Elena founded Aura & Paw to eliminate the assembly-line stress of conventional grooming and create an unhurried, loving sanctuary for pets.'
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Senior Breed & De-Shedding Specialist',
    experienceYears: 8,
    certifications: ['AKC S.A.F.E. Certified Groomer', 'Double-Coat Care Specialist', 'Canine Dermatological Hygiene'],
    specialty: 'Golden Retrievers, German Shepherds, Terriers & Hand Stripping',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Marcus has mastered coat physics and undercoat release therapy. His calm demeanour puts even the most vocal or nervous big dogs at ease within moments of arriving on the grooming table.'
  },
  {
    id: 'sophie-laurent',
    name: 'Sophie Laurent',
    role: 'Feline Specialist & Gentle Touch Stylist',
    experienceYears: 7,
    certifications: ['Certified Feline Master Groomer (CFMG)', 'Cat Friendly Professional (AAFP)', 'Low-Stress Pet Handler'],
    specialty: 'Cats (Longhair & Persian), Puppies First-Grooms & Senior Pets',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Sophie leads our dedicated feline quiet suite. Her whisper-soft technique and patience transform cat grooming from a dreaded chore into a soothing, restorative experience.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Clara Montrose',
    petName: 'Barnaby',
    petBreed: 'Mini Goldendoodle',
    petType: 'Dog',
    rating: 5,
    date: 'October 18, 2026',
    text: 'Barnaby used to shake uncontrollably at our previous salon. Coming to Aura & Paw was life-changing. Elena took the time to let him sniff the shears and greeted him with roasted turkey bites. His teddy bear cut is the cleanest he has ever had, and he came out with his tail wagging!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Julian Sterling',
    petName: 'Miso',
    petBreed: 'Scottish Fold Longhair',
    petType: 'Cat',
    rating: 5,
    date: 'October 24, 2026',
    text: 'Finding a true feline groomer in the city who doesn’t rely on heavy sedation is nearly impossible. Sophie is a magician. Miso was calm, beautifully dematted, and smelled like fresh chamomile. The private cat room makes all the difference.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Amara & David Ruiz',
    petName: 'Kona',
    petBreed: 'Siberian Husky',
    petType: 'Dog',
    rating: 5,
    date: 'October 5, 2026',
    text: 'The hydro de-shedding treatment took out bags of undercoat without damaging Kona’s guard hairs. Our home has 80% less floating hair on the rugs now. Marcus is remarkably gentle with strong double-coated dogs.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Dr. Gregory Hayes',
    petName: 'Waffles',
    petBreed: 'French Bulldog',
    petType: 'Puppy',
    rating: 5,
    date: 'September 29, 2026',
    text: 'We booked the Puppy First-Groom for Waffles when he was 16 weeks old. The team gave us a detailed report card and graduation certificate. He now gets thrilled whenever we walk down Evergreen Way!',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Booking & Visits',
    question: 'How do I book an appointment?',
    answer: 'You can book easily online through our 24/7 interactive booking portal on this website, send us a direct message on WhatsApp (+1 800-555-PAWS), or call our concierge desk during operating hours. We confirm your date and stylist promptly.'
  },
  {
    id: 'faq-2',
    category: 'Booking & Visits',
    question: 'What should I bring to my appointment?',
    answer: 'Please bring your pet on a secure leash or in an appropriate carrier. Bring an up-to-date copy of their vaccination records (or email them in advance), and any favorite training treats if your pet has specific dietary restrictions.'
  },
  {
    id: 'faq-3',
    category: 'Care & Safety',
    question: 'How long does grooming take?',
    answer: 'Most standard bath and styling appointments take between 75 and 105 minutes. We book 1-on-1 private appointments, meaning your pet is continuously worked on and never sits in a holding crate for hours waiting for their turn. We text you 15 minutes before completion.'
  },
  {
    id: 'faq-4',
    category: 'Care & Safety',
    question: 'Do you groom puppies?',
    answer: 'Yes! Our signature Puppy First-Groom Experience is specially crafted for pups aged 12 to 24 weeks. It introduces warm water, gentle clippers, and dryers through positive reinforcement so grooming becomes a lifelong joy rather than a source of anxiety.'
  },
  {
    id: 'faq-5',
    category: 'Care & Safety',
    question: 'Do you accept cats?',
    answer: 'Absolutely. We feature a private, sound-insulated feline quiet suite with specialized Feliway feline pheromone diffusers, located completely away from dog stations. Handled exclusively by our Certified Feline Master Stylist.'
  },
  {
    id: 'faq-6',
    category: 'Care & Safety',
    question: 'Do you groom large dog breeds?',
    answer: 'Yes! We love gentle giants. Our salon features low-entry hydraulic electric tables and walk-in hydrobaths that comfortably support dogs up to 130 lbs including Bernese Mountain Dogs, Newfoundlands, Great Danes, and Standard Poodles.'
  },
  {
    id: 'faq-7',
    category: 'Care & Safety',
    question: 'Can I stay with my pet during grooming?',
    answer: 'For safety and focus, pets groom much more calmly without owner presence, as they naturally look for cues to jump off the table or protect you. However, you are welcome to watch through our reception viewing window during the initial consultation.'
  },
  {
    id: 'faq-8',
    category: 'Care & Safety',
    question: 'What happens if my pet is anxious or frightened?',
    answer: 'Our stylists are certified Fear-Free professionals. We never force a dog through fear. We use soothing aromatherapy, low-noise velocity dryers, lick mats with peanut butter or organic pumpkin, and take breaks whenever required.'
  },
  {
    id: 'faq-9',
    category: 'Care & Safety',
    question: 'How often should my pet be groomed?',
    answer: 'We recommend every 4 to 6 weeks for curly, double-coated, and long-hair breeds (such as Doodles, Poodles, and Shih Tzus) to prevent painful matting. Short-hair dogs benefit from a bath and nail maintenance every 6 to 8 weeks.'
  },
  {
    id: 'faq-10',
    category: 'Care & Safety',
    question: 'Do you provide breed-specific haircuts?',
    answer: 'Yes. Our groomers are trained in traditional breed show standards (West Highland White Terrier hand profiling, Schnauzer beards and furnishings, Cocker Spaniel skirts) as well as modern Asian Fusion and teddy bear cuts.'
  },
  {
    id: 'faq-11',
    category: 'Pricing & Policies',
    question: 'What are your cancellation and rescheduling policies?',
    answer: 'We ask for at least 24 hours courtesy notice for cancellations or date changes so we can offer the slot to our waitlist. Late cancellations within 12 hours may incur a 50% reservation fee.'
  },
  {
    id: 'faq-12',
    category: 'Pricing & Policies',
    question: 'Do you have any vaccination requirements?',
    answer: 'Yes, to protect all our furry guests, dogs must be up to date on Rabies and DHPP (Distemper/Parvo). Bordetella (kennel cough) is strongly recommended. For cats, Rabies and FVRCP are required.'
  },
  {
    id: 'faq-13',
    category: 'Pricing & Policies',
    question: 'How much does grooming cost?',
    answer: 'Pricing depends on pet size, coat condition, and chosen service. Basic baths start at $50, while Full-Service Styling starts at $85 for small dogs and $115 for large curly breeds. We provide an exact quote upon intake before we begin.'
  },
  {
    id: 'faq-14',
    category: 'Booking & Visits',
    question: 'Can I request a specific groomer?',
    answer: 'Yes! When booking online or over the phone, you can select your preferred groomer (Elena, Marcus, or Sophie) at no extra cost, subject to their schedule availability.'
  },
  {
    id: 'faq-15',
    category: 'Grooming Tips & Coat Care',
    question: 'How do I maintain my Doodle or Poodle coat between appointments without painful matting?',
    answer: 'The secret is "line-brushing" down to the skin rather than stroking the surface. Part the fur with one hand to expose the pink skin, and brush small sections with a long-pin slicker brush from the root outward. Follow every session with a stainless-steel metal comb ("greyhound comb")—if the comb glides freely through to the skin without snagging, your pet is 100% mat-free.'
  },
  {
    id: 'faq-16',
    category: 'Grooming Tips & Coat Care',
    question: 'Can I bathe my dog at home if I notice tangles or mats starting to form?',
    answer: 'Never bathe a matted pet at home! Water acts like a felt shrinker on tangled hair, causing the knots to tighten drastically against the skin like hard cords. Always completely brush and comb through every tangle before getting the coat wet. If a mat is already tight, let a master groomer gently release it with conditioning detanglers.'
  },
  {
    id: 'faq-17',
    category: 'Grooming Tips & Coat Care',
    question: 'Should I shave my double-coated dog (Golden, Husky, Corgi, Shepherd) for hot summer months?',
    answer: 'We strongly advise against shaving double coats. A double coat consists of dense insulating undercoat and weather-resistant guard hairs that act as a natural thermoregulating thermos—keeping heat and UV rays out in summer and warmth in during winter. Shaving can cause post-clipping alopecia, severe sunburn, and ruin coat texture. Instead, book our high-velocity hydro de-shedding treatment.'
  },
  {
    id: 'faq-18',
    category: 'Grooming Tips & Coat Care',
    question: 'How do I prevent tear stains and keep my pet’s eye area clean?',
    answer: 'Gently wipe the eye area once daily using a warm damp microfiber cloth or a sterile saline solution wipe. Always wipe downward and away from the eyeball. Keep the eye corners dry to inhibit red yeast (Pityrosporum) bacteria that thrive in moist eye fur. Avoid tap water with high mineral content in their drinking bowl.'
  },
  {
    id: 'faq-19',
    category: 'Grooming Tips & Coat Care',
    question: 'How can I protect my pet’s paw pads from cracking or irritation between visits?',
    answer: 'Inspect your pet’s paw pads weekly, especially after city walks on hot asphalt or cold damp days. Apply an organic beeswax or shea butter paw balm 2 to 3 times a week before bedtime. If your dog licks their paws constantly, gently rinse their paws in lukewarm water after outdoor walks to remove environmental allergens and city salts.'
  },
  {
    id: 'faq-20',
    category: 'Grooming Tips & Coat Care',
    question: 'What is the best at-home grooming routine for longhaired cats?',
    answer: 'Cats benefit from a 5-minute daily session using a fine-toothed metal comb or silicone grooming mitt. Pay special attention to high-friction friction zones: behind the ears, armpits, and under the belly. Comb gently when your cat is relaxed or after meals, rewarding them with small treats so they associate comb time with comfort.'
  }
];

export const GROOMING_TIPS: GroomingTip[] = [
  {
    id: 'tip-line-brushing',
    title: 'The Master Line-Brushing Method',
    targetPet: 'Doodles, Poodles, Cockapoos & Curly Coated Breeds',
    frequency: 'Every 2 to 3 Days (10–15 minutes)',
    summary: 'Surface brushing only glides over the outer guard curls while leaving dense mats tightening silently at the root. Line-brushing guarantees your pet stays fluffy and pain-free.',
    expertSteps: [
      'Gently place your non-dominant hand flat on the coat and pull a section of hair upward to expose the skin.',
      'Using a soft, long-pin slicker brush, brush downward in small, gentle strokes starting right above the skin line.',
      'Work in organized horizontal rows from the paws upward to the back and neck.',
      'Finish by running a metal greyhound comb through the brushed section; the teeth must glide down to the skin without snagging.'
    ],
    recommendedTool: 'Long-Pin Curved Slicker Brush & 7.5" Steel Greyhound Comb',
    cautionNotice: 'Never use household scissors to cut out a mat near the skin—canine skin is paper-thin and easily caught in scissor blades.'
  },
  {
    id: 'tip-double-coat',
    title: 'Undercoat Shedding & Thermal Balance',
    targetPet: 'Golden Retrievers, Huskies, Corgis, German Shepherds',
    frequency: '2x Weekly (Daily during Spring & Autumn coat blows)',
    summary: 'Double coats have a built-in air insulation layer. Removing dead dead undercoat allows airflow to reach the skin so your pet naturally stays cool in summer and warm in winter.',
    expertSteps: [
      'Lightly mist the coat with a leave-in conditioning spray to prevent hair shaft breakage while dry brushing.',
      'Use an undercoat rake with rotating rounded teeth to pull out dead, trapped undercoat with gentle parallel strokes.',
      'Follow with a slicker brush to collect loose hairs on the coat surface.',
      'Never shave or clip guard hairs down, as this destroys natural UV protection and increases heatstroke vulnerability.'
    ],
    recommendedTool: 'Rotating Tooth Undercoat Rake & Botanical Conditioning Mist',
    cautionNotice: 'Avoid excessive pressure with undercoat rakes on bony areas (hips, spine, hocks) to prevent skin burn.'
  },
  {
    id: 'tip-bath-prep',
    title: 'The Golden Rule of At-Home Baths',
    targetPet: 'All Coated Canine & Feline Breeds',
    frequency: 'Every 3 to 6 Weeks as Needed',
    summary: 'Wetting an unbrushed coat causes tangles to bind together like felt. Follow this strict pre-bath protocol to prevent painful pelted matting.',
    expertSteps: [
      'Perform a 100% thorough line-brush and comb-out before turning on the water.',
      'Test water temperature on your inner wrist—it should be lukewarm, never hot.',
      'Dilute botanical shampoo in a cup of water before applying for gentle, even lathering that rinses out quickly.',
      'Rinse for a full 3 to 5 minutes to ensure no shampoo residue remains, which causes itching and dandruff.',
      'Towel-press dry (do not rub vigorously) and hand-dry with a warm hairdryer on low setting while gently brushing.'
    ],
    recommendedTool: 'Microfiber Super-Absorbent Towel & Dilution Mixing Bottle',
    cautionNotice: 'Never leave water in the ear canals; gently dry outer ears with a soft cotton pad immediately after bathing.'
  },
  {
    id: 'tip-feline-care',
    title: 'Quiet Feline Coat Harmony',
    targetPet: 'Persians, Ragdolls, Maine Coons & Longhair Cats',
    frequency: 'Daily 3-to-5 Minute Calm Session',
    summary: 'Cats groom themselves, but loose hair easily leads to painful hairballs and armpit mats. Short, serene sessions keep your feline comfortable.',
    expertSteps: [
      'Choose a peaceful moment when your cat is sleepy or purring.',
      'Start with gentle strokes using a soft-bristle brush along their cheeks and chin where scent glands are concentrated.',
      'Transition to a fine-toothed metal comb, working carefully under the armpits, chest ruff, and pantaloons.',
      'Keep sessions short (under 5 minutes) and end with their favorite freeze-dried protein treat.'
    ],
    recommendedTool: 'Dual-Spaced Fine Metal Comb & Silicone Massage Glove',
    cautionNotice: 'If your cat displays a twitching tail or pinned ears, pause immediately. Respect their boundaries to preserve trust.'
  }
];

export const PRICING_PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Bath & Hygiene',
    tier: 'Basic Refresh',
    startingPrice: 55,
    idealFor: 'Short or smooth coat dogs needing freshening up and hygiene care.',
    includes: [
      'Two-step deep lather botanical wash',
      'Hydrating conditioner rinse',
      'Gentle hand blow-dry (zero cage drying)',
      'Nail clipping & edge smoothing',
      'Ear cleaning with natural botanicals',
      'Sanitary & paw pad hair clearance'
    ]
  },
  {
    id: 'signature',
    name: 'Signature Full Groom',
    tier: 'Most Popular',
    startingPrice: 85,
    popular: true,
    idealFor: 'All coated breeds, doodles, and pets needing complete haircut styling.',
    includes: [
      'Everything in Essential Bath & Hygiene',
      'Full bespoke haircut & breed scissor styling',
      'Face, muzzle, and ear shaping',
      'Paw pad organic butter massage',
      'Enzymatic fresh breath teeth brushing',
      'Signature silk leave-in conditioning spray'
    ]
  },
  {
    id: 'presidential',
    name: 'Royal Atelier Spa & Restoration',
    tier: 'Luxury Experience',
    startingPrice: 125,
    idealFor: 'Pets with dry or matted coats, sensitive skin, or seeking royal treatment.',
    includes: [
      'Everything in Signature Full Groom',
      'Dead Sea mineral mud bath or argan oil mask',
      'Warm towel wrap therapy (15 mins)',
      'Undercoat release high-velocity treatment',
      'Blueberry antioxidant facial wash',
      'Take-home gourmet treat & cologne mist'
    ]
  },
  {
    id: 'puppy',
    name: 'Puppy First-Step Intro',
    tier: 'Puppies 12–24 wks',
    startingPrice: 45,
    idealFor: 'Young pups establishing gentle positive associations with grooming.',
    includes: [
      'Gentle sensory introduction to equipment',
      'Tearless gentle micro-bubble bath',
      'Fluff dry on low warm setting',
      'Eye fringe & paw pad neatening',
      'Nail trim and positive treat rewards',
      'Puppy milestone graduation certificate'
    ]
  }
];
