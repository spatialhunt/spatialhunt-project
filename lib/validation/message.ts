import { z } from 'zod';

export const sendMessageSchema = z.object({
  conversationId: z.string().optional(),
  propertyId: z.string().optional(),
  recipientId: z.string().optional(),
  content: z.string().min(1),
});