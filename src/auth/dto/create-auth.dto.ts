import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'userName không được trống' })
  username: string;
  @IsNotEmpty({ message: 'passWord không được trống' })
  password: string;
}
