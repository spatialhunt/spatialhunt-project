import { IsEnum, IsUrl, IsOptional, IsString } from 'class-validator';
import { VerificationType } from '@prisma/client';

export class CreateVerificationDto {
  @IsEnum(VerificationType)
  type!: VerificationType;

  @IsUrl()
  documentUrl!: string;

  @IsOptional()
  @IsString()
  propertyId?: string;
}
