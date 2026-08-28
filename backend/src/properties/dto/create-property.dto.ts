import {
  IsString,
  IsNumber,
  IsEnum,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  @IsString()
  @MinLength(5)
  title!: string;

  @IsString()
  @MinLength(20)
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsEnum(PropertyType)
  type!: PropertyType;

  @IsInt()
  @Min(0)
  bedrooms!: number;

  @IsInt()
  @Min(0)
  bathrooms!: number;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];
}
