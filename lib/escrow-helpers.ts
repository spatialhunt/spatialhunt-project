import { prisma } from './prisma';

export async function getEscrowAsTenantOrThrow(id: string, tenantId: string) {
  const escrow = await prisma.escrowTransaction.findUnique({ where: { id } });
  if (!escrow) {
    return { error: 'Escrow transaction not found', status: 404 as const };
  }
  if (escrow.tenantId !== tenantId) {
    return { error: 'Only the tenant can perform this action', status: 403 as const };
  }
  return { escrow };
}

export function assertStatus(current: string, required: string, action: string) {
  if (current !== required) {
    return `Cannot ${action} a transaction that is not in ${required} status (currently ${current})`;
  }
  return null;
}

export async function notify(userId: string, type: string, message: string, relatedId?: string) {
  await prisma.notification.create({
    data: { userId, type, message, relatedId },
  });
}