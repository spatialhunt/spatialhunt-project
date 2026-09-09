import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { updateBookingStatusSchema } from '@/lib/validation/booking';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { property: true },
  });
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }
  if (booking.property.ownerId !== user.userId) {
    return NextResponse.json({ message: 'Only the property owner can update this booking' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = updateBookingStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: parsed.data.status },
  });
  return NextResponse.json(updated);
}