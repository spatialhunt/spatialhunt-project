import { prisma } from './prisma';

export async function getPropertyOwnedOrThrow(id: string, userId: string) {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) {
    return { error: 'Property not found', status: 404 as const };
  }
  if (property.ownerId !== userId) {
    return { error: 'You do not own this property', status: 403 as const };
  }
  return { property };
}