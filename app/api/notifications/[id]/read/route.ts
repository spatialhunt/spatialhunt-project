import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== user.userId) {
    return NextResponse.json({ message: 'Notification not found' }, { status: 404 });
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  return NextResponse.json(updated);
}