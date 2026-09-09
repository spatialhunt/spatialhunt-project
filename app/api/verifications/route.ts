import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { createVerificationSchema } from '@/lib/validation/verification';

export async function POST(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createVerificationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  if (parsed.data.type === 'PROPERTY_WALKTHROUGH' && !parsed.data.propertyId) {
    return NextResponse.json(
      { message: 'propertyId is required for property walkthrough verification' },
      { status: 400 },
    );
  }

  if (parsed.data.propertyId) {
    const property = await prisma.property.findUnique({ where: { id: parsed.data.propertyId } });
    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }
    if (property.ownerId !== user.userId) {
      return NextResponse.json({ message: 'You do not own this property' }, { status: 403 });
    }
  }

  const verification = await prisma.verification.create({
    data: {
      userId: user.userId,
      type: parsed.data.type,
      documentUrl: parsed.data.documentUrl,
      propertyId: parsed.data.propertyId,
    },
  });

  return NextResponse.json(verification, { status: 201 });
}