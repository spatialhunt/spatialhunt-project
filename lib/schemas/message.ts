// lib/schemas/message.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface MessageDoc extends Document {
  conversationId: Types.ObjectId;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

const messageSchema = new Schema<MessageDoc>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Message = mongoose.models.Message || mongoose.model<MessageDoc>('Message', messageSchema);