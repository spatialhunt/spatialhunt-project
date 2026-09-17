import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod/v4';

const schema = z.object({
  code: z.string().min(4, 'Please enter your verification code.'),
});

export async function POST(req: Request) {
  try {
    // Require a valid JWT session to verify an account
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ message: 'You must be signed in to verify your account.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? 'Invalid code.' }, { status: 400 });
    }

    // TODO: When OTP/email verification is wired (Phase 1 Week 3):
    // 1. Look up the stored OTP for authUser.userId
    // 2. Compare code, check expiry
    // 3. Set user.isVerified = true
    // For now: mark the user as verified immediately (placeholder behaviour for development)
    await prisma.user.update({
      where: { id: authUser.userId },
      data: { isVerified: true },
    });

    return NextResponse.json({ message: 'Account verified successfully.' }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/auth/verify-account]', err);
    return NextResponse.json(
      { message: 'Verification failed. Please try again.' },
      { status: 500 },
    );
  }
}
