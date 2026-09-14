import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectMongo } from '@/lib/mongo';
import { Conversation } from '@/lib/schemas/conversation';
import { Message } from '@/lib/schemas/message';
import { sendMessageSchema } from '@/lib/validation/message';

export async function POST(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = sendMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  await connectMongo();

  let conversation;

  if (parsed.data.conversationId) {
    conversation = await Conversation.findById(parsed.data.conversationId);
    if (!conversation) {
      return NextResponse.json({ message: 'Conversation not found' }, { status: 400 });
    }
    if (conversation.tenantId !== user.userId && conversation.landlordId !== user.userId) {
      return NextResponse.json({ message: 'You are not part of this conversation' }, { status: 403 });
    }
  } else {
    if (!parsed.data.propertyId || !parsed.data.recipientId) {
      return NextResponse.json(
        { message: 'propertyId and recipientId are required to start a conversation' },
        { status: 400 },
      );
    }
    conversation = await Conversation.findOneAndUpdate(
      { propertyId: parsed.data.propertyId, tenantId: user.userId, landlordId: parsed.data.recipientId },
      { $setOnInsert: { propertyId: parsed.data.propertyId, tenantId: user.userId, landlordId: parsed.data.recipientId } },
      { upsert: true, new: true },
    );
  }

  const newMessage = await Message.create({
    conversationId: conversation._id,
    senderId: user.userId,
    content: parsed.data.content,
  });

  return NextResponse.json(newMessage, { status: 201 });
}