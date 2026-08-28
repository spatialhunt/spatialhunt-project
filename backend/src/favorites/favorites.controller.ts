/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findMine(@Request() req: any) {
    return this.favoritesService.findMine(req.user.userId);
  }

  @Post(':propertyId')
  add(@Param('propertyId') propertyId: string, @Request() req: any) {
    return this.favoritesService.add(req.user.userId, propertyId);
  }

  @Delete(':propertyId')
  remove(@Param('propertyId') propertyId: string, @Request() req: any) {
    return this.favoritesService.remove(req.user.userId, propertyId);
  }
}
