import { Module } from '@nestjs/common';
import { BoardMemberService } from './board_member.service';
import { BoardMemberController } from './board_member.controller';

@Module({
  controllers: [BoardMemberController],
  providers: [BoardMemberService],
})
export class BoardMemberModule {}
