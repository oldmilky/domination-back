import { IsEmail, IsOptional, IsString } from 'class-validator';

export class IssuedKeyDto {
  @IsString()
  cheatSlug: string;

  @IsString()
  key: string;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;
  nickname?: string;
  password?: string;
  isAdmin?: boolean;
  currentPassword?: string;

  @IsOptional()
  issuedKeys?: IssuedKeyDto[];
}
