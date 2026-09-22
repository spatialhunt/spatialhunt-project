import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { z } from 'zod/v4';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();

    // Always return 200 — never reveal whether email exists (prevents enumeration)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists for that email, a reset link has been sent.' },
        { status: 200 },
      );
    }

    // Generate a secure reset token valid for 1 hour
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(
      Date.now() + Number(process.env.RESET_TOKEN_EXPIRES_MS ?? 3_600_000),
    );

    // Store token on the user record
    // NOTE: Requires passwordResetToken + passwordResetExpires fields on User model.
    // Until the migration is run, this is a no-op — password reset will work end-to-end
    // once those fields are added via: npx prisma migrate dev
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reset fields pending migration
      await (prisma.user as any).update({
        where: { email },
        data: {
          passwordResetToken: token,
          passwordResetExpires: expiresAt,
        },
      });
    } catch {
      // Field not yet migrated — log and continue so the UI still flows
      console.warn('[forgot-password] passwordResetToken field not yet in schema. Run prisma migrate dev.');
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    // TODO: Send email via SMTP when mail service is connected
    // await sendEmail({ to: email, subject: 'Reset your SpatialHunt password', html: resetEmailTemplate(resetUrl) })
    console.info(`[forgot-password] Reset link for ${email}: ${resetUrl}`);

    return NextResponse.json(
      { message: 'If an account exists for that email, a reset link has been sent.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[POST /api/auth/forgot-password]', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
