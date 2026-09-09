import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'LANDLORD') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const properties = await prisma.property.findMany({
    where: { ownerId: user.userId },
    include: { photos: true },
  });
  return NextResponse.json(properties);
}