import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getPropertyOwnedOrThrow } from '@/lib/ownership';
import { updatePropertySchema } from '@/lib/validation/property';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        photos: true,
        owner: { select: { fullName: true, phone: true } },
      },
    });
    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (err) {
    console.error('[GET /api/properties/:id]', err);
    return NextResponse.json({ message: 'Failed to fetch property.' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const result = await getPropertyOwnedOrThrow(id, user.userId);
    if ('error' in result) {
      return NextResponse.json({ message: result.error }, { status: result.status });
    }

    const body   = await req.json();
    const parsed = updatePropertySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
    }

    const updated = await prisma.property.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PATCH /api/properties/:id]', err);
    return NextResponse.json({ message: 'Failed to update property.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const result = await getPropertyOwnedOrThrow(id, user.userId);
    if ('error' in result) {
      return NextResponse.json({ message: result.error }, { status: result.status });
    }

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[DELETE /api/properties/:id]', err);
    return NextResponse.json({ message: 'Failed to delete property.' }, { status: 500 });
  }
}
