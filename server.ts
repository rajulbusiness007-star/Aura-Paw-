import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory / file backed storage for bookings and inquiries
const DATA_DIR = path.resolve(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initial seed bookings if empty
interface Booking {
  id: string;
  confirmationCode: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  petName: string;
  petType: string;
  breed: string;
  petSize: string;
  petAge: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions?: string;
  groomerPreference?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  estimatedCost: string;
  selectedAddons?: { id: string; name: string; price: number }[];
}

interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  petDetails?: string;
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Aura & Paw Grooming Backend', time: new Date().toISOString() });
});

// Bookings API
app.get('/api/bookings', (_req: Request, res: Response) => {
  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  res.json({ success: true, count: bookings.length, bookings });
});

app.get('/api/bookings/:identifier', (req: Request, res: Response) => {
  const { identifier } = req.params;
  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  const found = bookings.find(
    (b) =>
      b.confirmationCode.toLowerCase() === identifier.toLowerCase() ||
      b.phone.replace(/\D/g, '') === identifier.replace(/\D/g, '') ||
      b.email.toLowerCase() === identifier.toLowerCase()
  );

  if (!found) {
    res.status(404).json({ success: false, message: 'No appointment found with that confirmation code or phone number.' });
    return;
  }
  res.json({ success: true, booking: found });
});

app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    customerName,
    phone,
    email,
    petName,
    petType,
    breed,
    petSize,
    petAge,
    service,
    preferredDate,
    preferredTime,
    specialInstructions,
    groomerPreference,
    estimatedCost
  } = req.body;

  // Validation
  if (!customerName || !phone || !email || !petName || !service || !preferredDate || !preferredTime) {
    res.status(400).json({
      success: false,
      message: 'Missing required booking fields. Please complete all highlighted fields.'
    });
    return;
  }

  // Basic email & phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    return;
  }

  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 7) {
    res.status(400).json({ success: false, message: 'Please provide a valid contact telephone number.' });
    return;
  }

  const bookings = readJsonFile<Booking[]>(BOOKINGS_FILE, []);
  const confirmationCode = `AP-${Math.floor(10000 + Math.random() * 90000)}`;

  const newBooking: Booking = {
    id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    confirmationCode,
    createdAt: new Date().toISOString(),
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    petName: petName.trim(),
    petType: petType || 'Dog',
    breed: breed?.trim() || 'Breed not specified',
    petSize: petSize || 'Medium (20-50 lbs)',
    petAge: petAge || 'Adult',
    service: service.trim(),
    preferredDate,
    preferredTime,
    specialInstructions: specialInstructions?.trim() || '',
    groomerPreference: groomerPreference || 'Any Available Master Stylist',
    status: 'confirmed',
    estimatedCost: estimatedCost || '$85 - $110',
    selectedAddons: req.body.selectedAddons || []
  };

  bookings.unshift(newBooking);
  writeJsonFile(BOOKINGS_FILE, bookings);

  res.status(201).json({
    success: true,
    message: 'Grooming appointment successfully reserved! We have logged your booking.',
    booking: newBooking
  });
});

// Inquiries API
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, phone, email, message, petDetails } = req.body;

  if (!name || (!phone && !email) || !message) {
    res.status(400).json({
      success: false,
      message: 'Please provide your name, contact information, and your message.'
    });
    return;
  }

  const inquiries = readJsonFile<Inquiry[]>(INQUIRIES_FILE, []);
  const newInquiry: Inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    name: name.trim(),
    phone: phone?.trim() || '',
    email: email?.trim() || '',
    message: message.trim(),
    petDetails: petDetails?.trim() || ''
  };

  inquiries.unshift(newInquiry);
  writeJsonFile(INQUIRIES_FILE, inquiries);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received. Our salon manager will get back to you within 2 hours.'
  });
});

interface Subscriber {
  id: string;
  createdAt: string;
  email: string;
  petType?: string;
  petName?: string;
}

// Newsletter API
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email, petType, petName } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Please enter your email address.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    return;
  }

  const subscribers = readJsonFile<Subscriber[]>(SUBSCRIBERS_FILE, []);
  const existing = subscribers.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());

  if (existing) {
    res.json({
      success: true,
      message: 'You are already a member of Paw-Care Insider! Keep an eye on your inbox for our seasonal care guides.'
    });
    return;
  }

  const newSub: Subscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    email: email.trim().toLowerCase(),
    petType: petType || 'Both Dogs & Cats',
    petName: petName ? petName.trim() : undefined
  };

  subscribers.unshift(newSub);
  writeJsonFile(SUBSCRIBERS_FILE, subscribers);

  res.status(201).json({
    success: true,
    message: 'Welcome to Paw-Care Insider! You have been successfully enrolled in seasonal care reminders and priority booking notes.'
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Mount Vite dev server middleware
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura & Paw Grooming Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
