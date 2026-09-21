import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.userId },
      include: { property: { include: { photos: true } } },
    });
    return NextResponse.json(favorites);
  } catch (err) {
    console.error('[GET /api/favorites]', err);
    return NextResponse.json({ message: 'Failed to fetch favorites.' }, { status: 500 });
  }
}
