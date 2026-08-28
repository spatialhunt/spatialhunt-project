import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { ReviewVerificationDto } from './dto/review-verification.dto';

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async submit(userId: string, dto: CreateVerificationDto) {
    if (dto.type === 'PROPERTY_WALKTHROUGH' && !dto.propertyId) {
      throw new BadRequestException(
        'propertyId is required for property walkthrough verification',
      );
    }

    if (dto.propertyId) {
      const property = await this.prisma.property.findUnique({
        where: { id: dto.propertyId },
      });
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      if (property.ownerId !== userId) {
        throw new ForbiddenException('You do not own this property');
      }
    }

    return this.prisma.verification.create({
      data: {
        userId,
        type: dto.type,
        documentUrl: dto.documentUrl,
        propertyId: dto.propertyId,
      },
    });
  }

  findPending() {
    return this.prisma.verification.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { fullName: true, email: true } },
        property: true,
      },
    });
  }

  findMine(userId: string) {
    return this.prisma.verification.findMany({
      where: { userId },
      include: { property: true },
    });
  }

  async review(id: string, reviewerId: string, dto: ReviewVerificationDto) {
    const verification = await this.prisma.verification.findUnique({
      where: { id },
    });
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }

    const updated = await this.prisma.verification.update({
      where: { id },
      data: {
        status: dto.status,
        reviewNotes: dto.reviewNotes,
        reviewedById: reviewerId,
        reviewedAt: new Date(),
      },
    });

    // Cascade effects: approving landlord ID or property walkthrough
    // should update the related record's own verification state.
    if (dto.status === 'APPROVED') {
      if (verification.type === 'LANDLORD_ID') {
        await this.prisma.user.update({
          where: { id: verification.userId },
          data: { isVerified: true },
        });
      }
      if (
        verification.type === 'PROPERTY_WALKTHROUGH' &&
        verification.propertyId
      ) {
        await this.prisma.property.update({
          where: { id: verification.propertyId },
          data: { status: 'VERIFIED' },
        });
      }
    }

    if (
      dto.status === 'REJECTED' &&
      verification.type === 'PROPERTY_WALKTHROUGH' &&
      verification.propertyId
    ) {
      await this.prisma.property.update({
        where: { id: verification.propertyId },
        data: { status: 'REJECTED' },
      });
    }

    return updated;
  }
}
