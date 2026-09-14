import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const transactions = await prisma.escrowTransaction.findMany({
    where: { OR: [{ tenantId: user.userId }, { landlordId: user.userId }] },
    include: { property: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(transactions);
}