import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { z } from 'zod/v4';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters.').max(100),
  phone: z.string().optional(),
  role: z.enum(['TENANT', 'LANDLORD']),
});

const jwtOptions: SignOptions = { expiresIn: '7d' };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? 'Invalid request data.';
      return NextResponse.json({ message: firstIssue }, { status: 400 });
    }

    const { email, password, fullName, phone, role } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return NextResponse.json(
        { message: 'Email already registered. Please sign in instead.' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName: fullName.trim(),
        phone: phone?.trim() || null,
        role,
      },
    });

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      jwtOptions,
    );

    return NextResponse.json(
      {
        accessToken,
        userId: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('[POST /api/auth/register]', err);
    return NextResponse.json(
      { message: 'Unable to create your account right now. Please try again.' },
      { status: 500 },
    );
  }
}
