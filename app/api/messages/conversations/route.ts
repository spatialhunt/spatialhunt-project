import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectMongo } from '@/lib/mongo';
import { Conversation } from '@/lib/schemas/conversation';

export async function GET(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectMongo();

  const conversations = await Conversation.find({
    $or: [{ tenantId: user.userId }, { landlordId: user.userId }],
  }).sort({ updatedAt: -1 });

  return NextResponse.json(conversations);
}