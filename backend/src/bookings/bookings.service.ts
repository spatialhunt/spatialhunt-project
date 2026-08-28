import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateBookingDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    if (property.status !== 'VERIFIED') {
      throw new BadRequestException(
        'Only verified properties can be booked for inspection',
      );
    }

    return this.prisma.booking.create({
      data: {
        propertyId: dto.propertyId,
        tenantId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
  }

  findMine(tenantId: string) {
    return this.prisma.booking.findMany({
      where: { tenantId },
      include: { property: { include: { photos: true } } },
    });
  }

  findForLandlord(landlordId: string) {
    return this.prisma.booking.findMany({
      where: { property: { ownerId: landlordId } },
      include: {
        property: true,
        tenant: { select: { fullName: true, phone: true } },
      },
    });
  }

  async updateStatus(id: string, userId: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { property: true },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.property.ownerId !== userId) {
      throw new ForbiddenException(
        'Only the property owner can update this booking',
      );
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
