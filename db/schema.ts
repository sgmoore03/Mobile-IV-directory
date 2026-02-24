import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const providers = sqliteTable('providers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  phone: text('phone').notNull(),
  websiteUrl: text('website_url').notNull(),
  bookingUrl: text('booking_url').notNull(),
  providerEmail: text('provider_email'),
  logoUrl: text('logo_url'),
  priceMin: integer('price_min'),
  priceMax: integer('price_max'),
  responseTimeMins: integer('response_time_mins'),
  hotelVisits: integer('hotel_visits').notNull().default(0),
  hoursJson: text('hours_json').notNull(),
  servicesJson: text('services_json').notNull(),
  areasServedJson: text('areas_served_json').notNull(),
  featured: integer('featured').notNull().default(0),
  verified: integer('verified').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull()
});

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  providerId: text('provider_id'),
  type: text('type', { enum: ['availability', 'claim'] }).notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull()
});

export const adminSessions = sqliteTable('admin_sessions', {
  id: text('id').primaryKey(),
  sessionTokenHash: text('session_token_hash').notNull().unique(),
  createdAt: text('created_at').notNull(),
  expiresAt: text('expires_at').notNull()
});
