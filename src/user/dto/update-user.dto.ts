import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class IssuedKeyDto {
  @IsString()
  cheatSlug: string;

  @IsString()
  key: string;

  @IsNumber()
  deadline: number;
}

export class PaymentOrdersDto {
  @IsString()
  orderID: string;

  @IsString()
  paymentService: string;
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

  @IsOptional()
  paymentOrdersDto?: PaymentOrdersDto[];
}
