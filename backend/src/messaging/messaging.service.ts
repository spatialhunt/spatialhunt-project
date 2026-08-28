/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from './schemas/conversation.schema';
import { Message } from './schemas/message.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async sendMessage(senderId: string, dto: SendMessageDto) {
    let conversation;

    if (dto.conversationId) {
      conversation = await this.conversationModel.findById(dto.conversationId);
      if (!conversation) {
        throw new BadRequestException('Conversation not found');
      }
      if (
        conversation.tenantId !== senderId &&
        conversation.landlordId !== senderId
      ) {
        throw new ForbiddenException('You are not part of this conversation');
      }
    } else {
      if (!dto.propertyId || !dto.recipientId) {
        throw new BadRequestException(
          'propertyId and recipientId are required to start a conversation',
        );
      }
      conversation = await this.conversationModel.findOneAndUpdate(
        {
          propertyId: dto.propertyId,
          tenantId: senderId,
          landlordId: dto.recipientId,
        },
        {
          $setOnInsert: {
            propertyId: dto.propertyId,
            tenantId: senderId,
            landlordId: dto.recipientId,
          },
        },
        { upsert: true, new: true },
      );
    }

    const message = await this.messageModel.create({
      conversationId: conversation._id,
      senderId,
      content: dto.content,
    });

    return message;
  }

  async findMyConversations(userId: string) {
    return this.conversationModel
      .find({ $or: [{ tenantId: userId }, { landlordId: userId }] })
      .sort({ updatedAt: -1 });
  }

  async findMessages(conversationId: string, userId: string) {
    const conversation = await this.conversationModel.findById(conversationId);
    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }
    if (
      conversation.tenantId !== userId &&
      conversation.landlordId !== userId
    ) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    return this.messageModel.find({ conversationId }).sort({ createdAt: 1 });
  }
}
