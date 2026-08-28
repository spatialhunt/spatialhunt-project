/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AddPhotoDto } from './dto/add-photo.dto';

interface PropertyQuery {
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  bedrooms?: string;
}

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  create(ownerId: string, dto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: {
        ...dto,
        ownerId,
      },
    });
  }

  findAll(query: PropertyQuery = {}) {
    return this.prisma.property.findMany({
      where: {
        status: 'VERIFIED',
        ...(query.city && {
          city: { equals: query.city, mode: 'insensitive' },
        }),
        ...(query.type && { type: query.type as any }),
        ...(query.bedrooms && { bedrooms: Number(query.bedrooms) }),
        ...(query.minPrice || query.maxPrice
          ? {
              price: {
                ...(query.minPrice && { gte: Number(query.minPrice) }),
                ...(query.maxPrice && { lte: Number(query.maxPrice) }),
              },
            }
          : {}),
      },
      include: { photos: true },
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        photos: true,
        owner: { select: { fullName: true, phone: true } },
      },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  findMine(ownerId: string) {
    return this.prisma.property.findMany({
      where: { ownerId },
      include: { photos: true },
    });
  }

  async update(id: string, userId: string, dto: UpdatePropertyDto) {
    const property = await this.getOwnedOrThrow(id, userId);
    return this.prisma.property.update({
      where: { id: property.id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.getOwnedOrThrow(id, userId);
    return this.prisma.property.delete({ where: { id } });
  }

  private async getOwnedOrThrow(id: string, userId: string) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    if (property.ownerId !== userId) {
      throw new ForbiddenException('You do not own this property');
    }
    return property;
  }

  async addPhoto(propertyId: string, userId: string, dto: AddPhotoDto) {
    await this.getOwnedOrThrow(propertyId, userId);
    return this.prisma.propertyPhoto.create({
      data: {
        propertyId,
        url: dto.url,
        isWalkthroughVideo: dto.isWalkthroughVideo ?? false,
        order: dto.order ?? 0,
      },
    });
  }

  async removePhoto(propertyId: string, photoId: string, userId: string) {
    await this.getOwnedOrThrow(propertyId, userId);
    return this.prisma.propertyPhoto.delete({ where: { id: photoId } });
  }

  async submitForVerification(id: string, userId: string) {
    const property = await this.getOwnedOrThrow(id, userId);
    if (property.status !== 'DRAFT') {
      throw new ForbiddenException(
        'Only draft properties can be submitted for verification',
      );
    }
    return this.prisma.property.update({
      where: { id },
      data: { status: 'PENDING_VERIFICATION' },
    });
  }
}
