import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { reviewVerificationSchema } from '@/lib/validation/verification';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const verification = await prisma.verification.findUnique({ where: { id } });
  if (!verification) {
    return NextResponse.json({ message: 'Verification not found' }, { status: 404 });
  }

  const body = await req.json();
  const parsed = reviewVerificationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  const updated = await prisma.verification.update({
    where: { id },
    data: {
      status: parsed.data.status,
      reviewNotes: parsed.data.reviewNotes,
      reviewedById: user.userId,
      reviewedAt: new Date(),
    },
  });

  if (parsed.data.status === 'APPROVED') {
    if (verification.type === 'LANDLORD_ID') {
      await prisma.user.update({
        where: { id: verification.userId },
        data: { isVerified: true },
      });
    }
    if (verification.type === 'PROPERTY_WALKTHROUGH' && verification.propertyId) {
      await prisma.property.update({
        where: { id: verification.propertyId },
        data: { status: 'VERIFIED' },
      });
    }
  }

  if (parsed.data.status === 'REJECTED' && verification.type === 'PROPERTY_WALKTHROUGH' && verification.propertyId) {
    await prisma.property.update({
      where: { id: verification.propertyId },
      data: { status: 'REJECTED' },
    });
  }

  return NextResponse.json(updated);
}