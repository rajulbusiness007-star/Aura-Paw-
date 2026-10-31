export interface BreedRecommendation {
  coatType: string;
  defaultSize: 'Toy (< 10 lbs)' | 'Small (10 - 25 lbs)' | 'Medium (25 - 50 lbs)' | 'Large (50 - 80 lbs)' | 'Giant (80+ lbs)' | 'Cat (All Sizes)';
  suggestedAddons: {
    id: string;
    name: string;
    price: number;
    description: string;
    tag: string;
  }[];
  groomerTip: string;
}

export interface BreedOption {
  name: string;
  species: 'Dog' | 'Cat';
  group: string;
  info: BreedRecommendation;
}

export const COMMON_BREEDS: BreedOption[] = [
  // DOODLES & CURLY COATS
  {
    name: 'Goldendoodle (Mini/Standard)',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Curly / Fleece / Wool',
      defaultSize: 'Medium (25 - 50 lbs)',
      groomerTip: 'Curly fleece coats need deep hydration to prevent friction mats in the armpits and collar zones.',
      suggestedAddons: [
        {
          id: 'argan-mask',
          name: 'Argan Moisture Coat Infusion',
          price: 25,
          description: 'Restores elasticity to curly locks and prevents post-groom tangling.',
          tag: 'Highly Recommended for Doodles'
        },
        {
          id: 'teeth-enzymatic',
          name: 'Fresh Breath Enzymatic Teeth Brushing',
          price: 18,
          description: 'Plaque-clearing enzyme gel with soft silicone bristles.',
          tag: 'Oral Hygiene'
        }
      ]
    }
  },
  {
    name: 'Labradoodle',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Wavy / Curly Fleece',
      defaultSize: 'Large (50 - 80 lbs)',
      groomerTip: 'Dense double-textured doodle hair benefits from leave-in detangling silk.',
      suggestedAddons: [
        {
          id: 'argan-mask',
          name: 'Argan Moisture Coat Infusion',
          price: 25,
          description: 'Restores coat luster and softens dense fleece curls.',
          tag: 'Curl Care'
        },
        {
          id: 'paw-butter',
          name: 'Organic Shea Butter Paw Pad Massage',
          price: 15,
          description: 'Soothes sidewalk-weary paw pads with organic shea and beeswax.',
          tag: 'Paw Therapy'
        }
      ]
    }
  },
  {
    name: 'Cockapoo / Cavapoo',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Soft Wavy / Curly',
      defaultSize: 'Small (10 - 25 lbs)',
      groomerTip: 'Ear canals are prone to moisture retention. Our gentle ear flush keeps ears fresh.',
      suggestedAddons: [
        {
          id: 'teddy-bear-scissoring',
          name: 'Asian Fusion Teddy Bear Head Sculpt',
          price: 20,
          description: 'Velvety rounded cheeks, neat eye fringe, and circular snout detailing.',
          tag: 'Signature Styling'
        },
        {
          id: 'ear-flush',
          name: 'Natural Aloe & Witch Hazel Ear Hygiene Flush',
          price: 15,
          description: 'Clears wax buildup and protects floppy ears.',
          tag: 'Floppy Ear Care'
        }
      ]
    }
  },
  {
    name: 'Bernedoodle',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Heavy Wavy / Curly Double Fleece',
      defaultSize: 'Large (50 - 80 lbs)',
      groomerTip: 'Bernedoodles carry thick coat volume; undercoat thinning ensures comfort.',
      suggestedAddons: [
        {
          id: 'argan-mask',
          name: 'Argan Moisture Coat Infusion',
          price: 25,
          description: 'Prevents heavy winter matting and promotes silky brush-out.',
          tag: 'Heavy Coat Care'
        },
        {
          id: 'deshed-undercoat',
          name: 'High-Velocity Undercoat Sweep',
          price: 30,
          description: 'Expels trapped dead hairs before final scissor styling.',
          tag: 'Undercoat Release'
        }
      ]
    }
  },
  {
    name: 'Poodle (Toy / Miniature / Standard)',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Single Layer Dense Curly Wool',
      defaultSize: 'Medium (25 - 50 lbs)',
      groomerTip: 'Pure poodle wool requires precision Japanese scissor profiling to hold shape.',
      suggestedAddons: [
        {
          id: 'precision-scissor',
          name: 'Hand-Scissored Lamb or Modern Contour',
          price: 25,
          description: 'Razor-sharp Japanese shear profiling along legs, neck, and crest.',
          tag: 'Breed Standard'
        },
        {
          id: 'teeth-enzymatic',
          name: 'Fresh Breath Enzymatic Teeth Brushing',
          price: 18,
          description: 'Enzymatic gel brushing to remove tartar buildup.',
          tag: 'Oral Hygiene'
        }
      ]
    }
  },
  {
    name: 'Bichon Frise / Maltese',
    species: 'Dog',
    group: 'Doodles & Curly Coats',
    info: {
      coatType: 'Fine White Silk / Powder-Puff',
      defaultSize: 'Toy (< 10 lbs)',
      groomerTip: 'White coats benefit from tear-stain enzymes and blueberry antioxidant facials.',
      suggestedAddons: [
        {
          id: 'blueberry-facial',
          name: 'Blueberry Tear-Stain Mineral Facial',
          price: 18,
          description: 'Gently cleanses tear tracks and brightens facial white coat.',
          tag: 'Brightening Care'
        },
        {
          id: 'paw-butter',
          name: 'Organic Shea Butter Paw Pad Massage',
          price: 15,
          description: 'Moisturizes delicate toy paws and prevents sidewalk cracking.',
          tag: 'Paw Care'
        }
      ]
    }
  },

  // DOUBLE COATS & HEAVY SHEDDERS
  {
    name: 'Golden Retriever',
    species: 'Dog',
    group: 'Double Coats & Shedders',
    info: {
      coatType: 'Water-Repellent Double Coat with Furnishings',
      defaultSize: 'Large (50 - 80 lbs)',
      groomerTip: 'Never shave a Golden! Our hydro-de-shedding process clears undercoat safely.',
      suggestedAddons: [
        {
          id: 'deshed-undercoat',
          name: 'Hydro De-Shedding & Undercoat Release',
          price: 35,
          description: 'Reduces indoor hair shedding by up to 85% without harming guard hairs.',
          tag: 'Essential for Goldens'
        },
        {
          id: 'paw-butter',
          name: 'Paw Pad Clearance & Shea Balm',
          price: 15,
          description: 'Clears slippery toe tufts and conditions paw pads.',
          tag: 'Traction & Comfort'
        }
      ]
    }
  },
  {
    name: 'Siberian Husky / Malamute',
    species: 'Dog',
    group: 'Double Coats & Shedders',
    info: {
      coatType: 'Arctic Dense Insulating Double Coat',
      defaultSize: 'Large (50 - 80 lbs)',
      groomerTip: 'Thermal balance depends on high-velocity warm air expulsion of blown undercoat.',
      suggestedAddons: [
        {
          id: 'deshed-undercoat',
          name: 'Arctic Hydro De-Shedding Blowout',
          price: 40,
          description: 'Multi-stage air rake expulsion of seasonal blown coat.',
          tag: 'Heavy Coat Blow'
        },
        {
          id: 'teeth-enzymatic',
          name: 'Fresh Breath Enzymatic Teeth Brushing',
          price: 18,
          description: 'Natural poultry enzyme brush to keep breath fresh.',
          tag: 'Oral Hygiene'
        }
      ]
    }
  },
  {
    name: 'German Shepherd',
    species: 'Dog',
    group: 'Double Coats & Shedders',
    info: {
      coatType: 'Medium/Long Plush Double Coat',
      defaultSize: 'Large (50 - 80 lbs)',
      groomerTip: 'Prone to dry, itchy skin during seasonal changes. Oatmeal soak provides relief.',
      suggestedAddons: [
        {
          id: 'oatmeal-relief',
          name: 'Colloidal Oatmeal Anti-Itch Bath Infusion',
          price: 20,
          description: 'Calms reactive, itchy skin and replenishes the epidermal barrier.',
          tag: 'Skin Soothing'
        },
        {
          id: 'deshed-undercoat',
          name: 'Hydro De-Shedding Undercoat Sweep',
          price: 35,
          description: 'Deep undercoat purge to promote cool skin ventilation.',
          tag: 'De-Shedding'
        }
      ]
    }
  },
  {
    name: 'Pembroke Welsh Corgi',
    species: 'Dog',
    group: 'Double Coats & Shedders',
    info: {
      coatType: 'Short Dense Weather-Resistant Double Coat',
      defaultSize: 'Small (10 - 25 lbs)',
      groomerTip: 'Low ground clearance means tummy and paws collect city dust and grime.',
      suggestedAddons: [
        {
          id: 'deshed-undercoat',
          name: 'Corgi Pants De-Shed & Silhouette Neatening',
          price: 25,
          description: 'Removes thick undercoat tufts from rear haunches and flanks.',
          tag: 'Breed Specialty'
        },
        {
          id: 'paw-butter',
          name: 'Organic Shea Butter Paw Pad Massage',
          price: 15,
          description: 'Protects short-legged paws against urban salt and pavement friction.',
          tag: 'Paw Balm'
        }
      ]
    }
  },

  // SHORT & SMOOTH COATS
  {
    name: 'French Bulldog / Boston Terrier',
    species: 'Dog',
    group: 'Short & Smooth Coats',
    info: {
      coatType: 'Fine Smooth Single Coat',
      defaultSize: 'Small (10 - 25 lbs)',
      groomerTip: 'Facial skin wrinkles and tail pockets require antiseptic hygiene cleansing.',
      suggestedAddons: [
        {
          id: 'wrinkle-cleanse',
          name: 'Wrinkle Fold Sanitization & Barrier Balm',
          price: 18,
          description: 'Cleanses moisture folds around nose, jowls, and tail pocket.',
          tag: 'Essential for Frenchies'
        },
        {
          id: 'paw-butter',
          name: 'Nose & Paw Pad Shea Butter Deep Butter Spa',
          price: 15,
          description: 'Heals dry, hyperkeratotic crusty noses and rough pads.',
          tag: 'Nose & Paw Butter'
        }
      ]
    }
  },
  {
    name: 'English Bulldog / Pug',
    species: 'Dog',
    group: 'Short & Smooth Coats',
    info: {
      coatType: 'Short Smooth Glossy Coat',
      defaultSize: 'Medium (25 - 50 lbs)',
      groomerTip: 'Skin folds and heavy paws need regular antibacterial care.',
      suggestedAddons: [
        {
          id: 'wrinkle-cleanse',
          name: 'Deep Wrinkle Fold & Skin Creep Therapy',
          price: 18,
          description: 'Antiseptic botanical cleanse to eliminate redness and yeast.',
          tag: 'Fold Therapy'
        },
        {
          id: 'teeth-enzymatic',
          name: 'Fresh Breath Enzymatic Teeth Brushing',
          price: 18,
          description: 'Cleans crowded brachycephalic teeth and freshen breath.',
          tag: 'Oral Hygiene'
        }
      ]
    }
  },

  // WIRE & TERRIER BREEDS
  {
    name: 'Miniature Schnauzer',
    species: 'Dog',
    group: 'Wire & Terriers',
    info: {
      coatType: 'Wire Jacket with Soft Leg Furnishings',
      defaultSize: 'Small (10 - 25 lbs)',
      groomerTip: 'Beards and leg furnishings need conditioning to prevent food staining and matting.',
      suggestedAddons: [
        {
          id: 'beard-conditioning',
          name: 'Antioxidant Beard Detangling & Brightening Mask',
          price: 18,
          description: 'Purifies beard from water staining and preserves lush furnishings.',
          tag: 'Schnauzer Beard'
        },
        {
          id: 'teeth-enzymatic',
          name: 'Fresh Breath Enzymatic Teeth Brushing',
          price: 18,
          description: 'Keeps teeth sparkling white and protects gumlines.',
          tag: 'Dental'
        }
      ]
    }
  },
  {
    name: 'Shih Tzu / Yorkshire Terrier',
    species: 'Dog',
    group: 'Toy & Drop Coats',
    info: {
      coatType: 'Fine Silk Human-Like Hair',
      defaultSize: 'Toy (< 10 lbs)',
      groomerTip: 'Fine silk hair tangles rapidly on chest and legs. Gentle warm wrap preserves luster.',
      suggestedAddons: [
        {
          id: 'blueberry-facial',
          name: 'Blueberry Tear-Stain & Face Brightener',
          price: 18,
          description: 'Clears tear discharge and leaves a sweet, fresh scent.',
          tag: 'Facial Brightening'
        },
        {
          id: 'argan-mask',
          name: 'Liquid Silk Leave-In Gloss Mask',
          price: 20,
          description: 'Prevents static and provides a mirror-like silky drape.',
          tag: 'Silk Coat'
        }
      ]
    }
  },

  // CAT BREEDS (FELINE QUIET SUITE)
  {
    name: 'Persian Longhair',
    species: 'Cat',
    group: 'Feline Quiet Suite',
    info: {
      coatType: 'Ultra-Dense Longhair Cotton Coat',
      defaultSize: 'Cat (All Sizes)',
      groomerTip: 'Brachycephalic flat face and cottony undercoat need calm, unhurried hand combing.',
      suggestedAddons: [
        {
          id: 'cat-sanitary-trim',
          name: 'Sanitary & Belly Shave Hygiene Contour',
          price: 25,
          description: 'Keeps litter box area clean and prevents stubborn groin mats.',
          tag: 'Feline Hygiene'
        },
        {
          id: 'cat-facial',
          name: 'Gentle Saline Eye Fold & Whisker Cleansing',
          price: 15,
          description: 'Gentle, sterile clearing of facial tears in our quiet suite.',
          tag: 'Calm Eye Care'
        }
      ]
    }
  },
  {
    name: 'Ragdoll / British Longhair',
    species: 'Cat',
    group: 'Feline Quiet Suite',
    info: {
      coatType: 'Plush Semi-Longhair Rabbit-Soft Fur',
      defaultSize: 'Cat (All Sizes)',
      groomerTip: 'Undercoat matting is frequent behind ears and under armpits.',
      suggestedAddons: [
        {
          id: 'cat-deshed',
          name: 'Feline Undercoat Rake & Chamomile Foam Bath',
          price: 30,
          description: 'Reduces hairballs by 80% with waterless botanical foaming.',
          tag: 'Hairball Prevention'
        },
        {
          id: 'cat-nail-caps',
          name: 'Soft Paws Nail Caps or Trim',
          price: 20,
          description: 'Prevents furniture scratching while protecting delicate feline digits.',
          tag: 'Claw Care'
        }
      ]
    }
  },
  {
    name: 'Domestic Shorthair / Longhair (Mixed Cat)',
    species: 'Cat',
    group: 'Feline Quiet Suite',
    info: {
      coatType: 'Single or Plush Double Feline Coat',
      defaultSize: 'Cat (All Sizes)',
      groomerTip: 'Handled in our private, soundproof cat suite with Feliway pheromone diffusers.',
      suggestedAddons: [
        {
          id: 'cat-deshed',
          name: 'Feline Undercoat De-Shedding Sweep',
          price: 25,
          description: 'Gentle comb-out to remove loose seasonal hair.',
          tag: 'Coat Health'
        },
        {
          id: 'cat-ear-care',
          name: 'Gentle Feline Ear & Whisker Refresh',
          price: 15,
          description: 'Calm outer ear wipe using natural witch hazel.',
          tag: 'Hygiene'
        }
      ]
    }
  }
];
