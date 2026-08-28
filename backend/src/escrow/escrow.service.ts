import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateEscrowDto } from './dto/create-escrow.dto';

@Injectable()
export class EscrowService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async initiate(tenantId: string, dto: CreateEscrowDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    if (property.status !== 'VERIFIED') {
      throw new BadRequestException(
        'Only verified properties can be rented via escrow',
      );
    }
    if (property.ownerId === tenantId) {
      throw new BadRequestException('You cannot rent your own property');
    }

    const escrow = await this.prisma.escrowTransaction.create({
      data: {
        propertyId: property.id,
        tenantId,
        landlordId: property.ownerId,
        amount: dto.amount,
        status: 'PENDING',
      },
    });

    await this.notifications.create(
      escrow.landlordId,
      'ESCROW_INITIATED',
      'A tenant wants to rent your property and has started the escrow process',
      escrow.id,
    );

    return escrow;
  }

  async fund(id: string, tenantId: string) {
    const escrow = await this.getAsTenantOrThrow(id, tenantId);
    this.assertStatus(escrow.status, 'PENDING', 'fund');

    const updated = await this.prisma.escrowTransaction.update({
      where: { id },
      data: { status: 'FUNDED', fundedAt: new Date() },
    });

    await this.notifications.create(
      escrow.landlordId,
      'ESCROW_FUNDED',
      'A tenant has funded escrow for your property',
      escrow.id,
    );

    return updated;
  }

  async confirmInspection(id: string, tenantId: string) {
    const escrow = await this.getAsTenantOrThrow(id, tenantId);
    this.assertStatus(escrow.status, 'FUNDED', 'confirm inspection for');

    return this.prisma.escrowTransaction.update({
      where: { id },
      data: {
        status: 'INSPECTION_CONFIRMED',
        inspectionConfirmedAt: new Date(),
      },
    });
  }

  async confirmKeysReceived(id: string, tenantId: string) {
    const escrow = await this.getAsTenantOrThrow(id, tenantId);
    this.assertStatus(
      escrow.status,
      'INSPECTION_CONFIRMED',
      'confirm keys received for',
    );

    return this.prisma.escrowTransaction.update({
      where: { id },
      data: { status: 'KEYS_RECEIVED', keysReceivedAt: new Date() },
    });
  }

  async confirmAgreementSigned(id: string, tenantId: string) {
    const escrow = await this.getAsTenantOrThrow(id, tenantId);
    this.assertStatus(
      escrow.status,
      'KEYS_RECEIVED',
      'confirm agreement signed for',
    );

    return this.prisma.escrowTransaction.update({
      where: { id },
      data: { status: 'AGREEMENT_SIGNED', agreementSignedAt: new Date() },
    });
  }

  async release(id: string, tenantId: string) {
    const escrow = await this.getAsTenantOrThrow(id, tenantId);
    this.assertStatus(escrow.status, 'AGREEMENT_SIGNED', 'release');

    const updated = await this.prisma.escrowTransaction.update({
      where: { id },
      data: { status: 'RELEASED', releasedAt: new Date() },
    });

    await this.notifications.create(
      escrow.landlordId,
      'ESCROW_RELEASED',
      'Escrow funds have been released to you',
      escrow.id,
    );

    return updated;
  }

  async findMine(userId: string) {
    return this.prisma.escrowTransaction.findMany({
      where: { OR: [{ tenantId: userId }, { landlordId: userId }] },
      include: { property: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async getAsTenantOrThrow(id: string, tenantId: string) {
    const escrow = await this.prisma.escrowTransaction.findUnique({
      where: { id },
    });
    if (!escrow) {
      throw new NotFoundException('Escrow transaction not found');
    }
    if (escrow.tenantId !== tenantId) {
      throw new ForbiddenException('Only the tenant can perform this action');
    }
    return escrow;
  }

  private assertStatus(current: string, required: string, action: string) {
    if (current !== required) {
      throw new BadRequestException(
        `Cannot ${action} a transaction that is not in ${required} status (currently ${current})`,
      );
    }
  }
}
