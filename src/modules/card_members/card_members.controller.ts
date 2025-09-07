import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardMembersService } from './card_members.service';
import { CreateCardMemberDto } from './dto/create-card_member.dto';
import { UpdateCardMemberDto } from './dto/update-card_member.dto';

@Controller('card-members')
export class CardMembersController {
  constructor(private readonly cardMembersService: CardMembersService) {}

  @Post()
  create(@Body() createCardMemberDto: CreateCardMemberDto) {
    return this.cardMembersService.create(createCardMemberDto);
  }

  @Get()
  findAll() {
    return this.cardMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardMemberDto: UpdateCardMemberDto) {
    return this.cardMembersService.update(+id, updateCardMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardMembersService.remove(+id);
  }
}
