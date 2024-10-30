import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// Order
export class Plans {
  @IsNumber()
  deadline: number;
  @IsString()
  link: string;
  @IsOptional()
  @IsString()
  linkEn: string;
  @IsNumber()
  price: number;
  @IsNumber()
  priceEn: number;
  free?: string;
}

// Statuses
export enum Status {
  undetected = 'undetected',
  useAtOwnRisk = 'use at own risk',
  onUpdate = 'on update',
  retired = 'retired',
}

// Type
export enum Level {
  rage = 'rage',
  semirage = 'semirage',
  legit = 'legit',
}

// Text inputs in functionals
class ButtonPair {
  @IsString()
  button: string;
  @IsString()
  buttonEn: string;
}

// Main DTO
export class UpdateCheatDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  desc: string;
  @IsString()
  descEn: string;
  @IsString()
  seoTitle: string;
  @IsString()
  seoTitleEn: string;
  @IsString()
  seoDesc: string;
  @IsString()
  seoDescEn: string;

  @IsArray()
  @IsString({ each: true })
  game: string[];

  @Type(() => Plans)
  @IsArray()
  plans: Plans[];

  @IsEnum(Status)
  status: Status;

  os?: string;
  gamemode?: string;
  gamemodeEn?: string;
  cpu?: string;
  client?: string;
  disk?: string;
  bios?: string;
  gpu?: string;
  flash?: string;
  flashEn?: string;
  record?: string;
  recordEn?: string;
  spoofer?: string;
  spooferEn?: string;
  info?: string;
  infoEn?: string;

  @IsOptional()
  @Type(() => ButtonPair)
  @IsArray()
  aimbot?: ButtonPair[];
  @IsOptional()
  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  visuals?: ButtonPair[];
  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  loot?: ButtonPair[];
  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  radar?: ButtonPair[];
  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  misc?: ButtonPair[];
  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  other?: ButtonPair[];

  @Type(() => ButtonPair)
  @IsArray()
  @IsOptional()
  tags?: ButtonPair[];

  @IsEnum(Level)
  level: Level;

  @IsString()
  image: string;
  @IsString()
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  video?: string;
  video2?: string;

  hot?: boolean;
  popularHome?: boolean;
  sort?: number;
  ourProduct?: boolean;
}
