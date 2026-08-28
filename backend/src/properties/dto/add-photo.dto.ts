/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsUrl,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class AddPhotoDto {
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsBoolean()
  isWalkthroughVideo?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
