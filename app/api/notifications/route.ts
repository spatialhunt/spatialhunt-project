import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json(notifications);
  } catch (err) {
    console.error('[GET /api/notifications]', err);
    return NextResponse.json({ message: 'Failed to fetch notifications.' }, { status: 500 });
  }
}
