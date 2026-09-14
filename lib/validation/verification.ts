import { z } from 'zod';

export const createVerificationSchema = z.object({
  type: z.enum(['LANDLORD_ID', 'PROPERTY_WALKTHROUGH']),
  documentUrl: z.string().url(),
  propertyId: z.string().optional(),
});

export const reviewVerificationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reviewNotes: z.string().optional(),
});