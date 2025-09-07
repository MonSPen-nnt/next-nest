import { Module } from '@nestjs/common';
import { CardMembersService } from './card_members.service';
import { CardMembersController } from './card_members.controller';

@Module({
  controllers: [CardMembersController],
  providers: [CardMembersService],
})
export class CardMembersModule {}
