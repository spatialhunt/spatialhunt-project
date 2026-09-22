import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { z } from 'zod/v4';

const schema = z.object({
  token: z.string().min(1, 'Reset token is required.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? 'Invalid request.';
      return NextResponse.json({ message: firstIssue }, { status: 400 });
    }

    const { token, password } = parsed.data;

    // Find user by token
    // NOTE: Requires passwordResetToken + passwordResetExpires fields on the User model.
    // Run: npx prisma migrate dev  to add these fields after updating the schema.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reset fields pending migration
    let user: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reset fields pending migration
      user = await (prisma.user as any).findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpires: { gt: new Date() },
        },
      });
    } catch {
      console.warn('[reset-password] passwordResetToken field not yet in schema.');
      return NextResponse.json(
        { message: 'Password reset is not yet available. Please try again after the next deployment.' },
        { status: 503 },
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: 'This reset link is invalid or has expired. Please request a new one.' },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reset fields pending migration
    await (prisma.user as any).update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/auth/reset-password]', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
