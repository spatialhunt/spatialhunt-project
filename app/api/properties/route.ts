import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { createPropertySchema } from '@/lib/validation/property';
import { PropertyType } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const type = searchParams.get('type');
  const bedrooms = searchParams.get('bedrooms');

  const properties = await prisma.property.findMany({
    where: {
      status: 'VERIFIED',
      ...(city && { city: { equals: city, mode: 'insensitive' as const } }),
      ...(type && { type: type as PropertyType }),
      ...(bedrooms && { bedrooms: Number(bedrooms) }),
      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { gte: Number(minPrice) }),
              ...(maxPrice && { lte: Number(maxPrice) }),
            },
          }
        : {}),
    },
    include: { photos: true },
  });

  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'LANDLORD') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createPropertySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  const property = await prisma.property.create({
    data: { ...parsed.data, ownerId: user.userId },
  });

  return NextResponse.json(property, { status: 201 });
}