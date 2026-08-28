import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async add(userId: string, propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const existing = await this.prisma.favorite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (existing) {
      throw new ConflictException('Property already saved');
    }

    return this.prisma.favorite.create({
      data: { userId, propertyId },
    });
  }

  async remove(userId: string, propertyId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (!existing) {
      throw new NotFoundException('Favorite not found');
    }
    return this.prisma.favorite.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });
  }

  findMine(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { property: { include: { photos: true } } },
    });
  }
}
