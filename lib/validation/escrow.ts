import { z } from 'zod';

export const createEscrowSchema = z.object({
  propertyId: z.string(),
  amount: z.number().min(1),
});