import jwt from 'jsonwebtoken';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export function getAuthUser(req: Request): AuthUser | null {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  try {
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as JwtPayload;
    return { userId: decoded.sub, email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}