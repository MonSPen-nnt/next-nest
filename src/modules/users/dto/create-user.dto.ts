import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Tên không được để trống',
  })
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Mật khẩu không được để trống',
  })
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  image?: string;

  //////////
  @IsOptional()
  @IsString()
  role?: string; // default: 'member'

  @IsOptional()
  @IsString()
  account_type?: string; // default: 'LOCAL'

  @IsOptional()
  @IsBoolean()
  is_active?: boolean; // default: false
}
