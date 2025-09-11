import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm'; // postgresql
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPasswordHelper } from 'src/helpers/ultis';
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user == null) throw new UnauthorizedException('User not exist');
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user == null) throw new UnauthorizedException('User not exist');
    await this.usersRepository.remove(user);
    return this.usersRepository.findOneBy({ id });
  }
}
