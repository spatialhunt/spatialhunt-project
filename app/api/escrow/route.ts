import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { createEscrowSchema } from '@/lib/validation/escrow';
import { notify } from '@/lib/escrow-helpers';

export async function POST(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createEscrowSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  const property = await prisma.property.findUnique({ where: { id: parsed.data.propertyId } });
  if (!property) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }
  if (property.status !== 'VERIFIED') {
    return NextResponse.json(
      { message: 'Only verified properties can be rented via escrow' },
      { status: 400 },
    );
  }
  if (property.ownerId === user.userId) {
    return NextResponse.json({ message: 'You cannot rent your own property' }, { status: 400 });
  }

  const escrow = await prisma.escrowTransaction.create({
    data: {
      propertyId: property.id,
      tenantId: user.userId,
      landlordId: property.ownerId,
      amount: parsed.data.amount,
      status: 'PENDING',
    },
  });

  await notify(
    escrow.landlordId,
    'ESCROW_INITIATED',
    'A tenant wants to rent your property and has started the escrow process',
    escrow.id,
  );

  return NextResponse.json(escrow, { status: 201 });
}