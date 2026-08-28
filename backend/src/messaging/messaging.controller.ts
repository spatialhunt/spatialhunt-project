/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private messagingService: MessagingService) {}

  @Post()
  send(@Request() req: any, @Body() dto: SendMessageDto) {
    return this.messagingService.sendMessage(req.user.userId, dto);
  }

  @Get('conversations')
  findMyConversations(@Request() req: any) {
    return this.messagingService.findMyConversations(req.user.userId);
  }

  @Get('conversations/:id')
  findMessages(@Param('id') id: string, @Request() req: any) {
    return this.messagingService.findMessages(id, req.user.userId);
  }
}
