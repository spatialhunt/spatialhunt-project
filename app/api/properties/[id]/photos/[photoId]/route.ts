import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getPropertyOwnedOrThrow } from '@/lib/ownership';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> },
) {
  const { id, photoId } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = await getPropertyOwnedOrThrow(id, user.userId);
  if ('error' in result) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  await prisma.propertyPhoto.delete({ where: { id: photoId } });
  return NextResponse.json({ message: 'Deleted' });
}