import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { createVerificationSchema } from '@/lib/validation/verification';

export async function POST(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: 'Request body must be valid JSON' }, { status: 400 });
    }

    const parsed = createVerificationSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues
        .map((i) => `${i.path.join('.') || 'body'}: ${i.message}`)
        .join('; ');
      return NextResponse.json({ message }, { status: 400 });
    }

    if (parsed.data.type === 'PROPERTY_WALKTHROUGH' && !parsed.data.propertyId) {
      return NextResponse.json(
        { message: 'propertyId is required for property walkthrough verification' },
        { status: 400 },
      );
    }

    if (parsed.data.propertyId) {
      const property = await prisma.property.findUnique({
        where: { id: parsed.data.propertyId },
      });
      if (!property) {
        return NextResponse.json({ message: 'Property not found' }, { status: 404 });
      }
      if (property.ownerId !== user.userId) {
        return NextResponse.json({ message: 'You do not own this property' }, { status: 403 });
      }
    }

    // Don't stack duplicate pending submissions of the same kind
    const existing = await prisma.verification.findFirst({
      where: {
        userId: user.userId,
        type: parsed.data.type,
        status: 'PENDING',
        propertyId: parsed.data.propertyId ?? null,
      },
    });
    if (existing) {
      return NextResponse.json(
        { message: 'A verification of this type is already pending review' },
        { status: 409 },
      );
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
  } catch (err) {
    console.error('[POST /api/verifications]', err);
    return NextResponse.json(
      { message: 'Failed to submit verification. Please try again.' },
      { status: 500 },
    );
  }
}