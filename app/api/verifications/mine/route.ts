import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const verifications = await prisma.verification.findMany({
    where: { userId: user.userId },
    include: { property: true },
  });
  return NextResponse.json(verifications);
}