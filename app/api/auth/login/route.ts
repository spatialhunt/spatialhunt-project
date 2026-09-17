import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const jwtOptions: SignOptions = { expiresIn: '7d' };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid request. Please check your email and password.' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase().trim() },
    });

    // Same message for missing user and wrong password — prevents email enumeration
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

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
      { status: 200 },
    );
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json(
      { message: 'Something went wrong on our end. Please try again.' },
      { status: 500 },
    );
  }
}
