/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { ReviewVerificationDto } from './dto/review-verification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('verifications')
@UseGuards(JwtAuthGuard)
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post()
  submit(@Request() req: any, @Body() dto: CreateVerificationDto) {
    return this.verificationService.submit(req.user.userId, dto);
  }

  @Get('mine')
  findMine(@Request() req: any) {
    return this.verificationService.findMine(req.user.userId);
  }

  @Get('pending')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findPending() {
    return this.verificationService.findPending();
  }

  @Patch(':id/review')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  review(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: ReviewVerificationDto,
  ) {
    return this.verificationService.review(id, req.user.userId, dto);
  }
}
