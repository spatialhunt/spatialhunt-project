/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { EscrowService } from './escrow.service';
import { CreateEscrowDto } from './dto/create-escrow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('escrow')
@UseGuards(JwtAuthGuard)
export class EscrowController {
  constructor(private escrowService: EscrowService) {}

  @Post()
  initiate(@Request() req: any, @Body() dto: CreateEscrowDto) {
    return this.escrowService.initiate(req.user.userId, dto);
  }

  @Get('mine')
  findMine(@Request() req: any) {
    return this.escrowService.findMine(req.user.userId);
  }

  @Patch(':id/fund')
  fund(@Param('id') id: string, @Request() req: any) {
    return this.escrowService.fund(id, req.user.userId);
  }

  @Patch(':id/confirm-inspection')
  confirmInspection(@Param('id') id: string, @Request() req: any) {
    return this.escrowService.confirmInspection(id, req.user.userId);
  }

  @Patch(':id/confirm-keys')
  confirmKeysReceived(@Param('id') id: string, @Request() req: any) {
    return this.escrowService.confirmKeysReceived(id, req.user.userId);
  }

  @Patch(':id/confirm-agreement')
  confirmAgreementSigned(@Param('id') id: string, @Request() req: any) {
    return this.escrowService.confirmAgreementSigned(id, req.user.userId);
  }

  @Patch(':id/release')
  release(@Param('id') id: string, @Request() req: any) {
    return this.escrowService.release(id, req.user.userId);
  }
}
