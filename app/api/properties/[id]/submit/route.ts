import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getPropertyOwnedOrThrow } from '@/lib/ownership';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = await getPropertyOwnedOrThrow(id, user.userId);
  if ('error' in result) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  if (result.property.status !== 'DRAFT') {
    return NextResponse.json(
      { message: 'Only draft properties can be submitted for verification' },
      { status: 400 },
    );
  }

  const updated = await prisma.property.update({
    where: { id },
    data: { status: 'PENDING_VERIFICATION' },
  });

  return NextResponse.json(updated);
}