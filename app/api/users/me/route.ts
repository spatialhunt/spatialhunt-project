import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod/v4';

const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.').max(100).optional(),
  phone:    z.string().max(20).optional().nullable(),
});

export async function GET(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id:         true,
        email:      true,
        fullName:   true,
        phone:      true,
        role:       true,
        isVerified: true,
        createdAt:  true,
      },
    });

    if (!profile) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error('[GET /api/users/me]', err);
    return NextResponse.json({ message: 'Failed to fetch profile.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body   = await req.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? 'Invalid data.';
      return NextResponse.json({ message: firstIssue }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: user.userId },
      data:  parsed.data,
      select: {
        id:         true,
        email:      true,
        fullName:   true,
        phone:      true,
        role:       true,
        isVerified: true,
        createdAt:  true,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PATCH /api/users/me]', err);
    return NextResponse.json({ message: 'Failed to update profile.' }, { status: 500 });
  }
}
