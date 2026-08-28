import { IsString, MinLength, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsString()
  recipientId?: string;

  @IsString()
  @MinLength(1)
  content!: string;
}
