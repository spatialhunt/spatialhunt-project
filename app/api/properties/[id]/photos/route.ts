import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { getPropertyOwnedOrThrow } from '@/lib/ownership';
import { addPhotoSchema } from '@/lib/validation/property';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = await getPropertyOwnedOrThrow(id, user.userId);
  if ('error' in result) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  const body = await req.json();
  const parsed = addPhotoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues }, { status: 400 });
  }

  const photo = await prisma.propertyPhoto.create({
    data: {
      propertyId: id,
      url: parsed.data.url,
      isWalkthroughVideo: parsed.data.isWalkthroughVideo ?? false,
      order: parsed.data.order ?? 0,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}