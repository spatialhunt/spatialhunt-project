import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getEscrowAsTenantOrThrow, assertStatus } from '@/lib/escrow-helpers';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = await getEscrowAsTenantOrThrow(id, user.userId);
  if ('error' in result) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  const error = assertStatus(result.escrow.status, 'FUNDED', 'confirm inspection for');
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const updated = await prisma.escrowTransaction.update({
    where: { id },
    data: { status: 'INSPECTION_CONFIRMED', inspectionConfirmedAt: new Date() },
  });

  return NextResponse.json(updated);
}