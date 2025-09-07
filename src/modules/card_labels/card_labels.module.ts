import { Module } from '@nestjs/common';
import { CardLabelsService } from './card_labels.service';
import { CardLabelsController } from './card_labels.controller';

@Module({
  controllers: [CardLabelsController],
  providers: [CardLabelsService],
})
export class CardLabelsModule {}
