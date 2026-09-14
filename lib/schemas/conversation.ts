// lib/schemas/conversation.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ConversationDoc extends Document {
  propertyId: string;
  tenantId: string;
  landlordId: string;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<ConversationDoc>(
  {
    propertyId: { type: String, required: true },
    tenantId: { type: String, required: true },
    landlordId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Conversation =
  mongoose.models.Conversation || mongoose.model<ConversationDoc>('Conversation', conversationSchema);