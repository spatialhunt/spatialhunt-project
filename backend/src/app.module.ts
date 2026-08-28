import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PropertiesModule } from './properties/properties.module';
import { VerificationModule } from './verification/verification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsModule } from './bookings/bookings.module';
import { MessagingModule } from './messaging/messaging.module';
import { EscrowModule } from './escrow/escrow.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PropertiesModule,
    VerificationModule,
    BookingsModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
    MessagingModule,
    EscrowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
