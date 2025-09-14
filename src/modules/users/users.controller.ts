import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto, email: string) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  //User updating
  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  //Admin change user status
  @Patch(':id')
  @Public()
  adminUpdate(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.adminUpdate(+id, updateUserDto);
  }
  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
