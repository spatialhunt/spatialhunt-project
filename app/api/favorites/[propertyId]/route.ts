import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId: user.userId, propertyId } },
  });
  if (existing) {
    return NextResponse.json({ message: 'Property already saved' }, { status: 409 });
  }

  const favorite = await prisma.favorite.create({
    data: { userId: user.userId, propertyId },
  });
  return NextResponse.json(favorite, { status: 201 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId: user.userId, propertyId } },
  });
  if (!existing) {
    return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
  }

  await prisma.favorite.delete({
    where: { userId_propertyId: { userId: user.userId, propertyId } },
  });
  return NextResponse.json({ message: 'Removed' });
}
