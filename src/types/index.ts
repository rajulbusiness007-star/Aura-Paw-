export type PetType = 'Dog' | 'Cat' | 'Other';

export type PetSize = 'Toy (< 10 lbs)' | 'Small (10 - 25 lbs)' | 'Medium (25 - 50 lbs)' | 'Large (50 - 80 lbs)' | 'Giant (80+ lbs)' | 'Cat (All Sizes)';

export interface GroomingService {
  id: string;
  name: string;
  category: 'Full Grooming' | 'Haircuts' | 'Bath & Spa' | 'Specialty';
  shortDescription: string;
  suitableFor: string;
  includes: string[];
  durationMinutes: number;
  startingPrice: number;
  featured?: boolean;
}

export interface TransformationItem {
  id: string;
  petName: string;
  petBreed: string;
  category: 'Dogs' | 'Cats' | 'Haircuts' | 'Bath & Blow-Dry' | 'De-Shedding';
  beforeImage: string;
  afterImage: string;
  serviceRendered: string;
  stylistNote: string;
  sessionDuration: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  petName: string;
  petBreed: string;
  petType: 'Dog' | 'Cat' | 'Puppy';
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface GroomerProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  certifications: string[];
  specialty: string;
  imageUrl: string;
  bio: string;
}

export interface GroomingTip {
  id: string;
  title: string;
  targetPet: string;
  frequency: string;
  summary: string;
  expertSteps: string[];
  recommendedTool: string;
  cautionNotice: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking & Visits' | 'Care & Safety' | 'Pricing & Policies' | 'Grooming Tips & Coat Care';
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  petName: string;
  petType: PetType;
  breed: string;
  petSize: PetSize;
  petAge: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions: string;
  groomerPreference: string;
  privacyConsent: boolean;
  honeypot?: string;
  selectedAddons?: { id: string; name: string; price: number }[];
}

export interface ConfirmedBooking extends BookingFormData {
  id: string;
  confirmationCode: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  estimatedCost: string;
}
