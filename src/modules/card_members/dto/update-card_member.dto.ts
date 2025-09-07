import { PartialType } from '@nestjs/mapped-types';
import { CreateCardMemberDto } from './create-card_member.dto';

export class UpdateCardMemberDto extends PartialType(CreateCardMemberDto) {}
