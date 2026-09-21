import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectMongo } from '@/lib/mongo';
import { Conversation } from '@/lib/schemas/conversation';

export async function GET(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();

    const conversations = await Conversation.find({
      $or: [{ tenantId: user.userId }, { landlordId: user.userId }],
    })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json(conversations);
  } catch (err) {
    console.error('[GET /api/messages/conversations]', err);
    return NextResponse.json(
      { message: 'Failed to fetch conversations. Please try again.' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { propertyId, landlordId } = body as {
      propertyId?: string;
      landlordId?: string;
    };

    if (!propertyId || !landlordId) {
      return NextResponse.json(
        { message: 'propertyId and landlordId are required' },
        { status: 400 },
      );
    }

    await connectMongo();

    // Return existing conversation if one already exists for this tenant+property
    const existing = await Conversation.findOne({
      tenantId: user.userId,
      propertyId,
    }).lean();

    if (existing) {
      return NextResponse.json(existing);
    }

    const conversation = await Conversation.create({
      propertyId,
      tenantId:   user.userId,
      landlordId,
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (err) {
    console.error('[POST /api/messages/conversations]', err);
    return NextResponse.json(
      { message: 'Failed to create conversation. Please try again.' },
      { status: 500 },
    );
  }
}
