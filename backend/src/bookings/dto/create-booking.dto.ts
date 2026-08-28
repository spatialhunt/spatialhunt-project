import { IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  propertyId!: string;

  @IsDateString()
  scheduledAt!: string;
}
