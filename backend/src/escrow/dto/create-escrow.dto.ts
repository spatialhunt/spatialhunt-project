import { IsString, IsNumber, Min } from 'class-validator';

export class CreateEscrowDto {
  @IsString()
  propertyId!: string;

  @IsNumber()
  @Min(1)
  amount!: number;
}
