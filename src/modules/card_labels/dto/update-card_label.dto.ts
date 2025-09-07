import { PartialType } from '@nestjs/mapped-types';
import { CreateCardLabelDto } from './create-card_label.dto';

export class UpdateCardLabelDto extends PartialType(CreateCardLabelDto) {}
