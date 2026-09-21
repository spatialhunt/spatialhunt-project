import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { createBookingSchema } from '@/lib/validation/booking';

export async function POST(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body   = await req.json();
    const parsed = createBookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id: parsed.data.propertyId },
    });
    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }
    if (property.status !== 'VERIFIED') {
      return NextResponse.json(
        { message: 'Only verified properties can be booked for inspection' },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId: parsed.data.propertyId,
        tenantId:   user.userId,
        scheduledAt: new Date(parsed.data.scheduledAt),
      },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error('[POST /api/bookings]', err);
    return NextResponse.json(
      { message: 'Failed to create booking. Please try again.' },
      { status: 500 },
    );
  }
}
