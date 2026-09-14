import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectMongo } from '@/lib/mongo';
import { Conversation } from '@/lib/schemas/conversation';
import { Message } from '@/lib/schemas/message';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectMongo();

  const conversation = await Conversation.findById(id);
  if (!conversation) {
    return NextResponse.json({ message: 'Conversation not found' }, { status: 400 });
  }
  if (conversation.tenantId !== user.userId && conversation.landlordId !== user.userId) {
    return NextResponse.json({ message: 'You are not part of this conversation' }, { status: 403 });
  }

  const messages = await Message.find({ conversationId: id }).sort({ createdAt: 1 });
  return NextResponse.json(messages);
}