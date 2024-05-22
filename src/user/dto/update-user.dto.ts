import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
  nickname?: string;
  password?: string;
  isAdmin?: boolean;
  currentPassword?: string;
}
