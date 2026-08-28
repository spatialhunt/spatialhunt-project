import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ required: true })
  propertyId!: string;

  @Prop({ required: true })
  tenantId!: string;

  @Prop({ required: true })
  landlordId!: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
