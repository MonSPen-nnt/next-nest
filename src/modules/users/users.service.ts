import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm'; // postgresql
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPasswordHelper } from 'src/helpers/ultis';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    //tương đương với constructor ở MongoDB
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.usersRepository.exists({ where: { email } });
    if (user) return true;
    return false;
  };
  isUserNull = async (id: number) => {
    const user = await this.usersRepository.exists({ where: { id } });
    if (user) return true;
    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, image } = createUserDto;
    const isExist = await this.isEmailExist(email);
    if (isExist) throw new BadRequestException('email đã tồn tại');
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      image,
    });
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`UserID ${id} not found`);
    Object.assign(user, this.adminUpdate);
    await this.usersRepository.save(user);
    return {
      message: `User with ID ${id} has been updated`,
      updatedUser: updateUserDto,
    };
  }

  async adminUpdate(id: number, adminUpdateUserDto: AdminUpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`UserID ${id} not found`);

    Object.assign(user, this.adminUpdate);
    await this.usersRepository.save(user);
    return {
      message: `User with ID ${id} has been updated`,
      updatedUser: user,
    };
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not exist');
    await this.usersRepository.remove(user);
    return {
      message: `User with ID ${id} has been removed successfully`,
      deleteUser: user,
    };
  }
}
