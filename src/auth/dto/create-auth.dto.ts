import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsOptional()
  name: string;
  @IsNotEmpty({ message: 'Email không được trống' })
  email: string;
  @IsNotEmpty({ message: 'Password không được trống' })
  password: string;
}
