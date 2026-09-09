import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  price: z.number().min(0),
  type: z.enum(['SINGLE_ROOM', 'APARTMENT', 'HOUSE']),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  amenities: z.array(z.string()).optional(),
});
export const addPhotoSchema = z.object({
  url: z.string().url(),
  isWalkthroughVideo: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export const updatePropertySchema = createPropertySchema.partial();