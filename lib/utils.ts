import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const formatPriceRange = (min?: number | null, max?: number | null) => {
  if (!min && !max) return 'Call for pricing';
  if (min && max) return `$${min}–$${max}`;
  if (min) return `From $${min}`;
  return `Up to $${max}`;
};
