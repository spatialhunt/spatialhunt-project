import { z } from 'zod';

export const createBookingSchema = z.object({
  propertyId: z.string(),
  scheduledAt: z.string().datetime(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['CONFIRMED', 'DECLINED', 'RESCHEDULED', 'COMPLETED']),
});