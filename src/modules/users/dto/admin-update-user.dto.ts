import { IsOptional, IsBoolean, IsEnum } from 'class-validator';

export class AdminUpdateUserDto {
  @IsOptional()
  @IsEnum(['member', 'admin', 'owner'])
  role?: string;

  @IsOptional()
  @IsEnum(['LOCAL', 'GOOGLE', 'GITHUB'])
  account_type?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
