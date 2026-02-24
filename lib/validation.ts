import { z } from 'zod';
import { slugify } from './utils';

export const providerSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().min(10),
  phone: z.string().min(7),
  websiteUrl: z.string().url(),
  bookingUrl: z.string().url().optional().or(z.literal('')),
  providerEmail: z.string().email().optional().or(z.literal('')),
  logoUrl: z.string().url().optional().or(z.literal('')),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  responseTimeMins: z.coerce.number().optional(),
  hotelVisits: z.coerce.number().min(0).max(1),
  hoursJson: z.string(),
  servicesJson: z.string(),
  areasServedJson: z.string(),
  featured: z.coerce.number().min(0).max(1),
  verified: z.coerce.number().min(0).max(1)
});

export const normalizeProviderPayload = (payload: z.infer<typeof providerSchema>) => ({
  ...payload,
  slug: slugify(payload.slug || payload.name),
  bookingUrl: payload.bookingUrl || '',
  providerEmail: payload.providerEmail || null,
  logoUrl: payload.logoUrl || null
});

export const leadSchema = z.object({
  providerId: z.string().optional().nullable(),
  type: z.enum(['availability', 'claim']),
  name: z.string().min(2),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5)
});
